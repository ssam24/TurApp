import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Col, Button, Row, Container, Alert } from 'react-bootstrap'
import Logo from './../imagesPage/Logo_TurApp.png'
import PropTypes from 'prop-types'
import ModalRegistro from './ModalRegistro'
import ModalContraseña from './ModalContraseña'

class ModalInicioSesion extends Component {
  // eslint-disable-next-line space-before-function-paren
  render() {
    return (
      <div>
        <p id="btn-Info" onClick={this.props.handleModal}>{this.props.text}</p>
        <Modal
          show={this.props.show}
          onHide={this.props.handleModal}
          centered>
          <Container className='px-4 pt-3 pb-0'>
            <Row className='p-1 pb-0 m-0'>
              <Col xs={12} className='p-0 m-0 d-flex justify-content-end'>
                <Button className='btnClose btn text-center p-0' type="submit" onClick={this.props.handleModal}>Cerrar</Button>
              </Col>
            </Row>
          </Container>
          <Modal.Body className='px-4 pb-2 pt-0'>
            <Col className='d-flex justify-content-center'>
              <img src={Logo} className="logo" alt="logo"></img>
            </Col >
            <Row className='m-0'>
              <hr id='hr' className='mt-1 mb-0'></hr>
            </Row>
            <Form id='form'>
              <Form.Group controlId="emailUsuario">
                <Form.Control name='email' className='inputs font-weight-bold mt-4' type="email" onChange={this.props.handleChange} defaultValue={this.props.email} placeholder="E-mail" />
              </Form.Group>
              <Form.Group controlId="passwordUsuario">
                <Form.Control name='password' className='inputs font-weight-bold' type="password" onChange={this.props.handleChange} defaultValue={this.props.password} placeholder="Contraseña" />
              </Form.Group>
            </Form>
            {this.props.showAlert ? <Container className= 'p-0'>
              <Alert variant="danger" onClose={this.props.handleClose} dismissible>
                <p className= 'm-0'>Correo o clave inválida</p>
              </Alert>
            </Container> : null}
          </Modal.Body>
          <Container className='px-4 pt-0 pb-4'>
            <Row className='m-0 d-flex justify-content-center'>
              <Button className='submit font-weight-bold' type="submit" onClick={this.props.handleClick}>INICIA SESIÓN</Button>
            </Row>
          </Container>
          <Container className='px-4 pt-0 pb-4'>
            <Row>
              <Col className='text-center'><div className="text-dark font-weight-bold mx-auto registro" ><ModalRegistro text="Registrate"/></div></Col>
              <Col className='text-center'><div className='text-dark font-weight-bold mx-auto registro'>
                <ModalContraseña text="¿Olvidó su contraseña?"/></div></Col>
            </Row>
          </Container>
        </Modal>
      </div>
    )
  }
}

ModalInicioSesion.propTypes = {
  text: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
  password: PropTypes.string,
  email: PropTypes.string,
  handleClose: PropTypes.func,
  showAlert: PropTypes.bool,
  handleModal: PropTypes.func,
  show: PropTypes.bool
}

export default ModalInicioSesion
