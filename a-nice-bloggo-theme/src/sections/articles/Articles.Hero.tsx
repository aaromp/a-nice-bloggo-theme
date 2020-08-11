import React, { useContext } from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";

import Section from "@components/Section";
import Icons from "@icons";
import mediaqueries from "@styles/media";
import { IAuthor } from "@types";

import { GridLayoutContext } from "./Articles.List.Context";
const allGhostSettingsQuery = graphql`
  {
    allGhostSettings {
      edges {
        node {
          title
          description
        }
      }
    }
  }
`;

/* the large title and description that appears at the top of the main list */
const ArticlesHero: React.FC = () => {
  const { gridLayout = "rows", hasSetGridLayout, setGridLayout } = useContext(
    GridLayoutContext
  );

  const settings = useStaticQuery(allGhostSettingsQuery);

  const title = settings.allGhostSettings.edges[0].node.title;
  const description = settings.allGhostSettings.edges[0].node.description;
  const tilesIsActive = hasSetGridLayout && gridLayout === "tiles";

  return (
    <Section relative id="Articles__Hero">
      <HeadingContainer style={{ maxWidth: `600px` }}>
        {/*TODO: consider removing this header*/}
        <HeroHeading dangerouslySetInnerHTML={{ __html: title }} />
        <HeroDescription>{description}</HeroDescription>
      </HeadingContainer>
    </Section>
  );
};

export default ArticlesHero;

const HeadingContainer = styled.div`
  margin: 100px 0;

  ${mediaqueries.desktop`
    width: 80%;
  `}

  ${mediaqueries.tablet`
    width: 100%;
  `}
`;

const HeroHeading = styled.h1`
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

const HeroDescription = styled.p`
  color: ${(p) => p.theme.colors.grey};
  font-size: 20px;
  margin-top: 10px;
`;
