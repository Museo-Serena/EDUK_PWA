import React from "react"
import Layout from "../components/layout"
import { connect } from "react-redux"
import { useStaticQuery, graphql } from "gatsby"
import ObjectComponent from "../components/object/object"
import VitrinaCarousel from "../components/vitrina/vitrinacarousel"

const Vitrina = ({ object }) => {
  const query = useStaticQuery(
    graphql`
      query($drupal_internal__nid: Int) {
        nodeVitrina(drupal_internal__nid: { eq: $drupal_internal__nid }) {
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
                  field_coords
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
    `
  )

  const vitrinas = query.nodeVitrina.relationships.node__imagenes_vitrina
    ? query.nodeVitrina.relationships.node__imagenes_vitrina
    : []

  return (
    <Layout key={Math.round(Math.random())}>
      <VitrinaCarousel vitrinas={vitrinas} />
      <ObjectComponent object={object} />
    </Layout>
  )
}

const mapStateToProps = state => ({
  object: state.app.obj,
})

export default connect(mapStateToProps, null)(Vitrina)
