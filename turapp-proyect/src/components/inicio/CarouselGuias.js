import React, { Component } from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import CardGuias from '../inicio/CardGuia'
import PropTypes from 'prop-types'

export default class CarouselGuias extends Component {
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
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 2
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
        <Container className="mb-5 guias-pt">
          <Container>
            <Row>
              <Col><h3>GUÍAS</h3></Col>
              <Col xs={2}>
                <Link className='dropdown-item text-info font-weight-bold d-flex justify-content-end' to="/guias">Ver todos</Link>
              </Col>
            </Row>
          </Container>
          <Slider {...settings}>
            {
              this.props.guias.map((guias, index) => {
                return (
                  <div key={index} className="border-focus">
                    <CardGuias
                      name={guias.guia.nameG}
                      photo={guias.guia.photoG}
                      place={guias.guia.placeG}
                    ></CardGuias>
                  </div>
                )
              })
            }
          </Slider>
        </Container>
      </div>
    )
  }
}

CarouselGuias.propTypes = {
  guias: PropTypes.array
}
