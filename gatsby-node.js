/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it 

const path = require('path')

//createPages-> create pages based on storaged content
module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const objectTemplate = path.resolve('./src/templates/object.js')
    const resObject = await graphql(`
      query {
          allNodeObject {
              edges {
                node {
                    drupal_internal__nid
                }
              }
          }
      }
    `)
  
    resObject.data.allNodeObject.edges.forEach((edge) => {
      createPage({
          component: objectTemplate,
          path: `/object/${edge.node.drupal_internal__nid}`,
          context: {
            drupal_internal__nid: edge.node.drupal_internal__nid
          }
      })
    })
  }