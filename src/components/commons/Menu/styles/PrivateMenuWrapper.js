/* eslint-disable indent */
import styled, { css } from 'styled-components';
import { breakpointsMedia } from '../../../theme/utils/breakpointsMedia';
import { TextStyleVariantsMap } from '../../../foundation/Text';

export const PrivateMenuWrapper = styled.nav`
  font-family: 'Rubik', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 18px;
  padding-left: 28px;
  padding-right: 28px;
  margin-bottom: 2px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.background.light.color};
  ${breakpointsMedia({
  xs: css`
      position:fixed;
      bottom: 0px;
      margin-bottom: 0px;
      width: 100%;
      border-radius: 15px 15px 0px 0px;
      box-shadow: 0px -2px 4px 0px black;
    `,
  md: css`
      border-radius: 0px;
      justify-content: flex-start;
      margin-top: 0px;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      padding: 0 16px;
      max-width: 768px;
      bottom:auto;
      top:0px;
      position: sticky;
      box-shadow: black 0px 2px 0px 0px;
    `,
  lg: css`
      max-width: calc(100%);
      margin-top: 0px;
      padding-top: 10px;
    `,
  xl: css`
      max-width: calc(100% *1);
    `,
  xxl: css`
      max-width: calc(100% *1);
      padding: 10px 20%;
    `,
})}
`;

PrivateMenuWrapper.Left = styled.div`
  padding: 0;
  margin: 0;
  order: 1;
  ${breakpointsMedia({
  xs: css`
        display: none;
        max-width: calc(100% *0.4);
        margin:0px
        justify-content: flex-start;
        height: calc(100%);
        order: 1;
        svg{
          width: calc(100%);
        }
    `,
  md: css`
      display:block;
      order: initial;
      padding-right: 16px;
    `,
  xl: css`
    width: 10%;
    `,
})}
`;

PrivateMenuWrapper.Central = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 17px;
  border-top: 1px solid #88989E;
  border-bottom: 1px solid #88989E;
  padding: 12px;
  
  ${breakpointsMedia({
  xs: css`
      display: none;
      ${({ searhClick }) => (searhClick === true ? css`display: block;` : css`display: none;`)};
      form{ 
        width:90%;
        margin: auto;
      }
    `,
  md: css`
      display: flex;
      max-width: calc(100% *0.5);
      justify-content: flex-end;
      flex: 1;
      order: initial;
      border: none;
      margin: 0;
      padding-top: 0;
      padding-bottom: 0;
      form{ 
        width:60%;
        margin: 0px;
      }
    `,
  xl: css`
      max-width: calc(100% *0.6);
    `,
})}
  a {
    text-align: center;
    display: block;
    text-decoration: none;
    color: #88989E;
    transition: 200ms ease-in-out;
    ${breakpointsMedia({
  xs: css`
        ${TextStyleVariantsMap.smallestException}
    `,
  md: css`
      ${TextStyleVariantsMap.paragraph1}
      font-size: 14px;
    `,
  lg: css`
      ${TextStyleVariantsMap.paragraph1}
      font-size: 14px;
    `,
})}
    &:hover,
    &:focus {
      font-weight: 500;
      color: #070C0E;
      
    }
  }
`;

PrivateMenuWrapper.Right = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex: 1;
  order: 2;
  justify-content: flex-end;
  ${breakpointsMedia({
  xs: css`
      width: 100%;
      justify-content: space-evenly;
      order: 1;
    `,
  sm: css`
      max-width: calc(100% *1);
      justify-content: space-evenly;
    `,
  md: css`
      max-width: calc(100% *0.4);
      order: 3;
      justify-content: center;
    `,
  xl: css`
      max-width: calc(100% *0.3);
      
      justify-content: flex-end;
    `,
})}
`;
