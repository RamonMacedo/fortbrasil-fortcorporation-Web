import React, { useCallback, useMemo, useRef, useState } from 'react';

import { FiPlusCircle } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Link } from 'react-router-dom';

import { Scrollbars } from 'react-custom-scrollbars';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import api from '../../services/api';
import isNumber from '../../utils/isNumber';

import EstablishmentsDTO from '../../dtos/EstablishmentsDTO';

import Input from '../../components/Input';
import Button from '../../components/Button';
import ResponsiveHeader from '../../components/ResponsiveHeader';
import EstablishmentsList from '../../components/EstablishmentList';
import Select from '../../components/Select';

import { useToast } from '../../hooks/toast';

import {
  Container,
  Content,
  Header,
  ButtonAddProduct,
  BoxProducts,
} from './styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: 5,
    },
  }),
);

interface Filter {
  id: string;
  nome: string;
}

interface FilterSelect {
  value: string;
  label: string;
}

const Establishments: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [establishments, setEstablishments] = useState<EstablishmentsDTO[]>([]);

  const [selectedFilter, setSelectedFilter] = useState<Filter>({
    id: 'description',
    nome: 'Descrição',
  });

  const [filters, setFilters] = useState<FilterSelect[]>([
    { value: 'description', label: 'Descrição' },
    { value: 'city', label: 'Cidade' },
    { value: 'state', label: 'Estado (Sigla)' },
    { value: 'cityandstate', label: 'Cidade e Estado' },
  ]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(15);

  const { addToast } = useToast();

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ): void => {
    setPage(value);
  };

  const handleSearchSubmit = useCallback(async () => {
    try {
      const editable = formRef.current?.getFieldValue('search');
      if (editable.length > 0) {
        if (!isNumber(editable)) {
          // Faz chamada do produto pelo código de barras
          let querySearch: string;

          if (selectedFilter.id === 'city') {
            querySearch = `?city=${editable}`;
          } else if (selectedFilter.id === 'state') {
            querySearch = `?state=${editable}`;
          } else if (selectedFilter.id === 'cityandstate') {
            const search = editable.split('/');
            querySearch = `?city=${search[0]}&state=${search[1].replace(
              ' ',
              '',
            )}`;
          } else {
            querySearch = `/${editable}`;
          }

          const { data } = await api.get(
            `/establishments/search${querySearch}`,
            {
              params: { page, limit },
            },
          );

          if (!data) {
            addToast({
              type: 'error',
              title: 'Opss!',
              description: 'Estabelecimento não cadastrado ou indisponível.',
            });
            return;
          }

          const {
            establishments: establishmentsSearch,
            totalPage: pagesInTotal,
            count,
          } = data;

          setEstablishments(establishmentsSearch);
          setTotalPage(pagesInTotal);
          setTotal(count);
          setPage(page);
        }
      } else {
        await api
          .get('establishments', {
            params: { page, limit },
          })
          .then((response) => {
            if (response.data) {
              const {
                establishments: establishmentsSearch,
                totalPage: pagesInTotal,
                count,
              } = response.data;

              setEstablishments(establishmentsSearch);
              setTotalPage(pagesInTotal);
              setTotal(count);
              setPage(page);
            }
          });
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Opss!',
        description: 'Estabelecimento não cadastrado ou indisponível.',
      });
    }
  }, [addToast, limit, page, selectedFilter]);

  useMemo(async () => {
    const editable = formRef.current?.getFieldValue('search');
    if (editable) {
      handleSearchSubmit();
    } else {
      await api
        .get('establishments', {
          params: { page, limit },
        })
        .then((response) => {
          if (response.data) {
            const {
              establishments: establishmentsFind,
              totalPage: pagesInTotal,
              count,
            } = response.data;

            setEstablishments(establishmentsFind);
            setTotalPage(pagesInTotal);
            setTotal(count);
            setPage(page);
          }
        });
    }
  }, [page, limit]);

  const classes = useStyles();

  return (
    <>
      <Container>
        <ResponsiveHeader />
        <Content>
          <Header>
            <Form ref={formRef} onSubmit={handleSearchSubmit}>
              <Input
                name="search"
                placeholder={`Buscar por ${selectedFilter.nome}`}
              />
              <Select
                styles={{
                  control: (base) => ({
                    ...base,
                    minWidth: 150,

                    height: 45,
                    marginLeft: 16,
                  }),
                }}
                name="filter"
                options={filters}
                value={{
                  value: selectedFilter.id,
                  label: selectedFilter.nome,
                }}
                defaultValue={{
                  value: selectedFilter.id,
                  label: selectedFilter.nome,
                }}
                onChange={(e) => {
                  setSelectedFilter({
                    id: String(e?.value),
                    nome: String(e?.label),
                  });
                }}
              />
              <Button type="submit">Buscar</Button>
            </Form>
            {selectedFilter.id === 'cityandstate' && (
              <small>
                Separar Cidade e Estado ( Sigla ) com ( / ). Ex: Fortaleza / CE
              </small>
            )}
          </Header>
          <ButtonAddProduct>
            <Link to="/establishments/create">
              <FiPlusCircle size={20} />
              Adicionar estabelecimento
            </Link>
          </ButtonAddProduct>
          <BoxProducts>
            <div className={classes.root}>
              <Pagination
                count={totalPage}
                page={page}
                onChange={handleChange}
              />
            </div>
            <Scrollbars>
              {establishments.length > 0 ? (
                <EstablishmentsList establishments={establishments} />
              ) : (
                <div>Nenhum estabelecimento encontrado!</div>
              )}
            </Scrollbars>
          </BoxProducts>
        </Content>
      </Container>
    </>
  );
};

export default Establishments;
