import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './Root.css'
import Header from '../Header/Header'
import Dashboard from '../Dashboard/Dashboard'
import AdoptPage from '../AdoptPage/AdoptPage'


class Root extends Component {
  renderMainRoutes(){
    return(
      <>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/adopt' component={AdoptPage} />
      </>
    )
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderMainRoutes()}
      </div>
    )
  }
}

export default Root
