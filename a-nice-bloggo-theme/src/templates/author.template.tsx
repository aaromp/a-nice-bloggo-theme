import React from "react";
import styled from "@emotion/styled";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import Paginator from "@components/Navigation/Navigation.Paginator";

import AuthorHero from "../sections/author/Author.Hero";
import AuthorArticles from "../sections/author/Author.Articles";

import { Template } from "@types";
import { MetaData } from "@components/meta";

const ArticlesPage: Template = ({ location, pageContext }) => {
  const author = pageContext.additionalContext.author;
  const articles = pageContext.group;


  return (
    <Layout>
      <MetaData data={{ ghostAuthor: author }} location={location} />
      {/* <SEO
        pathname={location.pathname}
        title={author.name}
        description={author.bio}
      /> */}
      <Section narrow>
        <AuthorHero author={author} />
        <AuthorArticles articles={articles} />
        <AuthorPaginator>
          <Paginator {...pageContext} />
        </AuthorPaginator>
      </Section>
    </Layout>
  );
};

export default ArticlesPage;

const AuthorPaginator = styled.div`
  text-align: center;
`;
