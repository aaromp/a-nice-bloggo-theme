import React from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery, Link } from "gatsby";

import Section from "@components/Section";
import SocialLinks from "@components/SocialLinks";

import mediaqueries from "@styles/media";
import { result } from "lodash";

const siteQuery = graphql`
  {
    site {
      siteMetadata {
        siteUrl
        apiUrl
        socialLinks {
          twitter
          facebook
          instagram
          linkedin
          github
          pinterest
          whatsapp
          youtube
          dribbble
          behance
          externalLink
        }
        footer {
          navigation {
            label
            url
          }
        }
      }
    }
    allGhostSettings {
      edges {
        node {
          title
          url
        }
      }
    }
  }
`;

const Footer: React.FC<{}> = () => {
  const results = useStaticQuery(siteQuery);

  const social = [];

  const {
    site: {
      siteMetadata: { socialLinks = [], footer, apiUrl, siteUrl },
    },
    allGhostSettings,
  } = results;
  const title = allGhostSettings.edges[0].node.title;
  // const siteUrl = allGhostSettings.edges[0].node.url;


  Object.keys(socialLinks).forEach((key) => {
    if (socialLinks[key]) {
      social.push({ name: key, url: socialLinks[key] });
    }
  });

  return (
    <>
      <Section narrow>
        <HoritzontalRule />
        <FooterContainer>
          <SocialLinksContainer>
            <SocialLinks links={social} />
          </SocialLinksContainer>
          <FooterLinksContainer>
            {footer.navigation.map(({ label, url }, index) => {
              return url.startsWith("/") ||
                url.startsWith(siteUrl) ||
                url.startsWith(apiUrl) ? (
                <FooterLink
                  key={index}
                  to={`${
                    url.startsWith("/")
                      ? url
                      : url.startsWith(siteUrl)
                      ? url.slice(siteUrl.length, url.length)
                      : url.slice(apiUrl.length, url.length)
                  }`}
                  as={Link}
                >
                  {label}
                </FooterLink>
              ) : (
                <FooterLink
                  key={index}
                  href={url}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {label}
                </FooterLink>
              );
            })}
            {/* <pre>{JSON.stringify(footer.navigation, null, 2)}</pre> */}
            {/* <FooterLink as={Link} to="/">
              Home
            </FooterLink>
            <FooterLink as={Link} to="/sitemap.xml">
              Sitemap
            </FooterLink>
            <FooterLink as={Link} to="/rss.xml">
              RSS
            </FooterLink>  */}
          </FooterLinksContainer>
          <FooterText>
            {/* © {copyrightDate} {name} */}
            {title} © {new Date().getFullYear()}
          </FooterText>
        </FooterContainer>
        <CreditsContainer>
        </CreditsContainer>
      </Section>
    </>
  );
};

export default Footer;

const FooterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // padding-bottom: 80px;
  color: ${(p) => p.theme.colors.grey};

  ${mediaqueries.tablet`
  flex-direction: column;
  // padding-bottom: 100px;
  `}

  ${mediaqueries.phablet`
  // padding-bottom: 50px;
  `}
`;

const HoritzontalRule = styled.div`
  position: relative;
  margin: 140px auto 50px;
  border-bottom: 1px solid ${(p) => p.theme.colors.horizontalRule};

  ${mediaqueries.tablet`
    margin: 60px auto;
  `}

  ${mediaqueries.phablet`
    display: none;
  `}
`;

const SocialLinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 25%;

  ${mediaqueries.tablet`
    width: 100%;
    justify-content: center;
  `}
`;

const FooterText = styled.div`
    width: 25%;

    ${mediaqueries.tablet`
      width: 100%;
      text-align: center;
    `}

  // ${mediaqueries.tablet`
  //   margin-bottom: 80px;
  // `}

  // ${mediaqueries.phablet`
  //   margin: 120px auto 100px;
  // `}
`;

const FooterLinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 40%;

  ${mediaqueries.tablet`
  width: 100%;
`}

  ${mediaqueries.tablet`
  margin: 40px auto;
`}
`;

const FooterLink = styled.a`
  color: ${(p) => p.theme.colors.grey};
  margin: 10px 15px;

  :hover {
    color: ${(p) => p.theme.colors.primary};
  }
`;

const CreditsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;
