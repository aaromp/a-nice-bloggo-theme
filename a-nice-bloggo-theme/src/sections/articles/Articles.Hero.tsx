import React, { useContext } from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";

import Section from "@components/Section";
import Bio from "@components/Bio";
import Icons from "@icons";
import mediaqueries from "@styles/media";
import { IAuthor } from "@types";

import { GridLayoutContext } from "./Articles.List.Context";

const authorQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              heading
              maxWidth
            }
          }
        }
      }
    }
  }
`;

const siteSettingsQuery = graphql`
  {
    site {
      siteMetadata {
        siteTitle
        siteDescription
      }
    }
  }
`;

const ArticlesHero: React.FC = () => {
  const { gridLayout = "rows", hasSetGridLayout, setGridLayout } = useContext(
    GridLayoutContext
  );

  // const results = useStaticQuery(authorQuery);
  const siteSettings = useStaticQuery(siteSettingsQuery);

  const title = siteSettings.site.siteMetadata.siteTitle;
  const description = siteSettings.site.siteMetadata.siteDescription;
  // const hero = results.site.edges[0].node.siteMetadata.hero;
  const tilesIsActive = hasSetGridLayout && gridLayout === "tiles";
  // const featuredAuthor = authors.find((author) => author.featured);

  // if (!featuredAuthor) {
  //   throw new Error(`
  //     No featured Author found.
  //     Please ensure you have at least featured Author.
  // `);
  // }

  return (
    <Section relative id="Articles__Hero">
      {/* <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <HeroHeading dangerouslySetInnerHTML={{ __html: hero.heading }} />
      </HeadingContainer> */}
      <HeadingContainer style={{ maxWidth: `600px` }}>
        <HeroHeading dangerouslySetInnerHTML={{ __html: title }} />
        <HeroDescription>{description}</HeroDescription>
      </HeadingContainer>
      <SubheadingContainer>
        {/* <Bio author={featuredAuthor} /> */}
      </SubheadingContainer>
    </Section>
  );
};

export default ArticlesHero;

const SubheadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 100px;

  ${mediaqueries.desktop`
    margin-bottom: 80px;
  `};

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `};

  ${mediaqueries.phablet`
    display: none;
  `};
`;

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
