import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import './App.css';

import Nav from './components/Nav'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import CurrentlyReading from './components/CurrentlyReading'
import BookContainer from './components/BookContainer'
import WantToRead from './components/WantToRead'
import HaveReadShelf from './components/HaveReadShelf'
import Home from './components/Home'
import ReviewContainer from './components/ReviewContainer'

//redux stuff
import { connect } from 'react-redux'
import { setAndFetchUser } from './redux/actions'


class App extends Component {

  componentDidMount () {
    const token = localStorage.getItem('token')
    if (token) {
      this.props.setAndFetchUser(token)
    }
  }

  render() {
    // console.log(this.props)
    return (
      <div className="homepage">
        <Nav />
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route path="/currently-reading" component={CurrentlyReading} />
          <Route path="/read" component={HaveReadShelf} />
          <Route path="/want-to-read" component={WantToRead} />
          <Route path='/search-books' component={BookContainer} />
          <Route path="/reviews" component={ReviewContainer} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAndFetchUser: (token) => dispatch(setAndFetchUser(token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
