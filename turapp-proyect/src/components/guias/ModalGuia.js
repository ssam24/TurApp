import React, { Component } from 'react'
import { Modal, Card, Row, Col, Button, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import ModalContactar from '../ModalContactar'

class ModalGuia extends Component {
  constructor () {
    super()
    this.state = {
      show: false,
      nameRemitente: '',
      emailRemitente: '',
      mensaje: '',
      showBtn: false,
      showContact: false
    }
    this.onChange = this.onChange.bind(this)
    this.clear = this.clear.bind(this)
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleModal () {
    this.setState({
      show: !this.state.show
    })
    if (localStorage.getItem('datosSesion') !== null) {
      this.setState({
        showBtn: true
      })
      const state = JSON.parse(localStorage.getItem('datosSesion'))
      console.log(state)
      if (state.tipo === 'usuario') {
        this.setState({
          nameRemitente: state.datos.usuario.nameU,
          emailRemitente: state.datos.usuario.emailU
        })
      } else if (state.tipo === 'guia') {
        this.setState({
          nameRemitente: state.datos.guia.nameG,
          emailRemitente: state.datos.guia.emailG
        })
      }
      console.log(state.tipo)
      console.log('Estoy adentro')
    } else {
      this.setState({
        showBtn: false,
        nameRemitente: '',
        emailRemitente: ''
      })
    }
  }

  handleModalContact () {
    this.setState({
      showContact: !this.state.showContact
    })
    if (this.state.showContact === false) {
      this.setState({
        mensaje: ''
      })
      console.log('El mensaje es vacio')
    }
  }

  clear () {
    this.setState({
      mensaje: '',
      showContact: false
    })
  }

  render () {
    const { name, email, place, src, description } = this.props
    const { showBtn, show, nameRemitente, emailRemitente, mensaje, showContact } = this.state
    return (
      <div className="m-auto">
        <FontAwesomeIcon className='registro2' size="lg" icon={faPlus} onClick={() => { this.handleModal() }}></FontAwesomeIcon>
        <Modal
          show={show}
          onHide={() => { this.handleModal() }}
          centered>
          <Card className='rounded-lg'>
            <Row className= 'p-0 m-0'>
              <Col xs={12} className= 'btnCloseImge p-0 m-0 d-flex justify-content-end'>
                <Button className='btnCloseModalGuia btn text-center p-0' onClick={() => { this.handleModal() }}>Cerrar</Button>
              </Col>
            </Row>
            <Card.Img className="p-0" variant="top" src={src} />
            <Card.Body className="pt-1">
              <Card.Title className="mb-0 d-flex justify-content-center">{name}</Card.Title>
              <Card.Text className="mb-0 d-flex justify-content-center">{place}</Card.Text>
              <hr id='hr' className= 'mt-1 mb-0'></hr>
              <Card.Text className="mb-0 mt-2 d-flex justify-content-center">{description}</Card.Text>
            </Card.Body>
            {showBtn === true ? <Container><Row><Col className='text-center mb-2'><ModalContactar showContact={showContact} handleModalContact={ () => { this.handleModalContact() }} name={name} email={email} nameRemitente={nameRemitente} emailRemitente={emailRemitente} mensaje={mensaje} onChange={this.onChange} clear={this.clear} /></Col></Row></Container> : null }
          </Card>
        </Modal>
      </div>)
  }
}

ModalGuia.propTypes = {
  name: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default ModalGuia
