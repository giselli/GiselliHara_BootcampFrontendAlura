/* eslint-disable indent */
import React from 'react';
import styled, { css } from 'styled-components';
import { Grid } from '../../foundation/layout/Grid';
import Text from '../../foundation/Text';
import { breakpointsMedia } from '../../theme/utils/breakpointsMedia';

const InfoImg = styled.img`
  border-radius: 50%;
  ${breakpointsMedia({
  xs: css`
    width: 88px;
    height:88px;
    `,
  md: css`
    width: 200px;
    height:200px;
    `,
})}
`;

export default function InforCard({
  postLength, userPhoto, userName, userBio, followers, following,
}) {
  return (
    <Grid.Row justifyContent="center" margin="0px" alignItems="center">

      <Grid.Col
        value={{ xs: 4, md: 5, xl: 4 }}
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
      >
        <InfoImg
          src={userPhoto}
          alt={`Avatar ${userName}`}
        />
      </Grid.Col>

      <Grid.Col
        value={{ xs: 8, md: 5, xl: 4 }}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        style={{ padding: '0px' }}
      >
        <Grid.Row margin="0px">
          <Grid.Col value={{ xs: 6, md: 4 }}>
            <Text tag="p" variant="titleXS" bold>{postLength}</Text>
            <Text tag="p" variant="paragraph1" userInfor>Publicações</Text>
          </Grid.Col>

          <Grid.Col value={{ xs: 6, md: 4 }}>
            <Text tag="p" variant="titleXS" bold>{following}</Text>
            <Text tag="p" variant="paragraph1" userInfor>Seguindo</Text>
          </Grid.Col>

          <Grid.Col value={{ xs: 6, md: 4 }}>
            <Text tag="p" variant="titleXS" bold>{followers}</Text>
            <Text tag="p" variant="paragraph1" userInfor>Seguidores</Text>
          </Grid.Col>

        </Grid.Row>

        <Grid.Row margin="0px">

          <Grid.Col margin="0px" display={{ xs: 'none', md: 'block' }}>
            <Text tag="p" variant="titleXS" bold margin="0px">{userName}</Text>
            <Text tag="p" variant="paragraph1">
              {userBio}
            </Text>
          </Grid.Col>
        </Grid.Row>

      </Grid.Col>
      <Grid.Col margin="0px" display={{ xs: 'block', md: 'none' }}>
        <Text tag="p" variant="titleXS" bold margin="0px">{userName}</Text>
        <Text tag="p" variant="paragraph1">
          {userBio}
        </Text>
      </Grid.Col>
    </Grid.Row>
  );
}
