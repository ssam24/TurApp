import React, { Component } from 'react'
import { Container, Form, Row, Col, Spinner, Button, Alert, Modal } from 'react-bootstrap'
import axios from 'axios'
import PropTypes from 'prop-types'
import request from 'superagent'
const CLOUDINARY_UPLOAD_PRESET = 'turApp'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dnmmsm7iv/upload'
var upload
class ModalActualizarDatosU extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nameU: '',
      documentU: '',
      emailU: '',
      passwordU: '',
      placeU: '',
      birthdayU: '',
      termsU: true,
      photoU: '',
      loading: '',
      error: '',
      errors: {},
      show: false,
      urlG: 'https://apifake-turapp.herokuapp.com/guias',
      urlU: 'https://apifake-turapp.herokuapp.com/usuarios',
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
    if (state.tipo === 'usuario') {
      this.setState({
        nameU: state.datos.usuario.nameU,
        documentU: state.datos.usuario.documentU,
        emailU: state.datos.usuario.emailU,
        passwordU: state.datos.usuario.passwordU,
        placeU: state.datos.usuario.placeU,
        birthdayU: state.datos.usuario.birthdayU,
        termsU: state.datos.usuario.termsU,
        photoU: state.datos.usuario.photoU,
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
            photoU: response.body.secure_url,
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
      return guia.guia.emailG.toLowerCase() === value.emailU.toLowerCase()
    })
    const emailUFilter = this.state.infoU.filter((usuario) => {
      return usuario.usuario.emailU.toLowerCase() === value.emailU.toLowerCase()
    })

    if (!value.nameU) {
      document.querySelector('.nameU').classList.add('error')
      errors.nameU = 'Campo obligatorio'
    } else { document.querySelector('.nameU').classList.remove('error') }
    if (!/^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(value.emailU)) {
      document.querySelector('.emailU').classList.add('error')
      errors.emailU = 'Campo obligatorio (Correo no válido)'
    } else if (emailGFilter.length !== 0 || emailUFilter.length !== 0) {
      document.querySelector('.emailU').classList.add('error')
      errors.emailU = 'El E-mail ya está registrado'
    } else { document.querySelector('.emailU').classList.remove('error') }
    if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8}$/.test(value.passwordU)) {
      document.querySelector('.passwordU').classList.add('error')
      errors.passwordU = 'Campo obligatorio (Debe tener 8 caracteres, una minuscula, una mayuscula y un número)'
    } else { document.querySelector('.passwordU').classList.remove('error') }
    if (!value.placeU) {
      document.querySelector('.placeU').classList.add('error')
      errors.placeU = 'Campo obligatorio'
    } else { document.querySelector('.placeU').classList.remove('error') }
    if (!value.photoU) {
      errors.photoU = 'Campo obligatorio'
    }
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
      const usuario = noErrors
      this.axiosCancelSource = axios.CancelToken.source()
      axios.put(`http://localhost:3004/usuarios/${this.state.id}`, { usuario }, { cancelToken: this.axiosCancelSource.token })
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
    const { showAlert, nameU, documentU, emailU, passwordU, placeU, birthdayU, photoU, error, loading, show, errors } = this.state
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
            <Form id='formUsuario'>
              <Form.Group controlId="nameUsuario">
                <Form.Label >Nombre Completo</Form.Label>
                <Form.Control name='nameU' defaultValue={nameU} onChange={this.onChange} className='inputs nameU' type="text" placeholder="Manuel Turizo" />
                {errors.nameU && <p style={{ color: 'red' }}>{errors.nameU}</p>}
              </Form.Group>
              <Form.Group controlId="documentUsuario">
                <Form.Label>Documento</Form.Label>
                <Form.Control name='documentU' defaultValue={documentU} onChange={this.onChange} className='inputs documentU' type="number" placeholder="1047036099" disabled/>
              </Form.Group>
              <Form.Group controlId="emailUsuario">
                <Form.Label>E-mail</Form.Label>
                <Form.Control name='emailU' defaultValue={emailU} onChange={this.onChange} className='inputs  emailU' type="email" placeholder="Maturizo@gmail.com" />
                {errors.emailU && <p style={{ color: 'red' }}>{errors.emailU}</p>}
              </Form.Group>
              <Form.Group controlId="passwordUsuario">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control name='passwordU' defaultValue={passwordU} onChange={this.onChange} className='inputs  passwordU' type="password" placeholder="Matu1047" />
                {errors.passwordU && <p style={{ color: 'red' }}>{errors.passwordU}</p>}
              </Form.Group>
              <Form.Group controlId="placeUsuario">
                <Form.Label>Lugar de Servicio</Form.Label>
                <Form.Control name='placeU' defaultValue={placeU} onChange={this.onChange} className='inputs placeU' type="text" placeholder="Amaga" />
                {errors.placeU && <p style={{ color: 'red' }}>{errors.placeU}</p>}
              </Form.Group>
              <Form.Group controlId="birthdayUsuario">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control name='birthdayU' defaultValue={birthdayU} onChange={this.onChange} className='inputs birthdayU' type="date" disabled/>
              </Form.Group>
              <Form.Group controlId="photoUsuario">
                <Form.File name='file' onChange={this.handleImageUpload} label="Ingresa tu Foto" />
                {errors.photoU && <p style={{ color: 'red' }}>{errors.photoU}</p>}
                <div>
                  { error !== null ? <p>{error}</p> : null}
                  { loading === true ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : loading === false ? <div className= 'd-flex justify-content-center'><img alt={nameU} src={photoU} className='img-registro'/></div> : null}
                </div>
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

ModalActualizarDatosU.propTypes = {
  text: PropTypes.string,
  onUpdate: PropTypes.func,
  handleLogOut: PropTypes.func
}
export default ModalActualizarDatosU
