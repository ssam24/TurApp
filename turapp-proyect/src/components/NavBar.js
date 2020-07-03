import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import Imgs from '../imagesPage/Logo_TurApp.png'
import ModalRegistro from './ModalRegistro'
import ModalInicioSesion from './ModalInicioSesion'
import ModalActualizarDatos from './ModalActualizarDatos'
import ModalActualizarDatosU from './ModalActualizarDatosU'
import PropTypes from 'prop-types'
import axios from 'axios'

class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      urlG: 'http://localhost:3004/guias',
      urlU: 'http://localhost:3004/usuarios',
      infoG: [],
      infoU: [],
      inicioSesion: false,
      email: '',
      password: '',
      showAlert: false,
      show: false,
      datos: '',
      tipo: '',
      prevScrollpos: window.pageYOffset,
      visible: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
    if (localStorage.getItem('datosSesion') !== null) {
      const state = JSON.parse(localStorage.getItem('datosSesion'))
      this.setState({
        urlG: state.urlG,
        urlU: state.urlU,
        infoG: state.infoG,
        infoU: state.infoU,
        inicioSesion: state.inicioSesion,
        email: state.email,
        password: state.password,
        showAlert: state.showAlert,
        show: state.show,
        datos: state.datos,
        tipo: state.tipo
      })
    } else {
      this.handleUpdate()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll () {
    const { prevScrollpos } = this.state

    const currentScrollPos = window.pageYOffset
    const visible = prevScrollpos > currentScrollPos

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    })
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

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleClick () {
    const emailSearch = this.state.email
    const passwordSearch = this.state.password
    const guiasFilter = this.state.infoG.filter((guia) => {
      return guia.guia.emailG.toLowerCase() === emailSearch.toLowerCase().trim() && guia.guia.passwordG === passwordSearch
    })
    const usuariosFilter = this.state.infoU.filter((usuario) => {
      return usuario.usuario.emailU.toLowerCase() === emailSearch.toLowerCase().trim() && usuario.usuario.passwordU === passwordSearch
    })
    if (guiasFilter.length !== 0) {
      this.setState({
        datos: guiasFilter[0],
        tipo: 'guia'
      })
    } else if (usuariosFilter.length !== 0) {
      this.setState({
        datos: usuariosFilter[0],
        tipo: 'usuario'
      })
    }

    if (guiasFilter.length !== 0 || usuariosFilter.length !== 0) {
      this.setState({
        showAlert: false,
        inicioSesion: true
      })
      document.getElementById('form').reset()
      this.handleModal()
    } else {
      this.setState({
        showAlert: true
      })
    }
  }

  handleClose () {
    this.setState({ showAlert: false })
  }

  handleModal () {
    this.setState({
      show: !this.state.show
    })
    if (this.state.show === false && this.state.inicioSesion === true) {
      this.setState({
        showAlert: false
      })
    } else if (this.state.show === false) {
      this.setState({
        email: '',
        password: '',
        showAlert: false
      })
    }
  }

  handleLogOut () {
    localStorage.removeItem('datosSesion')
    this.setState({
      urlG: 'http://localhost:3004/guias',
      urlU: 'http://localhost:3004/usuarios',
      infoG: [],
      infoU: [],
      inicioSesion: false,
      email: '',
      password: '',
      showAlert: false,
      show: false,
      datos: '',
      tipo: ''
    })
    this.handleUpdate()
  }

  render () {
    if (this.state.datos !== '') {
      const datosSesion = this.state
      localStorage.setItem('datosSesion', JSON.stringify(datosSesion))
    }
    const { email, password, showAlert, inicioSesion, datos, tipo } = this.state
    return (
      <div className="container-navbar">
        <nav className={`navbar navbar-expand-lg navbar-light navColor position-fixed ${this.state.visible ? 'navtop' : 'navtop-hide'} `} >
          {inicioSesion === true ? <div>
            <Link to="#" className="text-dark" href="#" id="dropdown09" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-bars mr-3"></i></Link><div className="navContdrop dropdown-menu " aria-labelledby="dropdown09">
              <div className="pl-3">
                <Image className="perfil-img img-fluid" src={tipo === 'guia' ? datos.guia.photoG : datos.usuario.photoU} fluid />
                <h4 className="pt-3">{tipo === 'guia' ? datos.guia.nameG : datos.usuario.nameU}</h4>
                <p className="mt-0" >{tipo === 'guia' ? datos.guia.emailG : datos.usuario.emailU}</p>
              </div>
              <hr></hr>
              <div className="dropdown-item"><i className="fas fa-sync-alt"></i>{this.state.tipo === 'guia' ? <ModalActualizarDatos text='Actualizar información' onUpdate={this.props.onUpdate} handleLogOut={() => { this.handleLogOut() }}/> : <ModalActualizarDatosU text='Actualizar información' onUpdate={this.props.onUpdate} handleLogOut={() => { this.handleLogOut() }}/> } </div>
              <div className="dropdown-item registro2" onClick={this.handleLogOut}><i className="far fa-times-circle"></i>  Cerrar sesion</div>
            </div></div> : null }
          <a className="navbar-brand" href="/">
            <Image className="logo img-fluid " src={`${Imgs}`} />
          </a>
          <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
            <span ><i className="fas fa-ellipsis-v"></i></span>
          </button>

          <div className="navbar-collapse collapse justify-content-md-end" id="navbarsExample09" >
            <ul className="navbar-nav mr-5">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle font-weight-bold" href="/" id="dropdown09" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Menu</a>
                <div className="navContdrop dropdown-menu " aria-labelledby="dropdown09">
                  <Link className="dropdown-item" to="/">TurApp </Link>
                  <Link className="dropdown-item" to="/">Inicio </Link>
                  <Link className="dropdown-item" to="/guias">Guías </Link>
                  <Link className="dropdown-item" to="/eventos">Eventos </Link>
                  <Link className="dropdown-item" to="/municipios">Municipios </Link>
                  <a className="dropdown-item" href="/">Ayuda</a>
                </div>
              </li>
              <div >
                {inicioSesion === false ? <li className="nav-item dropdown ">
                  <a className="nav-link dropdown-toggle font-weight-bold" href="/" id="dropdown09" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Inicio Sesión</a><div className="navContdrop dropdown-menu" aria-labelledby="dropdown09">
                    <div className="dropdown-item registro2" ><ModalInicioSesion handleChange={this.handleChange} handleClick={this.handleClick} email={email} password={password} handleClose={this.handleClose} showAlert={showAlert} show={this.state.show} handleModal={() => { this.handleModal() }} text="Inicia Sesión" /></div>
                    <div className="dropdown-item registro2" ><ModalRegistro text="Registrate" onUpdate={this.props.onUpdate}/></div>
                  </div>
                </li> : <li className="nav-item dropdown ">
                  <div className="nav-link font-weight-bold registro2" data-toggle="dropdown" aria-haspopup="true" onClick={this.handleLogOut} aria-expanded="false">Cerrar Sesión</div>
                </li>}
              </div>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

NavBar.propTypes = {
  onUpdate: PropTypes.func
}

export default NavBar
