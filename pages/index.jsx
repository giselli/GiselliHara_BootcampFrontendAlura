import React from 'react';
import Footer from '../src/components/commons/Footer';
import Menu from '../src/components/commons/Menu';
import { Text } from '../src/components/foundation/Text';
import Button from '../src/components/commons/Button';
import Grid from '../src/components/foundation/layout/Grid';
import Box from '../src/components/foundation/layout/Box';
import Modal from '../src/components/commons/Modal';

export default function Home() {
  const [isModalOpen, setModalState] = React.useState(false);
  console.log('retorno do Hook', isModalOpen[1]);
  // o primeiro valor do array é o inicial do estado

  return (
    <Box
      flex="1"
      display="flex"
      flexWrap="wrap"
      flexDirection="column"
      justifyContent="space-between"
      backgroundImage="url(/images/bubbles.svg)"
      backgroundRepeat="no-repeat"
      backgroundPosition="bottom right"
    >

      {/* { isModalOpen && <Modal isOpen={isModalOpen} /> } */}
      {/* Verifica se o modal está aberto ou fechado  */}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setModalState(false);
        }}
      >
        {(propsDoModal) => {
          <Box
            backgroundColor="white"
          // data-modal-safe-area="true"
          // área do Modal que pode ser clicada
          // área segura dentro do box
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...propsDoModal}
          >
            Conteúdo para o Modal!
          </Box>;
        }}

      </Modal>

      <Menu />

      <Grid.Container
        marginTop={{
          xs: '32px',
          md: '75px',
        }}
      >
        <Grid.Row>
          <Grid.Col
            offset={{ xs: 0, md: 1 }}
            // pula uma coluna das 12 para que o texto se inicie
            value={{ xs: 12, md: 5 }}
          // o primeiro elemento ocupará 5 colunas do grid com a tela em md
          >

            <Text
              variant="title"
              tag="h1"
              color="tertiary.main"
              textAlign={{
                xs: 'center',
                md: 'left',
              }}
            >
              Compartilhe momentos e conecte-se com amigos
            </Text>
            <Text
              variant="paragraph1"
              tag="p"
              color="tertiary.light"
              textAlign={{
                xs: 'center',
                md: 'left',
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.
            </Text>

            <Button
              variant="primary.main"
              margin={{
                xs: 'auto',
                md: 'initial',
              }}
              display="block"
              onClick={() => {
                // isModalOpen = true;
                setModalState(!isModalOpen);
                // mudando o estado quando o botão é clicado
              }}
            >
              Cadastrar
            </Button>
          </Grid.Col>
          <Grid.Col
            value={{
              xs: 12,
              md: 6,
            }}
          >
            {/* <img src="https://placehold.it/400x400" /> */}
            {/* <img src="https://picsum.photos/400" /> */}
            <img
              style={{ display: 'block', margin: 'auto' }}
              src="https://bootcamp-alura-01-git-modulo01.omariosouto.vercel.app/images/phones.png"
              alt="imagem de um telefone com fotos de Nicolas Cage"
            />
          </Grid.Col>

        </Grid.Row>
      </Grid.Container>
      <Footer />
    </Box>
  );
}
