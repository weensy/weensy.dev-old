import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Utterances from "utterances-react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tags from "../components/tags"

import "../styles/style.css"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = this.props.data.site.siteMetadata.description
    const { previous, next } = this.props.pageContext

    return (
      <Layout title={siteTitle} description={siteDescription}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <hr className="contour"/>
        <article>
          <header className="post-header">
            <h1>
              {post.frontmatter.title}
            </h1>
            <p>
              {post.frontmatter.date}
            </p>
            <p style={{
              padding: "0rem 2.5rem",
              fontSize: "1em",
              fontWeight: "100",
              // textAlign: "left"
              fontStyle: "italic"
            }}>
              {post.frontmatter.description}
            </p>
            {post.frontmatter.thumbnail && <Img
              fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
              alt={post.frontmatter.title}
            />}
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <Tags tags={post.frontmatter.tags}/>
        </article>
        <hr className="contour"/>
        <Utterances
          repo="weensy/weensy.dev"
          issueTerm="og:title"
          label=""
          theme="github-dark"
          crossorigin="anonymous"
          async={false}
          style={``}
        />  
        <nav>
          <ul className="post-nav">
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  <svg className="svg-rotate" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xmlSpace="preserve">
                    <g><path d="M767.9,499.9L291.6,10l-59.4,61.3l416.6,428.7L232.1,928.7l59.5,61.3L767.9,499.9z"/></g>
                  </svg>
                  <span className="post-nav-prev">{previous.frontmatter.title}</span>
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  <span className="post-nav-next">{next.frontmatter.title}</span>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xmlSpace="preserve">
                    <g><path d="M767.9,499.9L291.6,10l-59.4,61.3l416.6,428.7L232.1,928.7l59.5,61.3L767.9,499.9z"/></g>
                  </svg>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        tags
        description
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1440) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
