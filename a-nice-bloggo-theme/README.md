# a-nice-bloggo-theme

A Gatsby theme plugin for creating blogs from headless Ghost CMS.

Turn your Ghost blog into a lightning fast static website. This Gatsby theme is a frontend replacement of the Ghost handlebars engine. All content is sourced from a headless Ghost CMS.

## Features

- SEO optimized
- Fully responsive
- Gatsby images
- Styled 404 page
- RSS Feed
- AMP Pages
- Sitemap
- Subscribe Form
- Social Sharing
- Composable and extensible

## Installation

If you want to add this blog theme to an existing site, follow these instructions:

1. Install the blog theme

   ```bash
   yarn add a-nice-bloggo-theme
   # or
   npm install a-nice-bloggo-theme --save
   ```

2. Add the following configuration to your `gatsby-config.js` file

   ```js
   // gatsby-config.js
   module.exports = {
     plugins: [
       {
         resolve: `a-nice-bloggo-theme`,
         options: {
           siteConfig: {
             siteUrl: "https://aaronward.info",
             postsPerPage: 12,
             siteTitleMeta: "a nice bloggo",
             siteDescriptionMeta:
               "a very nice bloggo.",
             shareImageWidth: 1000,
             shareImageHeight: 523,
             shortTitle: "a nice bloggo",
             siteIcon: "favicon.png",
             backgroundColor: "#e9e9e9",
             themeColor: "#15171A",
             apiUrl: "https://blog.aaronward.info",
             header: {
               navigation: [
                 {
                   label: "Home",
                   url: "https://aaronward.info/",
                 },
               ],
             },
             footer: {
               copyright: "a nice bloggo",
               navigation: [
                 {
                   label: "Home",
                   url: "https://aaronward.info/",
                 },
                 {
                   label: "Sitemap",
                   url: "https://aaronward.info/sitemap.xml",
                 },
                 {
                   label: "RSS",
                   url: "https://aaronward.info/rss.xml",
                 },
               ],
             },
             subscribeWidget: {
               title: "Subscribe to a nice bloggo",
               helpText: "Get the latest posts delivered right to your inbox.",
               successMessage: "Thanks for subscribing to a nice bloggo.",
             },
             socialLinks: {
               twitter: "https://twitter.com/",
               facebook: "https://facebook.com/",
               instagram: "https://www.instagram.com/",
               linkedin: "https://linkedin.com",
               github: "https://github.com/",
             },
           },
           ghostConfig: {
             development: {
               apiUrl: "http://localhost:2368",
               contentApiKey: "9fcfdb1e5ea5b472e2e5b92942",
             },
             production: {
               apiUrl: "https://your-ghost-cms.com",
               contentApiKey: "9fcfdb1e5ea5b472e2e5b92942",
             },
           },
         },
       },
     ],
   };
   ```

3. Update siteConfig

   In the configuration shown above, the most important fields to be changed are `siteUrl`, `siteTitleMeta` and `siteDescriptionMeta`. Update at least those to fit your needs. Also make sure your `favicon.png` can be found in folder `static` of your working directory.

4. Ghost Content API Keys

   Change the `apiUrl` value to the URL of your Ghost CMS site. Next, update the `contentApiKey` value to a key associated with the Ghost CMS site. A key can be provided by creating an integration within Ghost Admin. Navigate to Integrations and click "Add new integration". Name the integration appropriately and click create.

## Running

Start the development server. You now have a Gatsby site pulling content from headless Ghost.

```bash
gatsby develop
```

## Optimizing

You can disable the default Ghost Handlebars Theme front-end by enabling the `Make this site private` flag within your Ghost settings. This enables password protection in front of the Ghost install and sets `<meta name="robots" content="noindex" />` so your Gatsby front-end becomes the source of truth for SEO.

## Credits
Forked from [gatsby-ghost-novela-theme](https://github.com/draftbox-co/gatsby-ghost-novela-theme)

# Copyright & License

Copyright (c) 2020 [Aaron Ward](https://aaronward.info) - Released under the [MIT license](LICENSE).
