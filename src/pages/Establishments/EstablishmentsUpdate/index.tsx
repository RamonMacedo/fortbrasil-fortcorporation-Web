import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import axios from 'axios';

import Cropper from 'react-easy-crop';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useHistory, useLocation } from 'react-router-dom';

import { Scrollbars } from 'react-custom-scrollbars';
import { useToast } from '../../../hooks/toast';

import getValidationErrors from '../../../utils/getValidationErrors';
import { getCroppedImg } from '../../../utils/canvasUtils.js';
import api from '../../../services/api';

import Upload from '../../../components/Upload';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import ResponsiveHeader from '../../../components/ResponsiveHeader';
import Select from '../../../components/Select';

import {
  Container,
  Content,
  FormBox,
  ImportFileContainer,
  Footer,
  Title,
  Label,
  CityAndUfBox,
  CityAndUfContent,
} from './styles';
import InputMask from '../../../components/InputMask';

interface Params {
  state: {
    id_establishment: string;
  };
}

interface CityOrState {
  id: string;
  nome: string;
}

interface CityOrStateSelect {
  value: string;
  label: string;
}

interface SignInFormData {
  id: string;
  estab_name: string;
  fantasy_name: string;
  description: string;
  cnpj: string;
  zipcode: string;
  address: string;
  city: string;
  state: string;
  avatar?: string;
}

