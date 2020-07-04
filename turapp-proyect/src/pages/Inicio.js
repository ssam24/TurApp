import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import Resume from '../components/Resume'
import Footer from '../components/Footer'
import SimpleSlider from '../components/inicio/CarouselEventos'
import CarouselMunicipios from '../components/inicio/CarouselMunicipios'
import CarouselGuias from '../components/inicio/CarouselGuias'
import axios from 'axios'
import Experiencia from '../components/inicio/Experiencia'
import Loading from '../components/inicio/loading'

export default class Inicio extends Component {
  constructor () {
    super()
    this.state = {
      urlm: 'https://apifake-turapp.herokuapp.com/municipios',
      urlg: 'https://apifake-turapp.herokuapp.com/guias',
      urle: 'https://apifake-turapp.herokuapp.com/eventos',
      municipios: [],
      guias: [],
      eventos: [],
      loading: true
    }
  }

  async componentDidMount () {
    const resm = await axios.get(this.state.urlm)
    this.setState({ municipios: resm.data })
    const resg = await axios.get(this.state.urlg)
    this.setState({ guias: resg.data })
    const rese = await axios.get(this.state.urle)
    this.setState({ eventos: rese.data, loading: false })
  }

  render () {
    const { municipios, guias, eventos } = this.state
    if (this.state.loading === true) {
      return (<Loading />
      )
    }
    return (
      <div>
        <NavBar></NavBar>
        <CarouselGuias guias={guias} ></CarouselGuias>
        <SimpleSlider eventos={eventos}></SimpleSlider>
        <CarouselMunicipios municipios={municipios} ></CarouselMunicipios>
        <Experiencia></Experiencia>
        <Resume></Resume>
        <Footer></Footer>
      </div>
    )
  }
}
