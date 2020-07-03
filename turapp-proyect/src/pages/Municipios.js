import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import Browser from '../components/Browser'
import Resume from '../components/Resume'
import Footer from '../components/Footer'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Loading from '../components/inicio/loading'

export default class Municipios extends Component {
  constructor (props) {
    super(props)
    this.state = {
      url: 'http://localhost:3004/municipios',
      municipios: [],
      municipiosFilter: [],
      loading: true
    }
    this.onUpdate = this.onUpdate.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  async componentDidMount () {
    const res = await axios.get(this.state.url)
    this.setState({ municipios: res.data, loading: false })
    this.onUpdate(this.state.url)
  }

  async onUpdate (param) {
    try {
      const res = await axios.get(param)
      if (Array.isArray(res.data)) {
        this.setState({ municipios: res.data, municipiosFilter: res.data })
      } else {
        this.setState({ municipios: [res.data], municipiosFilter: [res.data] })
      }
    } catch (error) {
      console.log(error)
    }
  }

  onSearch (e) {
    const searchMunicipio = e.target.value
    const municipiosFilter = this.state.municipios.filter((municipios) => {
      return municipios.nombre.toLowerCase().search(searchMunicipio.toLowerCase()) !== -1
    })
    this.setState({ municipiosFilter: municipiosFilter })
  }

  render () {
    const { municipiosFilter } = this.state
    if (this.state.loading === true) {
      return (<Loading />
      )
    }
    return (
      <div>
        <NavBar onUpdate={() => { this.onUpdate(this.state.url) }} clear={this.clear}></NavBar>
        <Browser onSearch={this.onSearch}></Browser>
        <Container>
          <Row className="my-2">
            <Col className="text-center">
              <h3 className="font-weight-bold"><b>MUNICIPIOS</b></h3>
              <p>Vive los mejores paisajes de Antioquia</p>
            </Col>
          </Row>
          {municipiosFilter.map((municipios, index) => {
            if (index % 2 === 0) {
              return (
                <Row key={index}>
                  <Col xs={12} md={6} className="img_municipio">
                    <img src={municipios.imagen} alt={municipios.nombre} className="imagen img-fluid"/>
                  </Col>
                  <Col xs={12} md={6} className="d-flex flex-column justify-content-center">
                    <h3 className="text-center font-weight-bold">{municipios.nombre}</h3>
                    <p className="text-justify">{municipios.descripcion}</p>
                  </Col>
                </Row>)
            } else {
              return (

                <Row key={index}>
                  <Col xs={12} md={6} className="d-flex flex-column justify-content-center">
                    <h3 className="text-center font-weight-bold">{municipios.nombre}</h3>
                    <p className="text-justify">{municipios.descripcion}</p>
                  </Col>
                  <Col xs={12} md={6} className="img_municipio">
                    <img src={municipios.imagen} alt={municipios.nombre}className="imagen img-fluid"/>
                  </Col>
                </Row>

              )
            }
          })}

        </Container>
        <Resume></Resume>
        <Footer></Footer>
      </div>
    )
  }
}
