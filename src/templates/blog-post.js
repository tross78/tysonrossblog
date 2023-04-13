import React from "react"
import { graphql, Link } from "gatsby"
import Layout from '../components/layout'

export default function BlogPostTemplate({ data, pageContext }) {
  const { allPosts } = pageContext
  const post = data.markdownRemark;
  const { nextPost, prevPost } = pageContext;
  return (
    <Layout pageTitle={post.frontmatter.title}>
      <h1 class="mb-2">{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <div className="mt-4 flex justify-between">
        {prevPost && (
          <Link to={prevPost.fields.slug} className="btn-xs">
            &larr; {prevPost.frontmatter.title}
          </Link>
        )}
        {nextPost && (
          <Link to={nextPost.fields.slug} className="btn-xs">
            {nextPost.frontmatter.title} &rarr;
          </Link>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;