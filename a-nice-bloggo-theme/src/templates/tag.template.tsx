import React from "react";
import styled from "@emotion/styled";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import Paginator from "@components/Navigation/Navigation.Paginator";

import { Template } from "@types";
import TagHero from "../sections/tag/Tag.Hero";
import TagArticles from "../sections/tag/Tag.Articles";
import { MetaData } from "@components/meta";

const TagPage: Template = ({ location, pageContext }) => {
  const tag = pageContext.additionalContext.tag;
  const articles = pageContext.group;

  return (
    <Layout>
      <MetaData data={{ ghostTag: tag }} location={location} />
      <Section>
        <TagHero tag={tag} />
      </Section>
      <Section narrow>
        <TagArticles articles={articles} />
        <AuthorPaginator>
          <Paginator {...pageContext} />
        </AuthorPaginator>
      </Section>
    </Layout>
  );
};

export default TagPage;

const AuthorPaginator = styled.div`
  text-align: center;
`;
