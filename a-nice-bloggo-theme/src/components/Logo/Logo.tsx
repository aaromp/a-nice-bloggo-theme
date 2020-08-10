import React from "react";
import styled from "@emotion/styled";

import mediaqueries from "@styles/media";

import { Icon } from "@types";
import { graphql, useStaticQuery } from "gatsby";
import url from "url";
import { useColorMode } from "theme-ui";

const Logo: Icon = ({ fill = "white" }) => {
  const [colorMode] = useColorMode();
  /* TODO: Remove if you decide to use a logo */
  const useLogo = false;

  const {
    ghostSettings: { title, logo },
  } = useStaticQuery(graphql`
    {
      ghostSettings {
        title
        logo
      }
    }
  `);

  return (
    <LogoContainer>
     {useLogo && logo ?
       <img
          className="logo"
          src={ logo }
          alt={ title + " logo" }
        /> : null
      }
      <LogoAlt>{ title }</LogoAlt>
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  .logo {
    height: 32px;
    padding-right: 24px;
  }

  ${mediaqueries.phablet`
    .logo {
      height: auto;
      width:70%
    }
  `}

  .Logo__Mobile {
    display: none;
  }

  ${mediaqueries.tablet`
    .Logo__Desktop {
      display: none;
    }

    .Logo__Mobile{
      display: block;
    }
  `}
`;

const LogoAlt = styled.h1`
  color: ${(p) => p.theme.colors.primary};
  font-weight: var(--system-font-bold);
  // white-space: nowrap;
  font-size: 22px;
`;
