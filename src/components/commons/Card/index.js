import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Dots } from '../../../assets/dots';
import { userService } from '../../../service/user/userService';
import { Box } from '../../foundation/layout/Box';
import Text from '../../foundation/Text';
import { Button, ButtonLike } from '../Button';

export { NewPhoto } from './NewPhoto';

const CardWrapper = styled.div`
  max-width: 600px;
  margin: 25px auto 25px auto;
  display:flex;
  flex-direction: column;
  background-color:${({ theme }) => (theme.colors.background.light.color)};
`;
const CardHead = styled(Box)`
  max-width: 600px;
  display: inherit;
  justify-content: space-between;
  align-items:center;
  padding: 25px 40px;
  img{
    width:50px;
    height: 50px;
    border-radius: 25px;
    margin-right:19px
  }
`;
const CardBody = styled(Box)`
  max-width: 100%;
  max-height: 600px;
  display:flex;
  img{
    width:100%;
  }
`;
const CardFooter = styled(Box)`
  margin: 10px 25px;
  max-width: 600px;
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  img{
    width:30px;
    height: 30px;
    border-radius: 25px;
    margin-right:19px
  }
`;

export default function Card({
  Post, user, allLikes, filter, description, avatarURL, imgId,
}) {
  const [likes, setLikes] = useState([...allLikes]);
  const [isLiked, setIsLiked] = useState(true);
  const handleLikes = async (e) => {
    const response = await userService.Liked(e);
    if (response) {
      setLikes(response.likes ?? []);
    }
    if (!response) {
      setLikes([]);
    }
  };

  function hasLiked(postLiked) {
    const Liked = postLiked.some((elem) => elem.user === user.id);
    return Liked;
  }

  useEffect(() => {
    setIsLiked(hasLiked(likes));
  }, [likes]);
  return (
    <CardWrapper>
      <CardHead>
        <Box
          display="flex"
          alignItems="center"
        >
          <img src={avatarURL} alt={`Avatar do ${user.username}`} />
          <Text tag="p" variant="paragraph1">
            {user.username}
          </Text>
        </Box>
        <Button icon>
          <Dots />
        </Button>
      </CardHead>
      <CardBody>
        <img src={Post} className={`${filter} filter-${filter}`} alt={description} loading="lazy" />
      </CardBody>
      <CardFooter>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <ButtonLike
              liked={isLiked}
              name="Curtidas"
              data-imgId={imgId}
              imgId={imgId}
              handleLike={() => handleLikes(imgId)}
            />
            {likes.length}
            <Button icon>
              <img src="/images/assets/message-circle.png" alt="comentarios" />
            </Button>
            <Button icon>
              <img src="/images/assets/send.png" alt="compartilhar" />
            </Button>
          </Box>
          <Button icon>
            <img src="/images/assets/bookmark.png" alt="salvar" />
          </Button>
        </Box>
        <Box display="flex" alignItems="center">
          <img src={avatarURL} alt={`Avatar do ${user.username}`} />
          <Text tag="p" variant="comments">
            So excited to play this new...
          </Text>
          <Button comments>
            <Text tag="p">Mais</Text>
          </Button>
        </Box>
      </CardFooter>
    </CardWrapper>
  );
}
