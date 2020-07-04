import React, { Component } from 'react'
import CardExperiencia from '../inicio/CardExperiencia'
import { Container, Col, Row } from 'react-bootstrap'
import axios from 'axios'

class Experiencia extends Component {
  // eslint-disable-next-line space-before-function-paren
  constructor() {
    super()
    this.state = {
      url: 'https://apifake-turapp.herokuapp.com/experiencias',
      experiencias: []
    }
    this.onUpdate = this.onUpdate.bind(this)
  }

  // eslint-disable-next-line space-before-function-paren
  componentDidMount() {
    this.onUpdate(this.state.url)
  }

  // eslint-disable-next-line space-before-function-paren
  async onUpdate() {
    try {
      const res = await axios.get(this.state.url)
      if (Array.isArray(res.data)) {
        this.setState({ experiencias: res.data })
      } else {
        this.setState({ experiencias: [res.data] })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // eslint-disable-next-line space-before-function-paren
  render() {
    const { experiencias } = this.state
    return (
      <div className="mw-100 py-2 fondo text-white">
        <Container className="mb-5">
          <h3>EXPERIENCIAS</h3>
          <p>Vive los mejores paisajes de antioquia</p>
          <Row>
            {experiencias.map(exp => {
              return (<Col key={exp.id} className="text-white mx-auto" xs={10} md={6} lg={5}><CardExperiencia name={exp.guia} descripcion={exp.descripcion} imagen={exp.imagen}></CardExperiencia></Col>)
            })}
          </Row>
        </Container>
      </div>
    )
  }
}

export default Experiencia
