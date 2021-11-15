import React from 'react';
import user from '@testing-library/user-event';
import { render, screen } from '../../../infra/test/testUtils';
import TextField from './index';

describe('<TextField />', () => {
  test('renders component', () => {
    render(
      <TextField
        placeholder="Nome"
        value="Mario"
        onChange={() => { }}
        name="nome"
      />,
    );
    const textField = screen.getByPlaceholderText(/nome/i);
    expect(textField).toMatchSnapshot();
  });
  describe('when field is valid', () => {
    describe('and user typing', () => {
      test('the value must be update', () => {
        const onChangeMock = jest.fn();
        render(
          <TextField
            placeholder="Nome"
            value=""
            onChange={onChangeMock}
            name="nome"
            isTouched
          />,
        );
        const inputName = screen.getByPlaceholderText(/nome/i);
        const valueTyped = 'mario';
        user.type(inputName, valueTyped);
        expect(onChangeMock).toHaveBeenCalledTimes(valueTyped.length);
      });
    });
  });

  describe('when field is invalid', () => {
    test('displays the respective error message', () => {
      render(
        <TextField
          placeholder="Nome"
          value=""
          onChange={() => { }}
          name="nome"
          isTouched
          error="O campo Nome é obrigatorio"
        />,
      );

      const inputName = screen.getByPlaceholderText(/nome/i);
      expect(inputName).toHaveValue('');
      expect(screen.getByRole('alert')).toHaveTextContent('O campo Nome é obrigatorio');
      expect(inputName).toMatchSnapshot();
    });
  });
});
