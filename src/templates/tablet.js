import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { connect } from "react-redux"
import ObjectComponent from "../components/object/object"
import ObjectGroup from "../components/object/objectgroup"
import VitrinaCarousel from "../components/vitrina/vitrinacarousel"
import SEO from "../components/seo"

const Tablet = props => {
  const query = props.data
  const object = props.object
  const group = props.group

  const vitrinas = query.nodeTablet.relationships.node__imagenes_vitrina
    ? query.nodeTablet.relationships.node__imagenes_vitrina
    : []

  return (
    <Layout>
      <SEO title="Tablet" />
      <VitrinaCarousel vitrinas={vitrinas} />
      <ObjectComponent object={object} />
      <ObjectGroup group={group} />
    </Layout>
  )
}

const mapStateToProps = state => ({
  object: state.app.obj,
  group: state.app.group,
})

export default connect(mapStateToProps, null)(Tablet)
export const query = graphql`
  query($drupal_internal__nid: Int) {
    nodeTablet(drupal_internal__nid: { eq: $drupal_internal__nid }) {
      drupal_internal__nid
      title
      relationships {
        node__imagenes_vitrina {
          title
          relationships {
            field_imagen_vitrina {
              localFile {
                publicURL
              }
            }
            node__grupo {
              field_coords
              relationships {
                node__objeto {
                  drupal_internal__nid
                  title
                  body {
                    value
                  }
                  field_material
                  field_codigo
                  field_sitio_arqueologico
                  field_comuna
                  field_provincia
                  relationships {
                    field_video {
                      localFile {
                        publicURL
                      }
                    }
                    field_3d {
                      localFile {
                        publicURL
                      }
                    }
                    field_imagen {
                      localFile {
                        publicURL
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
