import React, { Component } from 'react'
import { Modal, Container, Button, Row, Col, Tab, Tabs } from 'react-bootstrap'
import RegistroGuia from './RegistroGuia'
import RegistroUsuario from './RegistroUsuario'
import PropTypes from 'prop-types'

class ModalRegistro extends Component {
  // eslint-disable-next-line space-before-function-paren
  constructor() {
    super()
    this.state = {
      show: false
    }
  }

  // eslint-disable-next-line space-before-function-paren
  handleModal(param) {
    this.setState({
      show: param
    })
  }

  // eslint-disable-next-line space-before-function-paren
  render() {
    return (
      <div>
        <p id="btn-Info" onClick={() => { this.handleModal(true) }}>{this.props.text}</p>
        <Modal
          show={this.state.show}
          onHide={() => { this.handleModal(false) }}
          centered>
          <Container className='px-4 pt-3 pb-0'>
            <Row className='p-1 pb-0 m-0'>
              <Col xs={12} className='p-0 m-0 d-flex justify-content-end'>
                <Button className='btnClose btn text-center p-0' onClick={() => { this.handleModal(false) }}>Cerrar</Button>
              </Col>
            </Row>
          </Container>
          <Tabs defaultActiveKey="guia" id="tab">
            <Tab eventKey="guia" title="Guía">
              <RegistroGuia showModal={() => { this.handleModal(false) }} onUpdate={this.props.onUpdate} />
            </Tab>
            <Tab eventKey="usuario" title="Usuario">
              <RegistroUsuario showModal={() => { this.handleModal(false) }} show={this.state.show} />
            </Tab>
          </Tabs>
        </Modal>
      </div>)
  }
}

ModalRegistro.propTypes = {
  text: PropTypes.string.isRequired,
  onUpdate: PropTypes.func
}

export default ModalRegistro
