import React, { Component } from 'react'
import CardGuia from '../components/guias/CardGuia'
import NavBar from '../components/NavBar'
import Browser from '../components/Browser'
import Resume from '../components/Resume'
import Footer from '../components/Footer'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Loading from '../components/inicio/loading'

class Guias extends Component {
  // eslint-disable-next-line space-before-function-paren
  constructor(props) {
    super(props)
    this.state = {
      url: 'http://localhost:3004/guias',
      guias: [],
      guiasFilter: [],
      loading: true
    }
    this.onUpdate = this.onUpdate.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  // eslint-disable-next-line space-before-function-paren
  componentDidMount() {
    this.onUpdate(this.state.url)
  }

  // eslint-disable-next-line space-before-function-paren
  async onUpdate(param) {
    try {
      const res = await axios.get(param)
      if (Array.isArray(res.data)) {
        this.setState({ guias: res.data, guiasFilter: res.data, loading: false })
      } else {
        this.setState({ guias: [res.data], guiasFilter: [res.data], loading: false })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // eslint-disable-next-line space-before-function-paren
  onSearch(e) {
    const searchMunicipio = e.target.value
    const guiasFilter = this.state.guias.filter((guia) => {
      return guia.guia.placeG.toLowerCase().search(searchMunicipio.toLowerCase()) !== -1
    })
    this.setState({ guiasFilter: guiasFilter })
  }

  // eslint-disable-next-line space-before-function-paren
  render() {
    const { guiasFilter } = this.state
    if (this.state.loading === true) {
      return (<Loading />
      )
    }
    return (
      <div>
        <NavBar onUpdate={() => { this.onUpdate(this.state.url) }} clear={this.clear} ></NavBar>
        <Browser onSearch={this.onSearch}></Browser>
        <Container>
          <Row className="my-0">
            <Col className="text-center my-0">
              <h3 className="font-weight-bold guias my-0">GUÍAS</h3>
              <p>Conoce tu futur@ guía</p>
            </Col>
          </Row>
          <Row>
            {guiasFilter.map(guia => {
              return (<CardGuia key={guia.id} name={guia.guia.nameG} place={guia.guia.placeG} src={guia.guia.photoG} description={guia.guia.descriptionG} email={guia.guia.emailG} />)
            })}

          </Row>
        </Container>
        <Resume></Resume>
        <Footer></Footer>
      </div >
    )
  }
}

export default Guias
