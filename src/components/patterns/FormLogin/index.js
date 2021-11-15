import React from 'react';
import { useRouter } from 'next/dist/client/router';
import * as yup from 'yup';
import { useForm } from '../../../infra/hooks/forms/useForm';
import { loginService } from '../../../service/login/loginService';
import { Button } from '../../commons/Button';
import TextField from '../../forms/TextField';

const loginSchema = yup.object().shape({
  usuario: yup.string().required('"O usuário é obrigatorio"').min(3, 'Preencha ao menos 3 caracteres'),
  senha: yup.string()
    .min(8, 'Você precisa ter uma senha de 8 caracteres')
    .required('"A senha é obrigatoria"'),
});

export default function LoginForm({ onSubmit }) {
  const router = useRouter();
  const initialValues = {
    usuario: '',
    senha: '',
  };

  const form = useForm({
    initialValues,
    onSubmit: (values) => {
      form.setIsFormDisabled(true);
      loginService.login({
        username: values.usuario,
        password: values.senha,
      }).then(() => {
        router.push('/app/feed');
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Error de login', err);
        return (
          <span>{err}</span>
        );
      }).finally(() => {
        form.setIsFormDisabled(false);
      });
    },

    async validateSchema(values) {
      return loginSchema.validate(values, {
        abortEarly: false,
      });
    },
  });

  return (
    <form id="formCadastro" onSubmit={onSubmit || form.handleSubmit}>
      <TextField
        placeholder="Usuário"
        name="usuario"
        value={form.values.usuario}
        error={form.errors.usuario}
        isTouched={form.touchedFields.usuario}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
      />
      <TextField
        placeholder="Senha"
        name="senha"
        type="password"
        value={form.values.senha}
        error={form.errors.senha}
        isTouched={form.touchedFields.senha}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
      />

      <Button
        type="submit"
        variant="primary.main"
        margin={{
          xs: '0 auto',
          md: 'initial',
        }}
        fullWidth
        disabled={form.isFormDisabled}
      >
        Entrar
      </Button>
    </form>
  );
}
