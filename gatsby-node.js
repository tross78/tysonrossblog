// gatsby-node.js
const path = require("path");
const fsExtra = require('fs-extra');
const { createFilePath } = require("gatsby-source-filesystem");
const slugify = require("slugify");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
  {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach(({ node }, index) => {
    const nextPost = index === 0 ? null : posts[index - 1].node;
    const prevPost = index === posts.length - 1 ? null : posts[index + 1].node;
  
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/blog-post.js"),
      context: {
        slug: node.fields.slug,
        nextPost,
        prevPost,
      },
    });
  });
};


exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const title = node.frontmatter.title;
    const slug = slugify(title, {
      lower: true,
      strict: true,
    });
    createNodeField({
      node,
      name: "slug",
      value: `/${slug}`,
    });
  }
  const sourceNorm = path.normalize(`${__dirname}/src/images`);
  const destination = `/images`;

  if (node.internal.type === 'File') {
    const dir = path.normalize(node.dir);

    if (dir.includes(sourceNorm)) {
      const relativeToDestination = dir.replace(sourceNorm, '');
      const newPath = path.join(
        process.cwd(),
        'public',
        destination,
        relativeToDestination,
        node.base
      );

      fsExtra.copy(node.absolutePath, newPath, err => {
        if (err) {
          console.log('Error copying file: ', err)
        }
      })
    }
  }
}
