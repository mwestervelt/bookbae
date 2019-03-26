import React, { Component } from 'react';
import { connect } from 'react-redux'
import { logoutUser } from '../redux/actions.js'
import { withRouter } from "react-router-dom"
import { Button} from "semantic-ui-react";


class Logout extends Component {

  handleLogout = () => {
    localStorage.removeItem("token")
    this.props.logoutUser()
    this.props.history.push("/");
  }

  render() {
    return <Button label='Logout' labelPosition='left' icon='sign-out' onClick={this.handleLogout}/>
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout))
