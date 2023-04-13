import React from "react"
import { graphql, Link } from "gatsby"
import Layout from '../components/layout'

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout pageTitle="Home">
      <ol class="flex flex-col items-center ml-2 mt-3 space-y-4">
        {posts.map(({ node }) => (
            <li class="card w-96 shadow-xl" key={node.id}>
              <Link to={node.fields.slug}>
              <div class="card-body">
                <h2 class="card-title">{node.frontmatter.title}</h2>
                <p>{node.excerpt}</p>
                <button class="btn btn-neutral">Read More</button>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </Layout>
  )
}

export const Head = () => <title>Home</title>

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
          fields {
            slug
          },
          excerpt(pruneLength: 250)
        }
      }
    }
  }
`;