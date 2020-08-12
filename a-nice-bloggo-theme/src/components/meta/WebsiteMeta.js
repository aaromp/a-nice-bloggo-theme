import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
//import _ from 'lodash'
import { StaticQuery, graphql } from "gatsby";
import url from "url";

//import ImageMeta from './ImageMeta'

const WebsiteMeta = ({
  data,
  settings,
  canonical,
  title,
  description,
  image,
  type,
}) => {
  const config = settings.site.siteMetadata;
  const ghostSettings = settings.allGhostSettings.edges[0].node;
  const ghostURL = ghostSettings.url;
  const publisherLogo = ghostURL ? url.resolve(ghostURL, ghostSettings.logo)
                                 : null;

  title = ghostSettings.title;
  description =
    ghostSettings.description ||
    ghostSettings.meta_description ||
    ghostSettings.og_description ||
    ghostSettings.twitter_description;

  console.log(ghostURL);
  let shareImage =
    ghostSettings.cover_image ||
    ghostSettings.og_image ||
    ghostSettings.twitter_image;
  shareImage = shareImage ? url.resolve(canonical, shareImage) : null;

  const jsonLd = {
    "@context": `https://schema.org/`,
    "@type": type,
    url: canonical,
    image: shareImage
      ? {
          "@type": `ImageObject`,
          url: shareImage,
          width: config.shareImageWidth,
          height: config.shareImageHeight,
        }
      : undefined,
    publisher: {
      "@type": `Organization`,
      name: title,
      logo: publisherLogo
        ? {
            "@type": `ImageObject`,
            url: publisherLogo,
            width: 60,
            height: 60,
          }
        : undefined,
    },
    mainEntityOfPage: {
      "@type": `WebPage`,
      "@id": ghostURL,
    },
    description: ghostSettings.og_description || ghostSettings.description,
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: ghostSettings.lang || "auto" }}>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        {ghostSettings.og_image !== "" && (
          <meta
            property="og:image"
            content={ghostSettings.og_image}
          />
        )}
        {/* TODO: determine if you want to use this value from the config */}
        {config.facebookCard.width !== "" && (
          <meta property="og:image:width" content={config.facebookCard.width} />
        )}
        {config.facebookCard.height !== "" && (
          <meta
            property="og:image:height"
            content={config.facebookCard.height}
          />
        )}
        {config.facebookCard.appId !== "" && (
          <meta property="fb:app_id" content={config.facebookCard.appId} />
        )}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={canonical} />
        {ghostSettings.twitter && <meta name="twitter:site" content={`https://twitter.com/${ghostSettings.twitter.replace(/^@/, ``)}/`} />}
        {ghostSettings.twitter && <meta name="twitter:creator" content={ghostSettings.twitter} />}
        {ghostSettings.twitter_image && (
          <meta
            name="twitter:image"
            content={url.resolve(ghostSettings.twitter_image)}
          />
        )}
        {ghostSettings.twitter_image && (
          <meta name="twitter:card" content="summary_large_image" />
        )}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd, undefined, 4)}
        </script>
      </Helmet>
    </>
  );
};

WebsiteMeta.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    meta_title: PropTypes.string,
    meta_description: PropTypes.string,
    name: PropTypes.string,
    feature_image: PropTypes.string,
    description: PropTypes.string,
    bio: PropTypes.string,
    profile_image: PropTypes.string,
  }).isRequired,
  settings: PropTypes.shape({
    logo: PropTypes.object,
    description: PropTypes.string,
    title: PropTypes.string,
    twitter: PropTypes.string,
    allGhostSettings: PropTypes.object.isRequired,
    site: PropTypes.object.isRequired,
    iconUrl: PropTypes.string,
  }).isRequired,
  canonical: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.oneOf([`WebSite`, `Series`]).isRequired,
};

const WebsiteMetaQuery = (props) => (
  <StaticQuery
    query={graphql`
      query GhostSettingsWebsiteMeta {
        allGhostSettings {
          edges {
            node {
              ...GhostSettingsFields
            }
          }
        }
        site {
          siteMetadata {
            ...SiteMetadataFields
          }
        }
      }
    `}
    render={(data) => <WebsiteMeta settings={data} {...props} />}
  />
);

export default WebsiteMetaQuery;
