import React, { Component } from 'react'
import { Form, Col, Button, Row, Container, Modal, Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class ModalContraseña extends Component {
  constructor () {
    super()
    this.state = {
      urlG: 'https://apifake-turapp.herokuapp.com/guias',
      urlU: 'https://apifake-turapp.herokuapp.com/usuarios',
      infoG: [],
      infoU: [],
      show: false,
      email: '',
      password: '',
      alert: false,
      showAlert: false,
      REACT_APP_EMAILJS_USERID: 'user_VXJXCDYR0Lcj9leOxXISl',
      templateId: 'template_TzsHd39U',
      formSubmitted: false,
      feedback: 'Recuperación de contraseña de TurApp'
    }
    console.log(this.state)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSend = this.handleSend.bind(this)
    this.sendFeedback = this.sendFeedback.bind(this)
  }

  componentDidMount () {
    this.handleUpdate()
  }

  sendFeedback (templateId, senderEmail, receiverEmail, feedback, password, name) {
    window.emailjs.send('gmail', templateId, { senderEmail, receiverEmail, feedback, password, name })
      .then(res => {
        console.log('MAIL SENT!')
        alert('Mensaje enviado, revisa tu correo en la bandeja de entrada o spam')
        this.setState({
          formEmailSent: true
        })
      })
    // Handle errors if the mail didnt passed
      .catch(err => console.error('Failed to send feedback. Error: ', err))
  }

  handleModal () {
    this.setState({
      show: !this.state.show
    })
    if (this.state.show === false) {
      this.setState({
        email: '',
        password: '',
        alert: false,
        showAlert: false

      })
    }
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async handleUpdate () {
    try {
      const res = await axios.get(this.state.urlG)
      if (Array.isArray(res.data)) {
        this.setState({ infoG: res.data })
      } else {
        this.setState({ infoG: [res.data] })
      }
    } catch (error) {
      console.log(error)
    }
    try {
      const res = await axios.get(this.state.urlU)
      if (Array.isArray(res.data)) {
        this.setState({ infoU: res.data })
      } else {
        this.setState({ infoU: [res.data] })
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleSend (event) {
    event.preventDefault()
    const emailSearch = this.state.email

    const guiasFilter = this.state.infoG.filter((guia) => {
      return guia.guia.emailG.toLowerCase() === emailSearch.toLowerCase().trim()
    })
    const usuariosFilter = this.state.infoU.filter((usuario) => {
      return usuario.usuario.emailU.toLowerCase() === emailSearch.toLowerCase().trim()
    })
    console.log('=====')
    console.log(guiasFilter)
    console.log(usuariosFilter)

    if (guiasFilter.length !== 0) {
      console.log('hola')
      this.sendFeedback(
        this.state.templateId,
        this.sender,
        guiasFilter[0].guia.emailG,
        this.state.feedback,
        guiasFilter[0].guia.passwordG,
        guiasFilter[0].guia.nameG
      )
      this.setState({
        formSubmitted: true,
        showAlert: false
      })
      document.getElementById('form').reset()
      this.handleModal()
    } else if (usuariosFilter.length !== 0) {
      console.log('hola')
      this.sendFeedback(
        this.state.templateId,
        this.sender,
        usuariosFilter[0].usuario.emailU,
        this.state.feedback,
        usuariosFilter[0].usuario.passwordU,
        usuariosFilter[0].usuario.nameU
      )
      this.setState({
        formSubmitted: true,
        showAlert: false
      })
      document.getElementById('form').reset()
      this.handleModal()
    } else {
      this.setState({
        showAlert: true
      })
    }
  }

  render () {
    return (
      <div>
        <p id="btn-Info" onClick={() => { this.handleModal() }}>{this.props.text}</p>
        <Modal
          show={this.state.show}
          onHide={() => { this.handleModal() }}
          centered>
          <Container className='px-4 pt-3 pb-0'>
            <Row className='p-1 pb-0 m-0'>
              <Col xs={12} className='p-0 m-0 d-flex justify-content-end'>
                <Button className='btnClose btn text-center p-0' type="submit" onClick={() => { this.handleModal() }}>Cerrar</Button>
              </Col>
            </Row>
          </Container>
          <Modal.Body className='px-4 pb-2 pt-0'>
            <Container>
              <Row>
                <Col>
                  <h4>¿Olvidó su contraseña?</h4></Col>
              </Row>
              <Row>
                <Col>
                  <p>Indica tu correo electrónico a continuación</p></Col>
              </Row>
            </Container>
            <Form id='form'>
              <Form.Group controlId="emailUsuario">
                <Form.Control name='email' className='inputs font-weight-bold mt-2' type="email" onChange={this.handleChange} defaultValue={this.state.email} placeholder="E-mail" />
              </Form.Group>
            </Form>
            {this.state.showAlert ? <Container className= 'p-0'>
              <Alert variant="danger" onClose={() => this.setState({ showAlert: false })} dismissible>
                <p className= 'm-0'>Este correo no existe</p>
              </Alert>
            </Container> : null}
          </Modal.Body>
          <Container className='px-4 pt-0 pb-4'>
            <Row className='m-0 d-flex justify-content-center'>
              <Button className='mx-auto submit font-weight-bold' type="submit" onClick={this.handleSend}>ENVIAR</Button>
              <Button className='mx-auto submit font-weight-bold' type="submit" onClick={() => { this.handleModal() }}>CANCELAR</Button>
            </Row>
          </Container>
        </Modal>
      </div>
    )
  }
}
ModalContraseña.propTypes = {
  text: PropTypes.string.isRequired
}
