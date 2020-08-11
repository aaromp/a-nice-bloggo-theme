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
    <AuthorArticlesContainer>
      <ArticlesList articles={articles} alwaysShowAllDetails />
    </AuthorArticlesContainer>
  );
};

export default AuthorArticles;

const AuthorArticlesContainer = styled.section`
`;
