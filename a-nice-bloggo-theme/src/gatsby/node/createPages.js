/* eslint-disable no-console, import/no-extraneous-dependencies, prefer-const, no-shadow */

const log = (message, section) =>
  console.log(`\n\u001B[36m${message} \u001B[4m${section}\u001B[0m\u001B[0m\n`);

const path = require("path");
const createPaginatedPages = require("gatsby-paginate");

const templatesDirectory = path.resolve(__dirname, "../../templates");
const templates = {
  posts: path.resolve(templatesDirectory, "articles.template.tsx"),
  post: path.resolve(templatesDirectory, "article.template.tsx"),
  author: path.resolve(templatesDirectory, "author.template.tsx"),
  tag: path.resolve(templatesDirectory, "tag.template.tsx"),
  page: path.resolve(templatesDirectory, "page.template.tsx"),
  ampPage: path.resolve(templatesDirectory, "article.template.amp.tsx"),
};

const query = require("../data/data.query");
const normalize = require("../data/data.normalize");

// ///////////////// Utility functions ///////////////////

function buildPaginatedPath(index, basePath) {
  if (basePath === "/") {
    return index > 1 ? `${basePath}page/${index}` : basePath;
  }
  return index > 1 ? `${basePath}/page/${index}` : basePath;
}

function slugify(string, base) {
  const slug = string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return `${base}/${slug}`.replace(/\/\/+/g, "/");
}

function getUniqueListBy(array, key) {
  return [...new Map(array.map((item) => [item[key], item])).values()];
}

const byDate = (a, b) => new Date(b.dateForSEO) - new Date(a.dateForSEO);

// ///////////////////////////////////////////////////////

