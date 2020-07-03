import React, { Component } from 'react'
import { Container, Form, Row, Col, Spinner, Button, Alert, Modal } from 'react-bootstrap'
import axios from 'axios'
import PropTypes from 'prop-types'
import request from 'superagent'
const CLOUDINARY_UPLOAD_PRESET = 'turApp'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dnmmsm7iv/upload'
var upload
class ModalActualizarDatos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nameG: '',
      documentG: '',
      emailG: '',
      passwordG: '',
      placeG: '',
      birthdayG: '',
      descriptionG: '',
      termsG: true,
      photoG: '',
      loading: '',
      error: '',
      errors: {},
      show: false,
      urlG: 'http://localhost:3004/guias',
      urlU: 'http://localhost:3004/usuarios',
      infoG: [],
      infoU: [],
      tipo: '',
      id: '',
      showAlert: false
    }
    this.onChange = this.onChange.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount () {
    const state = JSON.parse(localStorage.getItem('datosSesion'))
    if (state.tipo === 'guia') {
      this.setState({
        nameG: state.datos.guia.nameG,
        documentG: state.datos.guia.documentG,
        emailG: state.datos.guia.emailG,
        passwordG: state.datos.guia.passwordG,
        placeG: state.datos.guia.placeG,
        birthdayG: state.datos.guia.birthdayG,
        descriptionG: state.datos.guia.descriptionG,
        termsG: state.datos.guia.termsG,
        photoG: state.datos.guia.photoG,
        tipo: state.tipo,
        id: state.datos.id,
        loading: false
      })
    }
  }

  onChange (e) {
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

  handleImageUpload (e) {
    this.setState({
      loading: '',
      error: ''
    })
    const file = e.target.files[0]
    if (file !== undefined) {
      upload = request.post(CLOUDINARY_UPLOAD_URL).field('upload_preset', CLOUDINARY_UPLOAD_PRESET).field('file', file)
      this.setState({
        loading: true
      })
      upload.end((err, response) => {
        if (err) {
          this.setState({
            error: err
          })
        }
        if (response.body.secure_url !== '') {
          this.setState({
            photoG: response.body.secure_url,
            loading: false
          })
        }
      })
    } else {
      this.setState({
        photoG: ''
      })
    }
  }

  validate (value) {
    const errors = {}
    const emailGFilter = this.state.infoG.filter((guia) => {
      return guia.guia.emailG.toLowerCase() === value.emailG.toLowerCase()
    })
    const emailUFilter = this.state.infoU.filter((usuario) => {
      return usuario.usuario.emailU.toLowerCase() === value.emailG.toLowerCase()
    })

    if (!value.nameG) {
      document.querySelector('.nameG').classList.add('error')
      errors.nameG = 'Campo obligatorio'
    } else { document.querySelector('.nameG').classList.remove('error') }
    if (!/^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(value.emailG)) {
      document.querySelector('.emailG').classList.add('error')
      errors.emailG = 'Campo obligatorio (Correo no válido)'
    } else if (emailGFilter.length !== 0 || emailUFilter.length !== 0) {
      document.querySelector('.emailG').classList.add('error')
      errors.emailG = 'El E-mail ya está registrado'
    } else { document.querySelector('.emailG').classList.remove('error') }
    if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8}$/.test(value.passwordG)) {
      document.querySelector('.passwordG').classList.add('error')
      errors.passwordG = 'Campo obligatorio (Debe tener 8 caracteres, una minuscula, una mayuscula y un número)'
    } else { document.querySelector('.passwordG').classList.remove('error') }
    if (!value.placeG) {
      document.querySelector('.placeG').classList.add('error')
      errors.placeG = 'Campo obligatorio'
    } else { document.querySelector('.placeG').classList.remove('error') }
    if (!value.photoG) {
      errors.photoG = 'Campo obligatorio'
    }
    if (!value.descriptionG) {
      document.querySelector('.descriptionG').classList.add('error')
      errors.descriptionG = 'Campo obligatorio'
    } else { document.querySelector('.descriptionG').classList.remove('error') }
    return errors
  }

  onSubmit (e) {
    e.preventDefault()
    const { errors, loading, error, show, variant, respuesta, infoG, infoU, urlG, urlU, id, tipo, ...noErrors } = this.state
    const result = this.validate(noErrors)
    this.setState({
      errors: result
    })
    console.log(noErrors)
    if (!Object.keys(result).length) {
      const guia = noErrors
      this.axiosCancelSource = axios.CancelToken.source()
      axios.put(`http://localhost:3004/guias/${this.state.id}`, { guia }, { cancelToken: this.axiosCancelSource.token })
        .then(res => {
          console.log(res)
          this.setState({
            showAlert: true
          })
        }).catch(error => {
          console.log(error)
        })
    }
  }

  onClick () {
    this.setState({
      showAlert: false
    })
    this.props.handleLogOut()
  }

  handleModal () {
    this.setState({
      show: !this.state.show
    })
  }

  componentWillUnmount () {
    if (upload !== undefined) {
      upload.abort()
    }
    if (this.axiosCancelSource !== undefined) {
      this.axiosCancelSource.cancel('Componente desmontado.')
    }
  }

  render () {
    const { showAlert, nameG, documentG, emailG, passwordG, placeG, birthdayG, descriptionG, photoG, error, loading, show, errors } = this.state
    return (
      <div>
        <p id="btn-Info" className='registro2' onClick={() => { this.handleModal() }}>{this.props.text}</p>
        <Modal
          show={show}
          onHide={() => { this.handleModal() }}
          centered>
          <Container className='px-4 pt-3 pb-0'>
            <Row className='p-1 pb-0 m-0'>
              <Col xs={12} className='p-0 m-0 d-flex justify-content-end'>
                <Button className='btnClose btn text-center p-0' onClick={() => { this.handleModal() }}>Cerrar</Button>
              </Col>
            </Row>
          </Container>
          <Container className= 'px-4 pt-3 pb-0' id="modalBodyGuia">
            <Row className= 'p-1 pb-0 m-0'>
              <Col xs={12} className= 'p-0 text-center font-weight-bold'>ACTUALIZA TUS DATOS</Col>
            </Row>
            <Row className= 'm-0'>
              <hr id='hr' className= 'mt-1 mb-0'></hr>
            </Row>
          </Container>
          <Modal.Body className= 'px-4 pt-3 pb-0'>
            <Form id='formGuia'>
              <Form.Group controlId="nameGuia">
                <Form.Label >Nombre Completo</Form.Label>
                <Form.Control name='nameG' defaultValue={nameG} onChange={this.onChange} className='inputs nameG' type="text" placeholder="Manuel Turizo" />
                {errors.nameG && <p style={{ color: 'red' }}>{errors.nameG}</p>}
              </Form.Group>
              <Form.Group controlId="documentGuia">
                <Form.Label>Documento</Form.Label>
                <Form.Control name='documentG' defaultValue={documentG} onChange={this.onChange} className='inputs documentG' type="number" placeholder="1047036099" disabled/>
              </Form.Group>
              <Form.Group controlId="emailGuia">
                <Form.Label>E-mail</Form.Label>
                <Form.Control name='emailG' defaultValue={emailG} onChange={this.onChange} className='inputs  emailG' type="email" placeholder="Maturizo@gmail.com" />
                {errors.emailG && <p style={{ color: 'red' }}>{errors.emailG}</p>}
              </Form.Group>
              <Form.Group controlId="passwordGuia">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control name='passwordG' defaultValue={passwordG} onChange={this.onChange} className='inputs  passwordG' type="password" placeholder="Matu1047" />
                {errors.passwordG && <p style={{ color: 'red' }}>{errors.passwordG}</p>}
              </Form.Group>
              <Form.Group controlId="placeGuia">
                <Form.Label>Lugar de Servicio</Form.Label>
                <Form.Control name='placeG' defaultValue={placeG} onChange={this.onChange} className='inputs placeG' type="text" placeholder="Amaga" />
                {errors.placeG && <p style={{ color: 'red' }}>{errors.placeG}</p>}
              </Form.Group>
              <Form.Group controlId="birthdayGuia">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control name='birthdayG' defaultValue={birthdayG} onChange={this.onChange} className='inputs birthdayG' type="date" disabled/>
              </Form.Group>
              <Form.Group controlId="photoGuia">
                <Form.File name='file' onChange={this.handleImageUpload} label="Ingresa tu Foto" />
                {errors.photoG && <p style={{ color: 'red' }}>{errors.photoG}</p>}
                <div>
                  { error !== null ? <p>{error}</p> : null}
                  { loading === true ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : loading === false ? <div className= 'd-flex justify-content-center'><img alt={nameG} src={photoG} className='img-registro'/></div> : null}
                </div>
              </Form.Group>
              <Form.Group controlId="descriptionGuia" >
                <Form.Label>Descripción del Servicio</Form.Label>
                <Form.Control name='descriptionG' defaultValue={descriptionG} onChange={this.onChange} className='inputs descriptionG' as="textarea" rows="8" placeholder="¡Hola! Realizo caminatas ecológicas por el río San Juan..." />
                {errors.descriptionG && <p style={{ color: 'red' }}>{errors.descriptionG}</p>}
              </Form.Group>
              { Object.keys(errors).length === 0 ? null : <p className= 'p-0 text-center' style={{ color: 'red' }}>Formulario incompleto</p>}
              <Container className= 'px-4 pt-0 pb-4'>
                <Row className= 'm-0 d-flex justify-content-center'>
                  <Button onClick={this.onSubmit} className='submit font-weight-bold' type="submit" defaultValue="Enviar" variant="info" >Enviar</Button>
                </Row>
              </Container>
            </Form>
            <Alert show={showAlert} variant='success' className= 'p-2'>
              <Container className= 'p-0'>
                <Row className= 'd-flex justify-content-around mx-4'>
                  <p className='my-auto'>La infomación fue actualizada correctamente. Inicie sesión nuevamente.</p>
                  <Button className='submit font-weight-bold' onClick={this.onClick} type="submit" defaultValue="Enviar">Continuar</Button>
                </Row>
              </Container>
            </Alert>
          </Modal.Body>
        </Modal>
      </div>)
  }
}

ModalActualizarDatos.propTypes = {
  text: PropTypes.string,
  onUpdate: PropTypes.func,
  handleLogOut: PropTypes.func
}
export default ModalActualizarDatos
