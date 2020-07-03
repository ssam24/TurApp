import React, { Component } from 'react'
import Slider from 'react-slick'
import { Container, Row, Col } from 'react-bootstrap'
import CardMunicipios from '../inicio/CardMunicipio'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class CarouselMunicipios extends Component {
  // eslint-disable-next-line space-before-function-paren
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }
    return (
      <div className="mw-100 ColorCarousel-inicio py-2">
        <Container className="mb-5">
          <Container>
            <Row>
              <Col><h3>CONOCE TU SIGUIENTE DESTINO</h3>
                <p>Vive los mejores paisajes de antioquia</p></Col>
              <Col xs={2}>
                <Link className='dropdown-item text-info font-weight-bold d-flex justify-content-end' to="/municipios">Ver todos</Link>
              </Col>
            </Row>
          </Container>
          <Slider {...settings}>
            {
              this.props.municipios.map((municipio, index) => {
                return (
                  <div key={index} className="border-focus">
                    <CardMunicipios
                      name={municipio.nombre}
                      images={municipio.imagen}></CardMunicipios>
                  </div>
                )
              }
              )
            }
          </Slider>
        </Container>
      </div>
    )
  }
}

CarouselMunicipios.propTypes = {
  municipios: PropTypes.array
}
