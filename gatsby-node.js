import React from "react"
import { graphql, Link } from "gatsby"

export default function IndexPage({ data }) {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(({ node: post }) => (
          <li key={post.id}>
            <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`