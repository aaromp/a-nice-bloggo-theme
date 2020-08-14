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

  log(`Config basePath`, basePath);

  log(`Querying`, `data`);
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
  //  * Pages of public posts, pages of particular author posts and
  //  * pages of posts with a particular tag.
  //  */
  log(`Creating`, `post pages`);

  // Paginataed list of all public posts.
  log(`Creating`, `post pages @ ${basePath}`);
  const publicPosts = posts.filter((post) => !post.secret);
  createPaginatedPages({
    edges: publicPosts,
    createPage: createPage,
    pageTemplate: templates.posts,
    pageLength: pageLength,
    pathPrefix: basePath,
    buildPath: buildPaginatedPath,
  });

  // Paginataed lists of all posts by author.
  log(`Creating`, `author pages`);
  const flatAuthorNamePosts = posts.map((post) => ({
    ...post,
    authors: [...post.authors.map((author) => author.slug)],
  }));

  authors.forEach((author) => {
    const postsByAuthor = flatAuthorNamePosts.filter(
      (post) => post.authors.includes(author.slug)
    );

    let authorWithSocial = Object.keys(author).reduce(
      (accumulator, currentValue) => {
        let isSocialMediaValue =
          (currentValue === "twitter" || currentValue === "facebook");
        if (isSocialMediaValue && author[currentValue]) {
          return {
            ...accumulator,
            social: [
              ...accumulator.social,
              {
                name: `${currentValue}`,
                url: `https://${currentValue}.com/${author[currentValue]}`,
              },
            ],
            [currentValue]: author[currentValue],
          };
        }
        return {
          ...accumulator,
          social: [...accumulator.social],
          [currentValue]: author[currentValue]
        };
      },
      { social: [] }
    );

    const authorPath = "author/" + author.slug;
    log(`Creating pages @`, authorPath);

    createPaginatedPages({
      edges: postsByAuthor,
      createPage: createPage,
      pageTemplate: templates.author,
      pageLength: pageLength,
      pathPrefix: authorPath,
      buildPath: buildPaginatedPath,
      context: {
        author: authorWithSocial,
      },
    });
  });

  // Paginataed lists of all posts by author.
  log("Creating", "tag pages");
  const flatTagNamePosts = posts.map((post) => ({
    ...post,
    flatTags: [...post.tags.map((tag) => tag.slug)],
  }));

  tags.forEach((tag) => {
    const postsWithTag = flatTagNamePosts.filter((post) =>
      post.flatTags.includes(tag.slug)
    );

    const tagPath = "tag/" + tag.slug;
    log(`Creating pages @`, tagPath);

    createPaginatedPages({
      edges: postsWithTag,
      createPage: createPage,
      pageTemplate: templates.tag,
      pageLength: pageLength,
      pathPrefix: tagPath,
      buildPath: buildPaginatedPath,
      context: {
        tag: tag,
      },
    });
  });

  log(`Creating`, `standalone pages`);
  // /**
  //  * Once the list of posts have bene created, we need to make standalone post posts.
  //  * To do this, we need to find the corresponding authors since we allow for co-authors.
  //  */
  log(`Creating`, `posts`);
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

  // AMP pages
  log(`Creating`, `amp posts`);
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

  // Pages require special linking since they are not considered posts and are
  // not associated with an author or a tag.
  log(`Creating`, `pages`);
  pages.forEach((post, index) => {
    log(`Creating page @`, `${post.slug}`);
    //   /**
    //    * We need a way to find the next artiles to suggest at the bottom of the posts page.
    //    * To accomplish this there is some special logic surrounding what to show next.
    //    */
    createPage({
      path: post.slug,
      component: templates.page,
      context: {
        post: post,
        basePath: basePath,
        permalink: `${apiURL}${post.slug}/`,
        slug: post.slug,
        id: post.id,
        title: post.title,
        canonicalUrl: post.canonical_url,
      },
    });
  });

};
