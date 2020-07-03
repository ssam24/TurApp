import React, { Component } from 'react'
import { Modal, Form, Col, Button, Row, Container } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default class ModalContactar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      REACT_APP_EMAILJS_USERID: 'user_VXJXCDYR0Lcj9leOxXISl',
      templateId: 'email_contactar',
      formSubmitted: false,
      feedback: 'Contacto guía de TurApp'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.sendFeedback = this.sendFeedback.bind(this)
  }

  sendFeedback (templateId, senderEmail, receiverEmail, feedback, name, nameRemitente, emailRemitente, mensaje) {
    window.emailjs.send('gmail', templateId, { senderEmail, receiverEmail, feedback, name, nameRemitente, emailRemitente, mensaje })
      .then(res => {
        console.log('MAIL SENT!')
        alert('Mensaje enviado, el guía lo contactara')
        this.setState({
          formEmailSent: true
        })
      })
      .catch(err => console.error('Failed to send feedback. Error: ', err))
  }

  handleSubmit (e) {
    e.preventDefault()
    this.sendFeedback(
      this.state.templateId,
      this.sender,
      this.props.email,
      this.state.feedback,
      this.props.name,
      this.props.nameRemitente,
      this.props.emailRemitente,
      this.props.mensaje
    )
    this.setState({
      formSubmitted: true
    })
    document.getElementById('formContact').reset()
    this.props.clear()
  }

  render () {
    const { showContact, mensaje } = this.props
    console.log('estas son las props')
    console.log(this.props)

    return (
      <div>
        <Button className='submit font-weight-bold mx-auto mb-2' type="submit" defaultValue="Contactar" onClick={this.props.handleModalContact}>Contactar</Button>
        <Modal
          show={showContact}
          onHide={this.props.handleModalContact}
          centered>
          <Container className='px-4 pt-3 pb-0'>
            <Row className='p-1 pb-0 m-0'>
              <Col xs={12} className='p-0 m-0 d-flex justify-content-end'>
                <Button className='btnClose btn text-center p-0' type="submit" onClick={this.props.handleModalContact}>Cerrar</Button>
              </Col>
            </Row>
          </Container>
          <Modal.Body className='px-4 pt-3 pb-0'>
            <Container>
              <Row>
                <Col className='px-0'><h4>Contactar guía</h4></Col>
              </Row>
              <Row>
                <Col className='px-0'><p>A continuación podrás escribir el mensaje para el guía, puedes ingresar tu información de contacto para que el guía se comuniqué contigo</p></Col>
              </Row>
            </Container>
            <Form id='formContact'>
              <Form.Group controlId="descriptionContacto" >
                <Form.Label>Mensaje</Form.Label>
                <Form.Control name='mensaje' defaultValue={mensaje} onChange={this.props.onChange} className='inputs' as='textarea' rows="8" placeholder="¡Hola! estoy interesado en contratar tus servicios estos son mis datos de contacto..." />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Container className='px-4 pb-3'>
            <Row className='m-0 d-flex justify-content-center text-center'>
              <Col><Button className='submit font-weight-bold' type="submit" onClick={this.handleSubmit}>ENVIAR</Button></Col>
              <Col><Button className='submit font-weight-bold' type="submit" onClick={this.props.handleModalContact}>CANCELAR</Button></Col>
            </Row>
          </Container>
        </Modal>
      </div>
    )
  }
}

ModalContactar.propTypes = {
  mensaje: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  email: PropTypes.string,
  nameRemitente: PropTypes.string,
  emailRemitente: PropTypes.string,
  showContact: PropTypes.bool,
  handleModalContact: PropTypes.func,
  clear: PropTypes.func
}
