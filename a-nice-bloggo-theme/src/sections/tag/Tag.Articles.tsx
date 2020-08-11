import React from "react";
import styled from "@emotion/styled";

import mediaqueries from "@styles/media";
import { IArticle } from "@types";

import ArticlesList from "../articles/Articles.List";

interface AuthorArticlesProps {
  articles: IArticle[];
}

const AuthorArticles: React.FC<AuthorArticlesProps> = ({ articles }) => {
  return (
    <TagArticlesContainer>
      <ArticlesList articles={articles} alwaysShowAllDetails />
    </TagArticlesContainer>
  );
};

export default AuthorArticles;

const TagArticlesContainer = styled.section`
`;
