import React from 'react';
import styled, { css } from 'styled-components';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { TextStyleVariantsMap } from '../../foundation/Text';
import { breakpointsMedia } from '../../theme/utils/breakpointsMedia';
import { propsToStyle } from '../../theme/utils/propsToStyle';
import Link from '../Link';

export { ButtonLike } from './ButtonLike';

const ButtonGhost = css`
    color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
    background-color: transparent;
`;
const ButtonDefault = css`
    color:${(props) => get(props.theme, `colors.${props.variant}.contrastText`)};
    background-color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
`;
const verMais = css`
  margin: 0px 0px 0px 25px;
  border-radius: 8px;
  padding: 0px;
  color: #88989E;
  p{
    margin: 0px
  }
 `;

const ButtonWrapper = styled.button`
    border: 0;
    cursor: pointer;
    padding: 12px 26px;
    font-weight: bold;
    opacity: 1;
    border-radius: 8px;
    ${function BtnProps(props) {
    if (props.ghost) {
      return ButtonGhost;
    }
    return ButtonDefault;
  }}
    transition: opacity${({ theme }) => theme.transition};
    border-radius: ${({ theme }) => theme.borderRadius};
    ${function BtnProps(props) {
    if (props.comments) {
      return verMais;
    }
    return '';
  }}
    &:hover,
    &:focus {
        opacity: .5;
    }

    ${breakpointsMedia({
    xs: css`
            ${TextStyleVariantsMap.smallestException}
            padding: 8px 16px;
        `,
    md: css`
            ${TextStyleVariantsMap.paragraph1}
        `,
  })}
    &:disabled {
        cursor: not-allowed;
        opacity: .2;
    }
    ${({ fullWidth }) => fullWidth && css`
        width: 100%;
    `};

    ${propsToStyle('margin')}
    ${propsToStyle('display')}
`;

const ButtonWrapperIcon = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    cursor: pointer;
    margin:2px;
    padding:0px;
    width: 50px;
    font-weight: bold;
    opacity: 1;
    text-align: center;
    ${TextStyleVariantsMap.smallestException}
    background-color: transparent;
    transition: opacity${({ theme }) => theme.transition};
    &:hover,
    &:focus {
        opacity: .5;
    }
    ${propsToStyle('display')}
    ${propsToStyle('order')}
    
`;

export function Button({
  href, children, icon, ...props
}) {
  const hasHref = Boolean(href);
  const tag = hasHref ? Link : 'button';
  if (icon) {
    return (
      <ButtonWrapperIcon
        as={tag}
        href={href}
        {...props}
      >
        {children}
      </ButtonWrapperIcon>
    );
  }
  return (
    <ButtonWrapper
      as={tag}
      href={href}
      {...props}
    >
      {children}
    </ButtonWrapper>
  );
}

Button.defaultProps = {
  href: undefined,
};

Button.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
