import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import ModalRegistro from './ModalRegistro'
import PropTypes from 'prop-types'

export default class Resume extends Component {
  render () {
    return (
      <Container className="resume mw-100">
        <Row className='pl-3'>
          <Col className="mt-4 p-0 ">
            <ul className="p-0">
              <li><b>ACERCA DE</b></li>
              <li><Link className="dropdown-item" to="/">TurApp </Link></li>
              <li><Link className="dropdown-item" to="/">Inicio </Link></li>
              <li><Link className="dropdown-item" to="/guias">Guías </Link></li>
              <li><Link className="dropdown-item" to="/eventos">Eventos </Link></li>
              <li><Link className="dropdown-item" to="/municipios">Municipios </Link></li>
              <li><a className="dropdown-item" href="/">Ayuda</a></li>
            </ul>
          </Col>
          <Col className="mt-4 p-0">
            <ul className="p-0">
              <li><b>TU CUENTA</b></li>
              <li>
                <a className="registro2 dropdown-item" href="#btn-Info" >Inicio Sesión</a></li>
              <li>
                <div className="registro2 dropdown-item" ><ModalRegistro text="Registrate" onUpdate={this.props.onUpdate}/></div></li>
            </ul>
          </Col>
          <Col className="mt-4 p-0">
            <b>SIGUENOS</b>
            <ul>
              <FontAwesomeIcon className="icono" icon={faFacebook} />
              <FontAwesomeIcon className="icono" icon={faTwitter} />
              <FontAwesomeIcon className="icono" icon={faInstagram} />
            </ul>
          </Col>
        </Row>
      </Container>
    )
  }
}

Resume.propTypes = {
  onUpdate: PropTypes.func
}
