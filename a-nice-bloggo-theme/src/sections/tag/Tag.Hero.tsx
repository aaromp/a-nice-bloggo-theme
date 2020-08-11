import React from "react";
import styled from "@emotion/styled";

import mediaqueries from "@styles/media";
import { ITag } from "@types";

interface TagHeroProps {
  tag: ITag;
}

const TagHero: React.FC<TagHeroProps> = ({ tag }) => {
  return (
    <Hero>
      <Heading>{tag.name}</Heading>
      <Subheading>writing a longer subheading description</Subheading>
    </Hero>
  );
};

export default TagHero;

const TagHeroContainer = styled.section`
`;

const Hero = styled.div`
  margin: 100px 0;

  ${mediaqueries.desktop`
    width: 80%;
  `}

  ${mediaqueries.tablet`
    width: 100%;
  `}
`;

const Heading = styled.h1`
  font-style: normal;
  font-weight: var(--system-font-semibold);
  font-size: 52px;
  line-height: 1.15;
  color: ${(p) => p.theme.colors.primary};

  a {
    color: ${(p) => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 38px
  `}

  ${mediaqueries.phablet`
    font-size: 32px;
  `}
`;

const Subheading = styled.p`
  color: ${(p) => p.theme.colors.grey};
  font-size: 20px;
  margin-top: 8px;
`;
