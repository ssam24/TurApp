import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import PropTypes from 'prop-types'

class CardExperiencia extends Component {
  // eslint-disable-next-line space-before-function-paren
  render() {
    return (
      <div>
        <Card className='fondo' style={{ width: '100%' }}>
          <Card.Img variant="top" src={this.props.imagen} className='imagen1' />
          <Card.Body>
            <Card.Title>Guía: {this.props.name}</Card.Title>
            <Card.Text>
              {this.props.descripcion}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

CardExperiencia.propTypes = {
  name: PropTypes.string,
  descripcion: PropTypes.string,
  imagen: PropTypes.string
}

export default CardExperiencia
