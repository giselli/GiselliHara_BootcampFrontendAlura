import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Lottie } from '@crello/react-lottie';
import PropTypes from 'prop-types';
import { TextStyleVariantsMap } from '../../foundation/Text';
import { propsToStyle } from '../../theme/utils/propsToStyle';
import Link from '../Link';
import LikeAnim from '../../../assets/animation/like.json';

export const ButtonWrapperIcon = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 0;
    width: 50px;
    margin:2px;
    padding:0px;
    font-weight: bold;
    opacity: 1;
    cursor: pointer;
    
    ${TextStyleVariantsMap.smallestException}
    background-color: transparent;
    transition: opacity${({ theme }) => theme.transition};
    &:hover,
    &:focus {
        opacity: .5;
    }
    ${propsToStyle('display')}
    ${propsToStyle('order')}
    
`;

export function ButtonLike({
  href, children, icon, handleLike, imgId, ...props
}) {
  const hasHref = Boolean(href);
  const tag = hasHref ? Link : 'button';
  const like = Boolean(props.liked);
  const [animationState, setAnimationState] = useState(1);
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: LikeAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  useEffect(() => {
    setAnimationState(like ? 1 : -1);
  }, [like]);
  return (
    <ButtonWrapperIcon
      as={tag}
      href={href}
      {...props}
      onClick={() => {
        handleLike();
        const reverseAnimation = -1;
        const normalAnimation = 1;
        setAnimationState({
          ...animationState,
          direction: animationState.direction === normalAnimation
            ? reverseAnimation
            : normalAnimation,
        });
      }}
    >
      <Lottie
        config={defaultOptions}
        height="100px"
        width="100px"
        direction={animationState}
        isStopped={false}
        isPaused={false}
      />
    </ButtonWrapperIcon>
  );
}

ButtonLike.defaultProps = {
  href: undefined,
};

ButtonLike.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};
