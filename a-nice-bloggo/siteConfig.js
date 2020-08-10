module.exports = {
  siteUrl: "https://ghost-novela-preview.draftbox.co",
  postsPerPage: 6,
  siteTitleMeta: "Built with Draftbox",
  siteDescriptionMeta:
    "Lightning fast, secure front-end for your WordPress or Ghost blog, without coding.",
  shareImageWidth: 1000,
  shareImageHeight: 523,
  shortTitle: "Built with Draftbox",
  siteIcon: "favicon.png",
  backgroundColor: "#e9e9e9",
  themeColor: "#15171A",
  apiUrl: "https://ghost.theasdfghjkl.com",
  footer: {
    copyright: "Built with Draftbox",
    navigation: [
      {
        label: "Home",
        url: "https://ghost-novela-preview.draftbox.co/",
      },
      {
        label: "Sitemap",
        url: "https://ghost-novela-preview.draftbox.co/sitemap.xml",
      },
      {
        label: "RSS",
        url: "https://ghost-novela-preview.draftbox.co/rss.xml",
      },
      {
        label: "Contact",
        url: "https://ghost-novela-preview.draftbox.co/contact",
      },
    ],
  },
  subscribeWidget: {
    visible: true,
    title: "Subscribe to Built with Draftbox",
    helpText: "Get the latest posts delivered right to your inbox.",
    successMessage: "Thanks for subscribing to Built with Draftbox.",
  },
  socialLinks: {
    twitter: "https://twitter.com/draftboxhq",
    facebook: "https://facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://linkedin.com",
    github: "https://github.com/draftbox-co",
    pinterest: "https://pinterest.com/",
    youtube: "https://youtube.com/",
    dribbble: "https://dribbble.com/",
    behance: "https://behance.com/",
    whatsapp: "https://whatsapp.com/",
    externalLink: "",
  },
  metadata: {
    title: "Built with Draftbox",
    description:
      "Lightning fast, secure front-end for your WordPress or Ghost blog, without coding. Draftbox is a new-age blogging platform for everyone, built on Gatsby.",
  },
  twitterCard: {
    title: "Built with Draftbox",
    description:
      "Lightning fast, secure front-end for your WordPress or Ghost blog, without coding. Draftbox is a new-age blogging platform for everyone, built on Gatsby.",
    imageUrl: "twitterImage.png",
    username: "@DraftboxHQ",
  },
  facebookCard: {
    title: "Built with Draftbox",
    description:
      "Lightning fast, secure front-end for your WordPress or Ghost blog, without coding. Draftbox is a new-age blogging platform for everyone, built on Gatsby.",
    imageUrl: "facebookImage.png",
    appId: "",
    width: 1000,
    height: 523,
  },
  siteTitle: "Built with Draftbox",
  siteDescription:
    "Lightning fast, secure front-end for your WordPress or Ghost blog, without coding.",
  language: "en",
  iconUrl:
    "https://ghost.theasdfghjkl.com/content/images/2020/05/draftbox-colored-icon.png",
  coverUrl: "cover.png",
  themeConfig: {
    variables: [
      { varName: "--accent-color", value: "#6166DC" },
      { varName: "--accent-color-dark", value: "#E9DAAC" },
      { varName: "--success-color", value: "#46B17B" },
      { varName: "--success-color-dark", value: "#46B17B" },
      {
        varName: "--merriweather-font",
        value: `Merriweather`,
      },
      {
        varName: "--merriweather-font-bold",
        value: `700`,
      },
      {
        varName: "--system-font",
        value: `system-ui`,
      },
      {
        varName: "--system-font-normal",
        value: `400`,
      },
      {
        varName: "--system-font-semibold",
        value: `600`,
      },
      {
        varName: "--system-font-bold",
        value: `700`,
      },
      {
        varName: "--monospace-font",
        value: `Source Code Pro`,
      },
      {
        varName: "--monospace-font-normal",
        value: `400`,
      },
    ],
    fonts: [
      {
        family: "Merriweather",
        variants: ["700"],
        //subsets: ['latin']
        //text: 'Hello'
        fontDisplay: "swap",
        strategy: "selfHosted", // 'base64' || 'cdn'
      },
      {
        family: "Source Code Pro",
        variants: ["400"],
        //subsets: ['latin']
        //text: 'Hello'
        fontDisplay: "swap",
        strategy: "selfHosted", // 'base64' || 'cdn'
      },
    ],
  },
};