const EstablishmentsUpdate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { state } = useLocation() as Params;

  const history = useHistory();
  const { addToast } = useToast();

  const [establishment, setEstablishment] = useState<SignInFormData>(
    {} as SignInFormData,
  );

  const [selectedCity, setSelectedCity] = useState<CityOrState>({
    id: '',
    nome: 'Selecionar...',
  });

  const [selectedState, setSelectedState] = useState<CityOrState>({
    id: '',
    nome: 'Selecionar...',
  });

  const [cities, setCities] = useState<CityOrStateSelect[]>([]);

  const [states, setStates] = useState<CityOrStateSelect[]>([]);

  const [imageSrc, setImageSrc] = React.useState(undefined);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixelsValue, setCroppedAreaPixelsValue] = useState({});
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');

  const [inputCNPJ, setInputCNPJ] = useState('');
  const [inputZipcode, setInputZipcode] = useState('');

  useEffect(() => {
    api
      .get(`establishments/${state.id_establishment}`)
      .then((res) => {
        setEstablishment(res.data);
        setInputCNPJ(res.data.cnpj);
        setInputZipcode(res.data.zipcode);

        if (res.data.avatar) {
          setImageSrc(res.data.avatar);
        }
        if (res.data.state) {
          const { state: uf } = res.data;

          setSelectedState({
            id: uf,
            nome: uf,
          });
        }
        if (res.data.city) {
          const { city } = res.data;

          setSelectedCity({
            id: city,
            nome: city,
          });
        }
      })
      .catch((err) => {
        addToast({
          type: 'error',
          title: 'Ocorreu um erro',
          description: 'Não foi possível buscar o estabelecimento!',
        });
      });
  }, [state, addToast]);

  function readFile(file: any): Promise<any> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const sendAvatar = useCallback(
    async (blob, id_establishment) => {
      if (id_establishment) {
        const data = new FormData();

        const img = await fetch(blob)
          .then((r) => r.blob())
          .then(
            (blobFile) => new File([blobFile], fileName, { type: fileType }),
          );

        data.append('avatar', img, fileName);
        data.append('id_establishment', id_establishment);

        try {
          await api.patch('/establishments/avatar', data);

          addToast({
            type: 'success',
            title: 'Uhull!',
            description: 'Estabelecimento editado com sucesso!.',
          });

          history.push('/establishments');
        } catch (err) {
          console.log(err.response.error);
        }
      }
    },
    [history, fileName, fileType, addToast],
  );

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        Object.assign(data, {
          city: selectedCity.id,
          state: selectedState.id,
        });

        const schema = Yup.object().shape({
          estab_name: Yup.string().required('Campo obrigatório'),
          cnpj: Yup.string().required('Campo obrigatório'),
          zipcode: Yup.string().required('Campo obrigatório'),
          address: Yup.string().required('Campo obrigatório'),
          state: Yup.string().required('Campo obrigatório'),
          city: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        Object.assign(data, { id_establishment: establishment.id });

        const { data: updateEstablishment } = await api.put(
          '/establishments',
          data,
        );

        if (imageSrc !== establishment.avatar && imageSrc !== undefined) {
          const croppedImageEnd = await getCroppedImg(
            imageSrc,
            croppedAreaPixelsValue,
            rotation,
          );

          sendAvatar(croppedImageEnd, updateEstablishment.id);
          return;
        }

        addToast({
          type: 'success',
          title: 'Uhull!',
          description: 'Estabelecimento editado com sucesso!.',
        });

        history.push('/establishments');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        if (err.message === 'Request failed with status code 401') {
          addToast({
            type: 'error',
            title: 'Ocorreu um erro',
            description: 'Estabelecimento já cadastrado!',
          });
          return;
        }

        addToast({
          type: 'error',
          title: 'Ocorreu um erro',
          description: 'Verifique os campos e tente novamente.',
        });
      }
    },
    [
      addToast,
      history,
      croppedAreaPixelsValue,
      imageSrc,
      rotation,
      sendAvatar,
      establishment.avatar,
      selectedCity.id,
      selectedState.id,
      establishment.id,
    ],
  );

  const onFileChange = useCallback(async (files: File[]) => {
    if (files && files.length > 0) {
      const file = files[0];
      const imageDataUrl = await readFile(file);

      setFileName(file.name);
      setFileType(file.type);
      setImageSrc(imageDataUrl);
    }
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixelsValue(croppedAreaPixels);
  }, []);

  useMemo(async () => {
    if (selectedState.id !== '') {
      await axios
        .get<CityOrState[]>(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState.id}/municipios?orderBy=nome`,
        )
        .then((response) => {
          const dataMap = response.data;

          const cityName = dataMap.map(({ nome }: CityOrState) => ({
            value: nome,
            label: nome,
          }));

          setCities(cityName);
        });
    }

    await axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`,
      )
      .then((response) => {
        const dataMap = response.data;

        const stateName: [] = dataMap.map(({ nome, sigla }: any) => ({
          value: sigla,
          label: nome,
        }));

        setStates(stateName);
      });
  }, [selectedState.id]);

  return (
    <>
      <Container>
        <ResponsiveHeader />
        <Content>
          <Scrollbars>
            <FormBox>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Title>Adicionar estabelecimento</Title>

                {/* Inicio Cropped */}
                {!imageSrc ? (
                  <ImportFileContainer>
                    <Upload onUpload={onFileChange} />

                    <Footer>
                      <p>
                        <FiAlertTriangle size={20} />
                        Permitido apenas imagem
                      </p>
                    </Footer>
                  </ImportFileContainer>
                ) : (
                  <>
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 200,
                        background: '#333',
                      }}
                    >
                      <Cropper
                        image={imageSrc}
                        crop={crop}
                        rotation={rotation}
                        zoom={zoom}
                        aspect={1 / 1}
                        onCropChange={setCrop}
                        onRotationChange={setRotation}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                      />
                    </div>

                    <Footer>
                      <p
                        style={{
                          display: 'flex',
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          <FiAlertTriangle
                            size={20}
                            style={{ marginRight: '8px' }}
                          />
                          Permitido apenas imagem
                        </span>
                      </p>
                    </Footer>
                  </>
                )}

                {/* Fim Cropped */}

                <Label>Estabelecimento *</Label>
                <Input
                  name="estab_name"
                  defaultValue={establishment.estab_name}
                />
                <Label>Nome fantasia</Label>
                <Input
                  name="fantasy_name"
                  defaultValue={establishment.fantasy_name}
                />
                <Label>Descriçao</Label>
                <Input
                  name="description"
                  defaultValue={establishment.description}
                />
                <Label>CNPJ *</Label>
                <InputMask
                  mask="99.999.999/9999-99"
                  name="cnpj"
                  value={inputCNPJ}
                  onChange={(e) => {
                    setInputCNPJ(e.target.value);
                  }}
                />
                <Label>CEP *</Label>
                <InputMask
                  mask="99.999-999"
                  maskChar={null}
                  name="zipcode"
                  value={inputZipcode}
                  onChange={(e) => {
                    setInputZipcode(e.target.value);
                  }}
                />
                <Label>Endereço</Label>
                <Input name="address" defaultValue={establishment.address} />

                <CityAndUfContent style={{ marginTop: 0 }}>
                  <CityAndUfBox>
                    <Label>Cidade *</Label>
                    <Select
                      name="city"
                      options={cities}
                      value={{
                        value: selectedCity.id,
                        label: selectedCity.nome,
                      }}
                      defaultValue={{
                        value: selectedCity.id,
                        label: selectedCity.nome,
                      }}
                      onChange={(e) => {
                        setSelectedCity({
                          id: String(e?.value),
                          nome: String(e?.label),
                        });
                      }}
                    />
                  </CityAndUfBox>
                  <CityAndUfBox>
                    <Label>Estado *</Label>
                    <Select
                      name="state"
                      options={states}
                      value={{
                        value: selectedState.id,
                        label: selectedState.nome,
                      }}
                      defaultValue={{
                        value: selectedState.id,
                        label: selectedState.nome,
                      }}
                      onChange={(e) => {
                        if (selectedState.id !== e?.value) {
                          setSelectedCity({
                            id: '',
                            nome: 'Selecionar...',
                          });
                        }
                        setSelectedState({
                          id: String(e?.value),
                          nome: String(e?.label),
                        });
                      }}
                    />
                  </CityAndUfBox>
                </CityAndUfContent>

                <Button type="submit">Salvar</Button>
              </Form>
            </FormBox>
          </Scrollbars>
        </Content>
      </Container>
    </>
  );
};

export default EstablishmentsUpdate;
