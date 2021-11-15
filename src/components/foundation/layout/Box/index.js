import styled, { css } from 'styled-components';
import { propsToStyle } from '../../../theme/utils/propsToStyle';

export const loggedBackground = css`
    background-color:${({ theme }) => theme.colors.background.main.color}
`;
export const Box = styled.div`
    ${propsToStyle('flex')};
    ${propsToStyle('display')};
    ${propsToStyle('flexDirection')};
    ${propsToStyle('justifyContent')};
    ${propsToStyle('flexWrap')};
    ${propsToStyle('backgroundColor')};
    ${propsToStyle('backgroundImage')};
    ${propsToStyle('backgroundRepeat')};
    ${propsToStyle('backgroundPosition')};
//modulo 2 aula 3 add
    ${propsToStyle('boxShadow')}
    ${propsToStyle('padding')}
//modulo 3 aula 2 add
    ${propsToStyle('width')}
    ${propsToStyle('listStyle')}
    ${propsToStyle('margin')}
    ${propsToStyle('marginLeft')}
    ${propsToStyle('marginTop')}
    ${propsToStyle('marginBottom')}
    ${propsToStyle('marginRight')}
    ${({ theme, borderRadiusTheme }) => borderRadiusTheme && `border-radius: ${theme.borderRadius}`}
//modulo 5 projeto final
    ${propsToStyle('alignItems')}
    ${propsToStyle('height')}
    ${propsToStyle('maxHeight')}
    ${function BoxProps(props) {
    if (props.logged) {
      return loggedBackground;
    }
    return '';
  }}
`;
