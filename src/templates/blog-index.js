import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"

import "../styles/style.css"

class BlogIndexTemplate extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const posts = data.allMarkdownRemark.edges
    const postPerPage = 5
    const currentPage = this.props.pageContext.index / postPerPage + 1
    const lastPage = parseInt((this.props.pageContext.postCount - 1) /postPerPage + 1)
    const prevPage = currentPage - 1
    const nextPage = currentPage + 1
        
    return (
      <Layout title={siteTitle} description={siteDescription}>
        <SEO title="Posts" />
        <div className="blog-nav">
          <div className="blog-nav-activated">Posts</div>
          <Link to={`/tags`}>
            <div className="blog-nav-deactivated">Tags</div>
          </Link>
          <Link to={`/series`}>
            <div className="blog-nav-deactivated">Series</div>
          </Link>
        </div>
        {posts.map(({ node }) => {
          return (
            <PostCard
              key={node.fields.slug}
              node={node}
              postClass={`post`}
            />
          )
        })}
        {lastPage === 1 || 
        <div className="pagenator">
          {currentPage === 1
            ? <div className="pagenator-unlinked">
                <svg className="svg-rotate" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xmlSpace="preserve">
                  <g><path d="M767.9,499.9L291.6,10l-59.4,61.3l416.6,428.7L232.1,928.7l59.5,61.3L767.9,499.9z"/></g>
                </svg> 
              </div>
            : <Link className="pagenator-link" to={prevPage === 1 ?`/posts` :`/posts/` + prevPage}>
                <svg className="svg-rotate" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xmlSpace="preserve">
                  <g><path d="M767.9,499.9L291.6,10l-59.4,61.3l416.6,428.7L232.1,928.7l59.5,61.3L767.9,499.9z"/></g>
                </svg> 
              </Link>}
          <div>Page {currentPage}</div>
          {currentPage === lastPage
            ? <div className="pagenator-unlinked">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xmlSpace="preserve">
                  <g><path d="M767.9,499.9L291.6,10l-59.4,61.3l416.6,428.7L232.1,928.7l59.5,61.3L767.9,499.9z"/></g>
                </svg>
              </div>
            : <Link className="pagenator-link" to={`/posts/` + nextPage}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xmlSpace="preserve">
                  <g><path d="M767.9,499.9L291.6,10l-59.4,61.3l416.6,428.7L232.1,928.7l59.5,61.3L767.9,499.9z"/></g>
                </svg>
              </Link>}
        </div>}
      </Layout>
    )
  }
}

export default BlogIndexTemplate

export const pageQuery = graphql`
  query BlogIndexByIndex($index: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {idx: {ne: null}}}
      sort: {fields: frontmatter___date, order: DESC}
      limit: 5, skip: $index
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            tags
            description
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1344, maxHeight: 400, cropFocus: CENTER) {
                  src
                  originalName
                }
              }
            }
          }
        }
      }
    }
  }
`
