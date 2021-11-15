import React, { useEffect, useState } from 'react';
import { Box } from '../../foundation/layout/Box';
import Text from '../../foundation/Text';

export function FriendBar({ gitInfo }) {
  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    const users = [];
    await fetch(gitInfo.followers_url)
      .then((response) => response.json())
      .then((response) => {
        for (let i = 0; i < 5; i += 1) {
          users.push(response[i]);
        }
      });
    setFriends(users);
  };
  useEffect(() => {
    getFriends();
  }, []);
  return (
    <Box
      display={{ xs: 'none', md: 'flex' }}
      flexDirection="column"
      margin="50px"
      style={{
        position: 'sticky',
        width: 'auto',
        height: 'calc(100vh - 40px)',
        top: '70px',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
      >
        <Box display="flex" margin=" 20px 0px" justifyContent="flex-start" alignItems="center">
          <img src={gitInfo.avatar_url} alt={`imagem de ${gitInfo.login}`} style={{ width: '50px', borderRadius: '25px', margin: '0px 10px' }} />
          <Text color="secondary.main">{gitInfo.login}</Text>
        </Box>
        <Box marginLeft="20px" style={{ cursor: 'pointer' }}>
          <Text href={gitInfo.html_url} color="secondary.main">
            <img src="/images/assets/github.png" alt="Logo do Github em vermelho" />
            GitHub
          </Text>
        </Box>
      </Box>
      <Text color="tertiary.light" tag="p" variant="paragraph1" bold>Projetos da galera</Text>
      {friends.map((i) => (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" margin=" 20px 0px" justifyContent="flex-start" alignItems="center">
            <img src={i.avatar_url} alt={`imagem de ${i.login}`} style={{ width: '50px', borderRadius: '25px', margin: '0px 20px' }} />
            <Text color="secondary.main">{i.login}</Text>
          </Box>
          <Box marginLeft="20px" style={{ cursor: 'pointer' }}>
            <Text href={i.html_url} color="secondary.main">
              <img src="/images/assets/github.png" alt="Logo do Github em Vermelho" />
              Github
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
