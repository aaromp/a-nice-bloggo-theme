import React from "react";
import styled from "@emotion/styled";

import Image from "@components/Image";

import mediaqueries from "@styles/media";
import { IAuthor } from "@types";

import SocialLinks from "@components/SocialLinks";

interface AuthorHeroProps {
  author: IAuthor;
}

/* TODO: figure out what to do with the profile image */
const useProfileImage = false;

const AuthorHero: React.FC<AuthorHeroProps> = ({ author }) => {
  return (
    <Hero>
      <CopyContainer>
        <UsernameContainer>
          <Heading>{author.name}</Heading>
          <Social>
            <SocialLinks links={author.social} />
          </Social>
        </UsernameContainer>
        <Subheading>{author.bio}</Subheading>
      </CopyContainer>
      {useProfileImage && author.profile_image ?
        <HeroImage>
          <RoundedImage alt="Author avatar" src={author.profile_image} />
        </HeroImage> : null
       }
    </Hero>
  );
};

export default AuthorHero;

const Hero = styled.div`
  z-index: 1;
  display: flex;
  align-items: space-between;
  margin: 100px 0;
`;

const CopyContainer = styled.div`
  flex-grow: 2;
`;

const UsernameContainer = styled.div`
  display: flex;
  flex-direction: row;
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

const Social = styled.div`
  display: flex;
  align-items: center;
  margin: 0 16px;

  ${mediaqueries.phablet`
    font-size: 14px;
  `}
`;

const HeroImage = styled.div`
  overflow: hidden;
  flex-basis: 100px;
  flex-shrink: 1;
  border: 2px solid ${(p) => p.theme.colors.background};
`;

const RoundedImage = styled(Image)`
  border-radius: 8px;
  width: 100%;
  height: auto;
`;
