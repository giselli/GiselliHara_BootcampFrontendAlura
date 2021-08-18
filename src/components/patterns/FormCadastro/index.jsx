import React from 'react';

function FormContent() {
  const [userInfo, setUserInfo] = React.useState({
    usuario: 'nomedousuario',
    email: 'mail@email.com',
  });

  return (
    <form>
      <div>
        <input
          placeholder="Email"
          name="email"
          value={userInfo.email}
          onChange={(event) => {
            console.log('Mudar o valor do input', fieldName);
            const fieldName = event.target.getAttribute('name');
            setUserInfo({
              ...userInfo,
              email: event.target.value,
            });
          }}
        />
      </div>
      <div>
        <input
          placeholder="Usuário"
          name="usuario"
          value={userInfo.usuario}
          onChange={() => {
            console.log('Mudar o valor do input');
          }}
        />

      </div>
      <div>
        <button type="submit">
          Cadastrar
        </button>
      </div>
    </form>
  );
}

// eslint-disable-next-line react/prop-types
export default function FormCadastro({ propsDoModal }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...propsDoModal}>
      <FormContent />
    </div>
  );
}
