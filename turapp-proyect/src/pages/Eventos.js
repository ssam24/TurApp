import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import Browser from '../components/Browser'
import Resume from '../components/Resume'
import Footer from '../components/Footer'
import CardEvento from '../components/Eventos/CardEvento'
import { Container, Row } from 'react-bootstrap'
import axios from 'axios'
import Loading from '../components/inicio/loading'

export default class Eventos extends Component {
  constructor () {
    super()
    this.state = {
      url: 'http://localhost:3004/eventos',
      eventos: [],
      eventosFilter: [],
      loading: true
    }
    this.onSearch = this.onSearch.bind(this)
  }

  async componentDidMount () {
    const res = await axios.get(this.state.url)
    this.setState({ eventos: res.data, eventosFilter: res.data, loading: false })
  }

  onSearch (e) {
    const searchMunicipio = e.target.value
    const eventosFilter = this.state.eventos.filter((evento) => {
      return evento.lugar.toLowerCase().search(searchMunicipio.toLowerCase()) !== -1
    })
    this.setState({ eventosFilter: eventosFilter })
  }

  render () {
    const { eventosFilter } = this.state
    if (this.state.loading === true) {
      return (<Loading />
      )
    }
    return (
      <div>
        <NavBar></NavBar>
        <Browser onSearch={this.onSearch}></Browser>
        <Container className="mb-3">
          <h3 className="text-center font-weight-bold">EVENTOS</h3>
          <p className="text-center">Programacion de los diferentes eventos</p>
          <Row>
            {
              eventosFilter.map((evento, index) => {
                return (
                  <CardEvento
                    key={index}
                    name={evento.nombre}
                    description={evento.descripcion}
                    image={evento.imagen}
                    fecha={evento.fecha}
                    url={evento.url}
                    lugar={evento.lugar}
                  ></CardEvento>
                )
              })
            }
          </Row>
        </Container>
        <Resume></Resume>
        <Footer></Footer>
      </div>
    )
  }
}
