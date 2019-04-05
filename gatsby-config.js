require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /\.inline\.svg$/
        }
      }
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `icrowd`,
        accessToken: `${process.env.API_KEY}`,
        linkResolver: ({ node, key, value }) => doc => `/${doc.uid}`,
      },
    },
  ],
}