module.exports = async ({ actions: { createPage }, graphql }, themeOptions) => {
  const {
    basePath = "/",
    authorsPath = "/authors",
  } = themeOptions;

  const { data } = await graphql(`
    query siteQuery {
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }
  `);

  const pageLength = data.site.siteMetadata.postsPerPage;

  let posts;
  let authors;
  let tags;
  let pages;
  let apiURL;
  let websiteTitle;

  const dataSources = {
    ghost: { posts: [], authors: [], tags: [], pages: [], settings: [] },
  };

  log("Config basePath", basePath);

  log("Querying", "data");
  try {
    const ghostPosts = await graphql(query.ghost.posts);
    const ghostAuthors = await graphql(query.ghost.authors);
    const ghostTags = await graphql(query.ghost.tags);
    const ghostPages = await graphql(query.ghost.pages);
    const ghostSettings= await graphql(query.ghost.settings);

    dataSources.ghost.posts = ghostPosts.data.posts.edges.map(
      normalize.ghost.posts
    );

    // Normalize author here if required
    dataSources.ghost.authors = ghostAuthors.data.authors.edges.map(
      (author) => author.node
    );

    dataSources.ghost.pages = ghostPages.data.pages.edges.map(
      normalize.ghost.posts
    );

    dataSources.ghost.tags = ghostTags.data.tags.edges.map((tag) => tag.node);

    dataSources.ghost.settings = ghostSettings.data.settings.edges[0].node;

  } catch (error) {
    console.log(error);
  }

  // Combining page data from different sources
  posts = [...dataSources.ghost.posts].sort(byDate);

  authors = [...dataSources.ghost.authors];

  tags = [...dataSources.ghost.tags];

  pages = [...dataSources.ghost.pages];

  apiURL = dataSources.ghost.settings.url;
  websiteTitle = dataSources.ghost.settings.title;

  // /**
  //  * There are three types of paginated lists.
  //  * All public posts, posts by a particular author and posts of a tag.
  //  */

  // Paginataed list of all public posts.
  log("Creating paginated list of all public posts @", basePath);
  const publicPosts = posts.filter((post) => !post.secret);
  createPaginatedPages({
    edges: publicPosts,
    createPage: createPage,
    pageTemplate: templates.posts,
    pageLength: pageLength,
    pathPrefix: basePath,
    buildPath: buildPaginatedPath,
  });

  // /**
  //  * Once the list of posts have bene created, we need to make individual post posts.
  //  * To do this, we need to find the corresponding authors since we allow for co-authors.
  //  */
  posts.forEach((post, index) => {
    //   /**
    //    * We need a way to find the next artiles to suggest at the bottom of the posts page.
    //    * To accomplish this there is some special logic surrounding what to show next.
    //    */
    let next = publicPosts.slice(index + 1, index + 3);
    // If it's the last item in the list, there will be no posts. So grab the first 2
    if (next.length === 0) next = publicPosts.slice(0, 2);
    // If there's 1 item in the list, grab the first post
    if (next.length === 1 && publicPosts.length !== 2)
      next = [...next, publicPosts[0]];
    if (publicPosts.length === 1) next = [];

    createPage({
      path: post.slug,
      component: templates.post,
      context: {
        post,
        // authors: authorsThatWroteThePost,
        basePath,
        permalink: `${apiURL}${post.slug}/`,
        slug: post.slug,
        id: post.id,
        title: post.title,
        canonicalUrl: post.canonical_url,
        next,
      },
    });
  });

  // Generation of Amp Pages

  posts.forEach((post) => {
    createPage({
      path: `${post.slug}/amp`,
      component: templates.ampPage,
      context: {
        slug: post.slug,
        title: websiteTitle,
        amp: true,
      },
    });
  });

  // Genration of pages

  pages.forEach((post, index) => {
    //   /**
    //    * We need a way to find the next artiles to suggest at the bottom of the posts page.
    //    * To accomplish this there is some special logic surrounding what to show next.
    //    */
    createPage({
      path: post.slug,
      component: templates.page,
      context: {
        post,
        basePath,
        permalink: `${apiURL}${post.slug}/`,
        slug: post.slug,
        id: post.id,
        title: post.title,
        canonicalUrl: post.canonical_url,
      },
    });
  });

  // Authors Pages builder

  const postsWithFlatAuthorNames = posts.map((post) => ({
    ...post,
    authors: [...post.authors.map((author) => author.slug)],
  }));

  authors.forEach((author) => {
    const postsTheAuthorHasWritten = postsWithFlatAuthorNames.filter(
      (post) => post.authors.includes(author.slug)
    );

    let modifiedAuthor = Object.keys(author).reduce(
      (acc, dec) => {
        if (dec === "twitter" && author[dec]) {
          return {
            ...acc,
            social: [
              ...acc.social,
              {
                name: "twitter",
                url: `https://twitter.com/${author[dec]}`,
              },
            ],
            [dec]: author[dec],
          };
        }
        if (dec === "facebook" && author[dec]) {
          return {
            ...acc,
            social: [
              ...acc.social,
              {
                name: "facebook",
                url: `https://facebook.com/${author[dec]}`,
              },
            ],
            [dec]: author[dec],
          };
        }
        return { ...acc, social: [...acc.social], [dec]: author[dec] };
      },
      { social: [] }
    );

    const path = slugify(author.slug, authorsPath);

    createPaginatedPages({
      edges: postsTheAuthorHasWritten,
      pathPrefix: "author/" + author.slug,
      createPage,
      pageLength,
      pageTemplate: templates.author,
      buildPath: buildPaginatedPath,
      context: {
        author: modifiedAuthor,
        originalPath: path,
        // originalPath: author.slug,
        skip: pageLength,
        limit: pageLength,
      },
    });
  });

  const postsWithFlatTagNames = posts.map((post) => ({
    ...post,
    flatTags: [...post.tags.map((tag) => tag.slug)],
  }));

  tags.forEach((tag) => {
    const postsWithTag = postsWithFlatTagNames.filter((post) =>
      post.flatTags.includes(tag.slug)
    );

    const path = slugify(tag.slug, "/tags");

    createPaginatedPages({
      edges: postsWithTag,
      pathPrefix: "tag/" + tag.slug,
      createPage,
      pageLength,
      pageTemplate: templates.tag,
      buildPath: buildPaginatedPath,
      context: {
        tag: tag,
        originalPath: path,
        // originalPath: author.slug,
        skip: pageLength,
        limit: pageLength,
      },
    });
  });
};
