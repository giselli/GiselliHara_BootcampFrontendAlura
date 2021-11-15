import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MenuWrapper, PrivateMenuWrapper } from './styles/MenuWrapper';
import Logo from '../../../assets/Logo';
import { Button } from '../Button';
import Text from '../../foundation/Text';
import TextField from '../../forms/TextField';
import PerfilImg from '../ImagemPerfil';

export default function Menu({ onCadastrarClick }) {
  const link = [{
    texto: 'Home',
    url: '/',
  }, {
    texto: 'Perguntas frequentes',
    url: '/faq',
  }, {
    texto: 'Sobre',
    url: '/about',
  },
  ];
  return (
    <MenuWrapper>
      <MenuWrapper.Left>
        <Logo />
      </MenuWrapper.Left>
      <MenuWrapper.Central>
        {link.map((i) => (
          <li key={i.url}>
            <Text tag="a" variant="smallestException" href={i.url}>
              {i.texto}
            </Text>
          </li>
        ))}
      </MenuWrapper.Central>
      <MenuWrapper.Right>
        <Button ghost variant="primary.main" href="/app/login">
          Entrar
        </Button>
        <Button
          variant="primary.main"
          onClick={onCadastrarClick}
        >
          Cadastrar
        </Button>
      </MenuWrapper.Right>
    </MenuWrapper>
  );
}
Menu.propTypes = {
  onCadastrarClick: PropTypes.func.isRequired,
};

export function PrivateMenu({ onNewPostClick, avatar }) {
  const [searhClick, setSearhClick] = useState(false);

  return (
    <PrivateMenuWrapper>
      <PrivateMenuWrapper.Left>
        <Logo />
      </PrivateMenuWrapper.Left>

      <PrivateMenuWrapper.Central searhClick={searhClick}>
        <form>
          <TextField placeholder="Pesquisa" search />
        </form>
      </PrivateMenuWrapper.Central>
      <PrivateMenuWrapper.Right>

        <Button icon onClick={onNewPostClick} order={{ xs: '3', md: '1' }}>
          <img src="/images/assets/postIcon.png" alt="Novo Post" />
        </Button>
        <Button
          icon
          onClick={() => setSearhClick(!searhClick)}
          order={{ xs: '2', md: '' }}
          display={{ xs: 'block', md: 'none' }}
        >
          <img src="/images/lupa.svg" alt="Pesquisa" style={{ width: '35px' }} />
        </Button>
        <Button icon href="feed" order={{ xs: '1', md: '2' }}>
          <img src="/images/assets/home.png" alt="Home" />
        </Button>
        <Button icon order={{ xs: '3', md: '3' }}>
          <img src="/images/assets/heart.png" alt="Likes" />
        </Button>
        <Button icon href="profile" order={{ xs: '5', md: '4' }}>
          <PerfilImg
            avatar={avatar}
          />
        </Button>
      </PrivateMenuWrapper.Right>
    </PrivateMenuWrapper>
  );
}
