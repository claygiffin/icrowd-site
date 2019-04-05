const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const servicePages = await graphql(`
    {
      allPrismicServicePage {
        edges {
          node {
            id
            uid
          }
        }
      }
    }
  `)

  servicePages.data.allPrismicServicePage.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: path.resolve("src/templates/service-page.js"),
      context: {
        uid: edge.node.uid,
      },
    })
  })

}
