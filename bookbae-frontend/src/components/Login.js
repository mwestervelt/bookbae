import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loginAndFetch } from '../redux/actions'
import { Redirect } from 'react-router-dom'
import {Modal, Icon, Button, Label, Form} from "semantic-ui-react"


class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.loginAndFetch(e)
    // .then(this.props.history.push("/userfeed"))
  }

  renderLoginForm = () => {
    return (
      <div>
        <Modal className="formmodal" size="small" trigger={<Button primary >Login</Button>}>
          <Modal.Header>User Login:</Modal.Header>
            <Modal.Content>

              <Form onSubmit={this.handleSubmit}>
                <Label pointing="below">Email:</Label>
                <Form.Input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={this.props.email}
                />
                <Label pointing="below">Password:</Label>
              <Form.Input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.props.password}
                />
                <br></br><br></br>
                <Modal.Actions>
                  <Button color='green' inverted>
                    <Icon name='checkmark' /> Log in
                </Button>
              </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  )
  }

  render() {
    return (
      <div>
        {localStorage.getItem('token') ? <Redirect to='/book-search' /> : this.renderLoginForm() }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAndFetch: (e) => dispatch(loginAndFetch(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
