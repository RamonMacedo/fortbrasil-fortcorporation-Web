import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, AnimationContainer } from './styles';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
  email: string;
  password: string;
}

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn, user } = useAuth();
  const { addToast } = useToast();

  function checkUserSignIn(): void {
    if (user) {
      history.push('/dashboard');
    }
  }

  checkUserSignIn();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Insira um e-mail válido')
            .required('Campo obrigatório'),
          password: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Ocorreu um erro',
          description: 'Verifique suas credenciais e tente novamente.',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <AnimationContainer>
        <img src={logoImg} alt="User" width="65px" />
        <h1>Entrar</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="email" type="email" autoFocus placeholder="Seu e-mail" />
          <Input
            name="password"
            type="password"
            placeholder="Digite sua senha"
          />

          <Button type="submit">Entrar</Button>
        </Form>
      </AnimationContainer>
    </Container>
  );
};
export default SingIn;
