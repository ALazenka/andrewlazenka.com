import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { isAfter, isBefore } from 'date-fns'
import { Helmet } from 'react-helmet'

import Footer from '../components/Footer'
import Header from '../components/Header'
import HeroBanner from '../components/HeroBanner'
import { ExternalLink, InternalLink } from '../components/Links'
import Theme from '../components/Theme'
import WorkExperience from '../components/WorkExperience'

const MAX_WORK_EXP = 3

function sortFilterWork(ex1, ex2) {
  const date1 = new Date(ex1.frontmatter.startYear, ex1.frontmatter.startMonth)
  const date2 = new Date(ex2.frontmatter.startYear, ex2.frontmatter.startMonth)
  if (isBefore(date1, date2)) {
    return 1
  }
  if (isAfter(date1, date2)) {
    return -1
  }
  return 0
}

export default function Home({ data }) {
  return (
    <Theme>
      <Helmet title="Andrew Lazenka" />
      <div className="relative w-full pt-24">
        <HeroBanner />
        <Header />
        <div className="flex justify-between w-3/4 max-w-screen-md mx-auto my-0 flex-col lg:flex-row items-center">
          <div className="flex flex-col text-xl justify-center py-8 lg:py-0 lg:max-w-md max-w-lg text-center">
            <span className="z-0">
              Hi, I'm <b>Andrew</b>! I love full-stack development, architecting
              robust devops solutions, collaborating, problem solving, and most
              of all ☕️
            </span>
          </div>
          <Img
            style={{ height: 400, width: 275 }}
            fluid={data.andrewHeadshot.childImageSharp.fluid}
            alt="Andrew Headshot"
          />
        </div>
      </div>
      <main className="mx-auto my-0 py-12 px-6 max-w-3xl w-3/4">
        <section>
          <h3 id="about">About</h3>
          Since 2018 I've been working at{' '}
          <ExternalLink to="https://www.innovasium.com">
            Innovasium Digital
          </ExternalLink>{' '}
          as a development team lead, doing full-stack web development and
          architecting modern dev ops solutions.{' '}
          <InternalLink to="/work-experience/innovasium-2018">
            Find out more about that here
          </InternalLink>
          .
          <br />
          <br />
          I completed my undergraduate studies at Queen's University and
          received my Bachelor in Computer Science with a specialization in
          Software Design.
          <br />
          <br />I have a passion for learning new technologies and incorporating
          them into my work. Right now I am exploring highly performant,
          resilient and scalable backend solutions using{' '}
          <ExternalLink to="https://elixir-lang.org/">
            Elixir
          </ExternalLink>,{' '}
          <ExternalLink to="https://golang.org/">Go</ExternalLink>, and{' '}
          <ExternalLink to="https://rubyonrails.org/">
            Ruby on Rails
          </ExternalLink>
          . For frontend development projects I've been mainly using{' '}
          <ExternalLink to="https://www.gatsbyjs.org">GatsbyJS</ExternalLink>{' '}
          and{' '}
          <ExternalLink to="https://www.styled-components.com/">
            Styled Components
          </ExternalLink>{' '}
          since I came across them, and they were used to build this site!
          <br />
          <br />
          In my spare time, I enjoy writing and contributing open source
          software which you can find{' '}
          <ExternalLink to="https://github.com/ALazenka">
            on my GitHub
          </ExternalLink>
          . Writing, producing and performing music is also a big passion of
          mine. My band{' '}
          <ExternalLink to="https://prettyyoungthangband.com">
            Pretty Young Thang
          </ExternalLink>{' '}
          has been releasing new music on a regular basis, check us out!
        </section>
        <section className="mt-8">
          <h3 id="work-and-experience">Work & Experience</h3>
          {Array.from(data.workExperiences.nodes)
            .sort(sortFilterWork)
            .splice(0, MAX_WORK_EXP)
            .map(workExperience => {
              const {
                company,
                position,
                startMonth,
                startYear,
              } = workExperience.frontmatter
              return (
                <WorkExperience
                  key={`${company} - ${position} - ${startMonth} ${startYear}`}
                  {...workExperience}
                />
              )
            })}
          <InternalLink to="/work-experience">See all</InternalLink>
        </section>
      </main>
      <Footer />
    </Theme>
  )
}

export const pageQuery = graphql`
  query {
    workExperiences: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { glob: "**/src/pages/work-experience/**/*.md" }
      }
    ) {
      nodes {
        frontmatter {
          company
          endMonth
          endYear
          position
          startMonth
          startYear
        }
        fileAbsolutePath
      }
    }
    andrewHeadshot: file(
      relativePath: { glob: "**/png/AndrewHeadshotProfessional.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`
