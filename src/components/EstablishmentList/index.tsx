import React, { useCallback, useEffect, useState } from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import notFound from '../../assets/avatar-not-found.png';

import EstablishmentsDTO from '../../dtos/EstablishmentsDTO';
import api from '../../services/api';

import {
  Container,
  Content,
  ContentImg,
  ContentInfo,
  ButtonBox,
  EditButton,
  DeleteButton,
} from './styles';

interface EstablishmentProp {
  establishments: EstablishmentsDTO[];
}

const EstablishmentList: React.FC<EstablishmentProp> = ({
  establishments: data,
}) => {
  const history = useHistory();
  const [establishments, setEstablishments] = useState<EstablishmentsDTO[]>(
    data,
  );

  useEffect(() => {
    setEstablishments(data);
  }, [data]);

  const navigateToUpdate = useCallback(
    (id_establishment) => {
      history.push({
        pathname: '/establishments/update',
        state: { id_establishment },
      });
    },
    [history],
  );

  const deleteEstablishment = useCallback(async (id_establishment) => {
    await api.delete(`/establishments/${id_establishment}`);
    setEstablishments(
      establishments.filter(
        (establishment) => establishment.id !== id_establishment,
      ),
    );
  }, []);

  return (
    <>
      {establishments.map((establishment) => (
        <Container key={establishment.id}>
          <Content>
            {establishment.avatar ? (
              <ContentImg
                src={establishment.avatar}
                alt={`${establishment.estab_name}`}
              />
            ) : (
              <ContentImg src={notFound} alt={`${establishment.estab_name}`} />
            )}

            <ContentInfo>
              <div>{establishment.estab_name.toLowerCase()}</div>
              <div>
                {establishment.city.toLowerCase()} - {establishment.state}
              </div>
            </ContentInfo>
          </Content>
          <ButtonBox>
            <DeleteButton
              onClick={() => {
                deleteEstablishment(establishment.id);
              }}
            >
              <FiTrash2 size={18} />
              Excluir
            </DeleteButton>
            <EditButton
              onClick={() => {
                navigateToUpdate(establishment.id);
              }}
            >
              <FiEdit2 size={18} />
              Editar
            </EditButton>
          </ButtonBox>
        </Container>
      ))}
    </>
  );
};

export default EstablishmentList;
