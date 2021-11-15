import React from 'react';
import styled from 'styled-components';
import { Box } from '../../foundation/layout/Box';

const PerfilBox = styled(Box)`
  max-width:50px;
`;
const PerImg = styled.img`
  display: flex;
  width: 100%;
  border-radius: 50%;
`;

export default function PerfilImg({ avatar }) {
  return (
    <PerfilBox>
      <PerImg src={avatar} alt="Perfil" />
    </PerfilBox>
  );
}
