import React, { useState } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Footer from '../../commons/Footer';
import { Box } from '../../foundation/layout/Box';
import Menu, { PrivateMenu } from '../../commons/Menu';
import Modal from '../../commons/Modal';
import FormCadastro from '../../patterns/FormCadastro';
import SEO from '../../commons/SEO';
import { WebsitePageContext } from './context';
import { NewPhoto } from '../../commons/Card/NewPhoto';

export { WebsitePageContext } from './context';
export default function WebsitePageWrapper({
  children, seoProps, pageBoxProps, menuProps, messages, userContext,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostModal, setNewPostModal] = useState(false);
  return (
    <WebsitePageContext.Provider
      value={{
        teste: true,
        toggleModalCadastro: () => {
          setIsModalOpen(!isModalOpen);
        },
        getCMSContent: (cmsKey) => get(messages, cmsKey),
        userContext,
      }}
    >
      <SEO {...seoProps} />
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        {...pageBoxProps}
      >
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          {(propsDoModal) => (// usando () para nao precisar passar o return()
            <FormCadastro propsDoModal={propsDoModal} />
          )}
        </Modal>

        <Modal
          isOpen={newPostModal}
          onClose={() => setNewPostModal(false)}
          newPost
        >
          {(propsDoModal) => (
            <NewPhoto
              propsDoModal={propsDoModal}
            />
          )}
        </Modal>
        {menuProps.display && menuProps.variant === 'default' && (
          <Menu onCadastrarClick={() => setIsModalOpen(true)} />
        )}
        {menuProps.display && menuProps.variant === 'logged' && (

          <PrivateMenu
            onNewPostClick={() => setNewPostModal(true)}
            avatar={userContext.gitInfo.avatar_url}
          />
        )}
        {children}
        <Footer />
      </Box>
    </WebsitePageContext.Provider>
  );
}

WebsitePageWrapper.defaultProps = {
  seoProps: {},
  pageBoxProps: {},
  menuProps: {
    display: true,
    variant: 'default',
  },
  messages: '',
};

WebsitePageWrapper.propTypes = {
  seoProps: PropTypes.shape({
    headTitle: PropTypes.string,
  }),
  menuProps: PropTypes.shape({
    display: PropTypes.bool,
    variant: PropTypes.string,
  }),
  pageBoxProps: PropTypes.shape({
    backgroundImage: PropTypes.string,
    backgroundRepeat: PropTypes.string,
    backgroundPosition: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  messages: PropTypes.object,
};
