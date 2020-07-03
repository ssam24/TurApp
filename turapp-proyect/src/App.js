import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Guias from './pages/Guias'
import Municipios from './pages/Municipios'
import Inicio from './pages/Inicio'
import Eventos from './pages/Eventos'
import './App.css'

// eslint-disable-next-line space-before-function-paren
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Inicio} />
        <Route path='/guias' component={Guias} />
        <Route path='/eventos' component={Eventos} />
        <Route path='/municipios' component={Municipios} />
      </Switch>
    </div>
  )
}

export default App
