import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Container, Button, Form, Row, Col, Spinner, Alert } from 'react-bootstrap'
import request from 'superagent'
import axios from 'axios'
import PropTypes from 'prop-types'
const CLOUDINARY_UPLOAD_PRESET = 'turApp'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dnmmsm7iv/upload'
var upload
class RegistroUsuario extends Component {
  constructor () {
    super()
    this.state = {
      nameU: '',
      documentU: '',
      emailU: '',
      passwordU: '',
      placeU: '',
      birthdayU: '',
      termsU: false,
      photoU: '',
      loading: '',
      error: '',
      errors: {},
      show: false,
      variant: '',
      respuesta: '',
      urlG: 'http://localhost:3004/guias',
      urlU: 'http://localhost:3004/usuarios',
      infoG: [],
      infoU: []
    }

    this.onChange = this.onChange.bind(this)
    this.onChangeTerms = this.onChangeTerms.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.validate = this.validate.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount () {
    this.handleUpdate()
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

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onChangeTerms (e) {
    this.setState({ termsU: !this.state.termsU })
  }

  handleImageUpload (e) {
    this.setState({
      loading: '',
      error: ''
    })
    console.log(this.props.show)
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
        photoU: ''
      })
    }
  }

  validate (value) {
    const errors = {}
    const documentGFilter = this.state.infoG.filter((guia) => {
      return guia.guia.documentG === value.documentU
    })
    const documentUFilter = this.state.infoU.filter((usuario) => {
      return usuario.usuario.documentU === value.documentU
    })
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
    if (value.documentU.length <= 5 || value.documentU.length >= 12) {
      document.querySelector('.documentU').classList.add('error')
      errors.documentU = 'Campo Obligatorio (6-11 dígitos)'
    } else if (documentGFilter.length !== 0 || documentUFilter.length !== 0) {
      document.querySelector('.documentU').classList.add('error')
      errors.documentU = 'El documento ya está registrado'
    } else { document.querySelector('.documentU').classList.remove('error') }
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
    if (!value.birthdayU) {
      document.querySelector('.birthdayU').classList.add('error')
      errors.birthdayU = 'Campo obligatorio'
    } else { document.querySelector('.birthdayU').classList.remove('error') }
    if (!value.photoU) {
      errors.photoU = 'Campo obligatorio'
    }
    if (!value.termsU) {
      errors.termsU = 'Campo obligatorio'
    }
    return errors
  }

  onSubmit (e) {
    e.preventDefault()
    const { errors, loading, error, show, variant, respuesta, infoG, infoU, urlG, urlU, ...noErrors } = this.state
    const result = this.validate(noErrors)
    this.setState({ errors: result })
    if (!Object.keys(result).length) {
      const usuario = noErrors
      this.axiosCancelSource = axios.CancelToken.source()
      axios.post('http://localhost:3004/usuarios', { usuario }, { cancelToken: this.axiosCancelSource.token })
        .then(res => {
          console.log(res)
          this.setState({
            nameU: '',
            documentU: '',
            emailU: '',
            passwordU: '',
            placeU: '',
            birthdayU: '',
            termsU: false,
            photoU: '',
            loading: '',
            show: true,
            variant: 'success',
            respuesta: 'Registro éxitoso'
          })
          document.getElementById('formGuia').reset()
        }).catch(error => {
          console.log(error)
          this.setState({
            nameU: '',
            documentU: '',
            emailU: '',
            passwordU: '',
            placeU: '',
            birthdayU: '',
            termsU: false,
            photoU: '',
            loading: '',
            show: true,
            variant: 'danger',
            respuesta: 'Fallo registro. Vuelva a intentarlo'
          })
          document.getElementById('formGuia').reset()
        })
    }
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
    const { nameU, documentU, emailU, passwordU, placeU, birthdayU, termsU, photoU, errors, loading, error, show, variant, respuesta } = this.state
    return (
      <div>
        <Container className= 'px-4 pt-3 pb-0' id="modalBodyGuia">
          <Row className= 'p-1 pb-0 m-0'>
            <Col xs={12} className= 'p-0 text-center font-weight-bold'>REGISTRARTE</Col>
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
              <Form.Control name='documentU' defaultValue={documentU} onChange={this.onChange} className='inputs documentU' type="number" placeholder="1047036099" />
              {errors.documentU && <p style={{ color: 'red' }}>{errors.documentU}</p>}
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
              <Form.Label>Lugar de Residencia</Form.Label>
              <Form.Control name='placeU' defaultValue={placeU} onChange={this.onChange} className='inputs placeU' type="text" placeholder="Amaga" />
              {errors.placeU && <p style={{ color: 'red' }}>{errors.placeU}</p>}
            </Form.Group>
            <Form.Group controlId="birthdayUsuario">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control name='birthdayU' defaultValue={birthdayU} onChange={this.onChange} className='inputs birthdayU' type="date"/>
              {errors.birthdayU && <p style={{ color: 'red' }}>{errors.birthdayU}</p>}
            </Form.Group>
            <Form.Group controlId="photoUsuario">
              <Form.File name='file' onChange={this.handleImageUpload} label="Ingresa tu Foto" />
              {errors.photoU && <p style={{ color: 'red' }}>{errors.photoU}</p>}
              <div>
                { error !== null ? <p>{error}</p> : null}
                { loading === true ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : loading === false ? <div className= 'd-flex justify-content-center'><img alt={nameU} src={photoU} className='img-registro'/></div> : null}
              </div>
            </Form.Group>
            <Form.Group controlId="termsUsuario" className= 'd-flex justify-content-center'>
              <Form.Check defaultValue={termsU} onChange={this.onChangeTerms} type="checkbox" label="Acepta los terminos y condiciones. " />
              {errors.termsU && <p style={{ color: 'red' }}>{errors.termsU}</p>}
            </Form.Group>
            { Object.keys(errors).length === 0 ? null : <p className= 'p-0 text-center' style={{ color: 'red' }}>Formulario incompleto</p>}
            <Container className= 'px-4 pt-0 pb-4'>
              <Row className= 'm-0 d-flex justify-content-center'>
                <Button onClick={this.onSubmit} className='submit font-weight-bold' type="submit" defaultValue="Enviar">Enviar</Button>
              </Row>
            </Container>
          </Form>
          <Alert show={show} variant={variant} className= 'p-2'>
            <Container className= 'p-0'>
              <Row className= 'd-flex justify-content-around'>
                <p className='my-auto'>{respuesta}</p>
                <Button className='submit font-weight-bold' onClick={this.props.showModal } type="submit" defaultValue="Enviar">Continuar</Button>
              </Row>
            </Container>
          </Alert>
        </Modal.Body>
      </div>)
  }
}
RegistroUsuario.propTypes = {
  show: PropTypes.bool,
  showModal: PropTypes.func.isRequired
}
export default RegistroUsuario
