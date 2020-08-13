import styled from "@emotion/styled";
import { css } from "@emotion/core";

import mediaqueries from "@styles/media";

/**
 * Example:
 * <Heading.h1>Lorem Ipsum</Heading.h1>
 */

const commonStyles = p => css`
  font-weight: var(--font-semibold);
  color: ${p.theme.colors.primary};
  font-family: ${p.theme.fonts.headline};
  margin: 0;
`;

const h1 = styled.h1`
  font-size: 7.2rem;
  line-height: 8rem;
  word-break: break-word;
  letter-spacing: -2%;
  ${commonStyles};

  ${mediaqueries.desktop`
    font-size: 7.2rem;
    line-height: 8rem;
  `};

  ${mediaqueries.phablet`
    font-size: 6.4rem;
    line-height: 7.2rem;
  `};
`;

const h2 = styled.h2`
  font-size: 6.4rem;
  line-height: 7.2rem;
  word-break: keep-all;
  letter-spacing: -1%;
  ${commonStyles};

  ${mediaqueries.desktop`
    font-size: 6.4rem;
    line-height: 7.2rem;
  `};

  ${mediaqueries.tablet`
    font-size: 5.6rem;
    line-height: 6.4rem;
  `};

  ${mediaqueries.phablet`
    font-size: 5.6rem;
    line-height: 6.4rem;
  `};
`;

const h3 = styled.h3`
  word-break: keep-all;
  font-size: 5.6rem;
  line-height: 6.4rem;
  ${commonStyles};

  ${mediaqueries.tablet`
    font-size: 4.8rem;
    line-height: 5.6rem;
  `};

  ${mediaqueries.phablet`
    font-size: 4.8rem;
    line-height: 5.6rem;
  `};
`;

const h4 = styled.h4`
  word-break: keep-all;
  font-size: 4rem;
  line-height: 4.8rem;
  letter-spacing: 1%;
  font-weight: var(--font-bold);
  ${commonStyles};

  ${mediaqueries.phablet`
    font-size: 4rem;
  `};
`;

const h5 = styled.h5`
  word-break: keep-all;
  font-size: 3.2rem;
  line-height: 4rem;
  letter-spacing: 2%;
  font-weight: var(--font-bold);
  ${commonStyles};

  ${mediaqueries.phablet`
    font-size: 3.2rem;
  `};
`;

const h6 = styled.h6`
  word-break: keep-all;
  font-size: 2.4rem;
  line-height: 3.2rem;
  letter-spacing: 4%;
  font-weight: var(--font-bold);
  text-transform: uppercase;
  ${commonStyles};

  ${mediaqueries.phablet`
    font-size: 2.4rem;
  `};
`;

export default {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
};
