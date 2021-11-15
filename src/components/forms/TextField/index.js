import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../../foundation/Text';

const InputWrapper = styled.div`
  margin-bottom: 17px;
  ${function inputProps(props) {
    if (props.search) {
      return css`
      margin-bottom: 0px;
      `;
    }
    if (props.previewPhoto) {
      return css`
        width: 100%;
        margin:0px;
      `;
    }
    return '';
  }}
`;

const InputSearch = css`
  background-image: url('/images/lupa.svg');
  background-repeat: no-repeat;
  background-size:20px;
  background-position-x: 15px;
  background-position-y: 10px;
  text-indent: 40px;
  :focus{
    background-image:none;
  }
`;

const Input = styled(Text)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.tertiary.light.color};
  padding: 12px 16px;
  outline: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  ${({ theme, isFieldInvalid }) => isFieldInvalid && css`
    border-color: ${theme.colors.error.main.color};
    & + span {
      color: ${theme.colors.error.main.color};
        font-size: 11px;
      }
    `}
  ${function inputProps(props) {
    if (props.search) {
      return InputSearch;
    }
    if (props.previewPhoto) {
      return css`
        border-radius: 9px 0px 0px 9px;
      `;
    }
    return '';
  }}
`;

Input.defaultProps = {
  tag: 'input',
  variant: 'paragraph1',
};

export default function TextField({
  placeholder,
  name,
  onChange,
  value,
  error,
  isTouched,
  ...props
}) {
  const hasError = Boolean(error);
  const isFieldInvalid = hasError && isTouched;
  return (
    <InputWrapper {...props}>
      <Input
        type="text"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        isFieldInvalid={isFieldInvalid}
        {...props}
      />
      {isFieldInvalid && (
        <Text
          variant="smallestException"
          color="error.main"
          role="alert"
        >
          {error}
        </Text>
      )}
    </InputWrapper>
  );
}
TextField.defaultProps = {
  error: '',
  isTouched: false,
};

TextField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  isTouched: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
