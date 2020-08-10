import React from "react";
import styled from "@emotion/styled";

import Section from "@components/Section";
import Layout from "@components/Layout";
import Paginator from "@components/Navigation/Navigation.Paginator";

import ArticlesHero from "../sections/articles/Articles.Hero";
import ArticlesList from "../sections/articles/Articles.List";

import { Template, IAuthor } from "@types";
import { MetaData } from "@components/meta";
import mediaqueries from "@styles/media";


/* template for the main page featuring a list of list of articles */
const ArticlesPage: Template = ({ location, pageContext }) => {
  const articles = pageContext.group;

  return (
    <Layout>
      <MetaData location={location} />
      {/* <SEO pathname={location.pathname} /> */}
      <ArticlesHero />
      <Section narrow>
        <ArticlesList articles={articles} />
        <ArticlesPaginator show={pageContext.pageCount > 1}>
          <Paginator {...pageContext} />
        </ArticlesPaginator>
      </Section>
    </Layout>
  );
};

export default ArticlesPage;

const ArticlesPaginator = styled.div<{ show: boolean }>`
  ${(p) => p.show && `margin-top: 95px;`}

  ${mediaqueries.phablet`
      margin-top: 0;
      display: flex;
      justify-content: center;
    `};
`;
