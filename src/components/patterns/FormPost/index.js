/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import * as yup from 'yup';
import { useForm } from '../../../infra/hooks/forms/useForm';
import { Button } from '../../commons/Button';
import TextField from '../../forms/TextField';
import { userService } from '../../../service/user/userService';
import { Box } from '../../foundation/layout/Box';
import Text from '../../foundation/Text';
import { filtros } from '../../../assets/filtros';

const URLCheck = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm;
const postSchema = yup.object().shape({
  photoUrl: yup.string().required('Insira uma URL valida!')
    .matches(URLCheck,
      'Insira uma URL valida!'),
});

export default function FormPost({
  onSubmit, photoOk, filterList,
}) {
  const [step, setStep] = useState('first');
  const router = useRouter();
  const initialValues = {
    photoUrl: '',
    description: 'Descição',
    filter: '',
  };

  const form = useForm({
    initialValues,
    onSubmit: (values) => {
      form.setIsFormDisabled(true);
      userService.newPost({
        photoUrl: values.photoUrl,
        description: values.description,
        filter: values.filter,
      }).then(() => {
        router.push('/app/profile');
      }).catch((err) => {
        console.error('Error de login', err);
        return (
          <span>{err}</span>
        );
      }).finally(() => {
        form.setIsFormDisabled(false);
      });
    },

    async validateSchema(values) {
      return postSchema.validate(values, {
        abortEarly: false,
      });
    },
  });

  return (
    <>
      {step === 'first' && (
        <form
          schema={postSchema}
          id="formPost"
          onSubmit={onSubmit}
        >
          {photoOk.length === 0 && (
            <Box display="flex" margin="auto" width="90%">
              <Box
                width="100%"
                height="100px"
                margin="auto"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <TextField
                  placeholder="URL da Imagem"
                  name="photoUrl"
                  value={form.values.photoUrl}
                  isTouched={form.touchedFields.photoUrl}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  previewPhoto
                />
                <TextField
                  placeholder="Descrição da Imagem"
                  name="description"
                  value={form.values.description}
                  isTouched={form.touchedFields.description}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  previewPhoto
                />
              </Box>
              <Button
                type="submit"
                variant="secondary.main"
                disabled={form.isFormDisabled}
                style={{ borderRadius: '0px 9px 9px 0px', width: '10%' }}
              >
                ➡
              </Button>
            </Box>
          )}
          <Box width="90%" margin="auto">
            <Text color="error.main">{form.errors.photoUrl}</Text>
          </Box>
          <Button
            type="button"
            onClick={() => {
              setStep('second');
            }}
            disabled={form.isFormDisabled}
            variant="secondary.main"
          >
            Avançar
          </Button>
        </form>
      )}
      {step === 'second' && (
        <form
          schema={postSchema}
          id="formPost"
          onSubmit={form.handleSubmit}
        >
          <div style={{ display: 'flex', overflowX: 'scroll' }}>
            {filtros.map((i) => (
              <>
                <input
                  type="radio"
                  id={i.name}
                  name="filter"
                  value={i.css}
                  onChange={form.handleChange}
                  style={{ visibility: 'hidden' }}
                  onClick={filterList}
                />
                <label
                  htmlFor={i.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '10px',
                    position: 'relative',
                  }}
                >
                  <img
                    src={form.values.photoUrl}
                    className={i.css}
                    alt=""
                  />
                  {i.name}
                </label>
              </>
            ))}
          </div>
          <Button
            type="submit"
            disabled={form.isFormDisabled}
            variant="secondary.main"
          >
            Post
          </Button>
        </form>
      )}
    </>
  );
}
