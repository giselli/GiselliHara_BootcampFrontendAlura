/* eslint-disable indent */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import styled, { css } from 'styled-components';
import { propsToStyle } from '../../theme/utils/propsToStyle';
import { breakpointsMedia } from '../../theme/utils/breakpointsMedia';
import Link from '../../commons/Link';
import { WebsitePageContext } from '../../wrappers/WebsitePage/context';

export const TextStyleVariantsMap = {
  paragraph1: css`
    ${({ theme }) => css`
      font-size: ${theme.typographyVariants.paragraph1.fontSize};
      /* font-weight: ${theme.typographyVariants.paragraph1.fontWeight}; */
      ${({ bold }) => (bold ? css`font-weight:bold` : css`font-weight:${theme.typographyVariants.paragraph1.fontWeight}`)};
      line-height: ${theme.typographyVariants.paragraph1.lineHeight};
    `}

    ${function _userInfor({ userInfor }) {
      if (userInfor) {
        return (css`
        ${({ theme }) => css`
          font-size: ${theme.typographyVariants.smallestException.fontSize};
          font-weight: ${theme.typographyVariants.smallestException.fontWeight};
          line-height: ${theme.typographyVariants.smallestException.lineHeight};
        `}
        ${breakpointsMedia({
          md: css`
          ${({ theme }) => css`
            font-size: ${theme.typographyVariants.paragraph1.fontSize};
            font-weight: ${theme.typographyVariants.paragraph1.fontWeight};
            line-height: ${theme.typographyVariants.paragraph1.lineHeight};
          `}
        `,
        })}
      `);
      }
      return '';
    }
    }
`,
  comments: css`
    font-size:${({ theme }) => theme.typographyVariants.comments.fontSize};
    font-weight:${({ theme }) => theme.typographyVariants.comments.fontWeight};
    line-height:${({ theme }) => theme.typographyVariants.comments.lineHeight};
`,
  smallestException: css`
        font-size:${({ theme }) => theme.typographyVariants.smallestException.fontSize};
        font-weight:${({ theme }) => theme.typographyVariants.smallestException.fontWeight};
        line-height:${({ theme }) => theme.typographyVariants.smallestException.lineHeight};
    `,
  title: css`
    ${({ theme }) => css`
      font-size: ${theme.typographyVariants.titleXS.fontSize};
      font-weight: ${theme.typographyVariants.titleXS.fontWeight};
      line-height: ${theme.typographyVariants.titleXS.lineHeight};
    `}
    ${breakpointsMedia({
    md: css`
        ${({ theme }) => css`
          font-size: ${theme.typographyVariants.title.fontSize};
          font-weight: ${theme.typographyVariants.title.fontWeight};
          line-height: ${theme.typographyVariants.title.lineHeight};
        `}
      `,
  })}
  `,
  titleXS: css`
  ${({ theme }) => css`
    font-size: ${theme.typographyVariants.paragraph1.fontSize};
    ${({ bold }) => (bold ? css`font-weight:bold` : css`font-weight:${theme.typographyVariants.paragraph1.fontWeight}`)};
    /* font-weight: ${theme.typographyVariants.paragraph1.fontWeight}; */
    line-height: ${theme.typographyVariants.paragraph1.lineHeight};
  `}
  ${breakpointsMedia({
    md: css`
      ${({ theme }) => css`
        font-size: ${theme.typographyVariants.titleXS.fontSize};
        ${(props) => (props.bold ? css`font-weight:bold` : css`font-weight:${theme.typographyVariants.paragraph1.fontWeight}`)};
        line-height: ${theme.typographyVariants.titleXS.lineHeight};
      `}
    `,
  })}
`,
  subTitle: css`
  font-size:${({ theme }) => theme.typographyVariants.subTitle.fontSize};
  font-weight:${({ theme }) => theme.typographyVariants.subTitle.fontWeight};
  line-height:${({ theme }) => theme.typographyVariants.subTitle.lineHeight};
`,

};

const TextBase = styled.span`
    ${(props) => TextStyleVariantsMap[props.variant]}
    color: ${(props) => get(props.theme, `colors.${props.color}.color`)};
    ${propsToStyle('textAlign')}
    ${propsToStyle('marginBottom')}
    ${propsToStyle('margin')}


`;

export default function Text({
  tag, variant, children, href, cmsKey, ...props
}) {
  const websitePageContext = useContext(WebsitePageContext);
  const componentContent = cmsKey ? websitePageContext.getCMSContent(cmsKey) : children;

  if (href) {
    return (
      <TextBase
        as={Link}
        variant={variant}
        {...props}
        href={href}
      >
        {componentContent}
      </TextBase>
    );
  }
  return (
    <TextBase
      as={tag}
      variant={variant}
      {...props}
    >
      {componentContent}
    </TextBase>

  );
}

Text.propsType = {
  tag: PropTypes.string.isRequired,
  variant: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
  cmsKey: PropTypes.string,
};

Text.defaultProps = {
  tag: 'span',
  variant: 'paragraph1',
  children: null,
  href: '',
  cmsKey: undefined,
};
