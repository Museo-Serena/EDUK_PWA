import React, { useState } from "react"
import { Carousel, Modal } from "react-bootstrap"
import { connect } from "react-redux"
import { useIdleTimer } from "react-idle-timer"
import vitrinaStyles from "./vitrina.module.scss"
import "./vitrina.css"
import BackgroundCarousel from "./backgroundcarousel"
import HandIcon from "../../assets/hand-icon.svg"
const VitrinaCarousel = ({
  vitrinas,
  showHelp,
  onSelect,
  toggleShowHelp,
  showControls,
  toggleShow,
  toggleShowGroup,
  toggleShowControls,
}) => {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }
  const handleOnIdle = event => {
    //console.log("user is idle", event)
    //console.log("last active", getLastActiveTime())
    toggleShowControls(true)
    toggleShow(false)
    toggleShowGroup(false)
    toggleShowHelp(true)
  }

  const handleOnActive = event => {
    //console.log("user is active", event)
    //console.log("time remaining", getRemainingTime())
  }

  const handleOnAction = e => {
    //console.log("user did something", e)
  }

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  })

  return (
    <Carousel
      defaultActiveIndex={onSelect}
      interval={null}
      controls={showControls}
      activeIndex={index}
      onSelect={handleSelect}
      wrap={false}
    >
      {vitrinas.map((vitrina, key) => {
        const vitrinaObj = { vitrina, key }
        return (
          <Carousel.Item key={key}>
            <BackgroundCarousel props={vitrinaObj} />
            <Carousel.Caption className={vitrinaStyles.Modal}>
              <Modal
                show={showHelp}
                onHide={() => toggleShowHelp(!showHelp)}
                dialogClassName={vitrinaStyles.modalHelpDialog}
              >
                <Modal.Header className={vitrinaStyles.Help} closeButton>
                  <Modal.Title className={vitrinaStyles.ModalTitle}>
                    <HandIcon className={vitrinaStyles.Icon} />
                    <span className={vitrinaStyles.HelpMessage}>
                      Recorre la vitrina y selecciona objetos
                    </span>
                  </Modal.Title>
                </Modal.Header>
              </Modal>
            </Carousel.Caption>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

const mapStateToProps = state => ({
  showHelp: state.app.showHelp,
  onSelect: state.app.onSelect,
  showControls: state.app.showControls,
})

const mapDispatchToProps = dispatch => ({
  toggleShowHelp(showHelp) {
    dispatch({
      type: "TOGGLE_SHOWHELP",
      showHelp,
    })
  },
  toggleShow(show) {
    dispatch({
      type: "TOGGLE_SHOW",
      show,
    })
  },
  toggleShowGroup(showGroup) {
    dispatch({
      type: "TOGGLE_SHOW_OBJECT",
      showGroup,
    })
  },
  toggleShowControls(showControls) {
    dispatch({
      type: "TOGGLE_SHOW_CONTROLS",
      showControls,
    })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(VitrinaCarousel)
