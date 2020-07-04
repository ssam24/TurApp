import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
export default class Footer extends Component {
  render () {
    return (
      <div>
        <Container id="footer_links" className="mw-100 font-weight-bold">
          <Row>
            <Col className="mt-3 d-flex justify-content-center">
            © 2020 TurApp
            </Col>
          </Row>
          <Row>
            <Col className="mx-2 mt-2 d-flex justify-content-center registro2">Condiciones</Col>
            <Col className="mx-2 mt-2 d-flex justify-content-center registro2">Privacidad</Col>
            <Col className="mx-2 mt-2 d-flex justify-content-center registro2">Cookies</Col>
          </Row>
        </Container>
      </div>
    )
  }
}
