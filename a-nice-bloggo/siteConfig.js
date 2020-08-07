module.exports = {
  siteUrl: "https://localhost:8000",
  postsPerPage: 12,
  siteTitleMeta: "Aaron Ward",
  siteDescriptionMeta:
    "Lightning fast, secure front-end for your WordPress or Ghost blog, without coding.",
  shareImageWidth: 1000,
  shareImageHeight: 523,
  shortTitle: "Aaron Ward",
  siteIcon: "favicon.png",
  backgroundColor: "#e9e9e9",
  themeColor: "#15171A",
  apiUrl: "https://blog.aaronward.info",
  header: {
    navigation: [
      {
        label: "Home",
        url: "https://localhost:8000/",
      },
    ],
  },
  footer: {
    copyright: "Aaron Ward",
    navigation: [
      {
        label: "Home",
        url: "https://localhost:8000/",
      },
      {
        label: "Sitemap",
        url: "https://localhost:8000/sitemap.xml",
      },
      {
        label: "RSS",
        url: "https://localhost:8000/rss.xml",
      },
    ],
  },
  subscribeWidget: {
    visible: true,
    title: "Subscribe to Aaron Ward",
    helpText: "Get the latest posts delivered right to your inbox.",
    successMessage: "Thanks for subscribing to Aaron Ward.",
  },
  socialLinks: {
    twitter: "https://twitter.com/",
    facebook: "https://facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://linkedin.com",
    github: "https://github.com/",
    pinterest: "",
    youtube: "",
    dribbble: "",
    behance: "",
    externalLink: "",
    whatsapp: "",
  },
  metadata: {
    title: "Aaron Ward",
    description:
      "a nice bloggo",
  },
  twitterCard: {
    title: "Aaron Ward",
    description:
      "a nice bloggo",
    imageUrl: "twitterImage.png",
    username: "@aaromp",
  },
  facebookCard: {
    title: "Aaron Ward",
    description:
      "a nice bloggo",
    imageUrl: "facebookImage.png",
    appId: "",
    width: 1000,
    height: 523,
  },
  siteTitle: "Aaron Ward",
  siteDescription:
    "Lightning fast, secure front-end for your WordPress or Ghost blog, without coding.",
  language: "en",
  logoUrl: "logo.svg",
  iconUrl:
    "https://ghost.theasdfghjkl.com/content/images/2020/05/draftbox-colored-icon.png",
  coverUrl: "cover.png",
  alternateLogoUrl: "alternateLogo.svg",
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
