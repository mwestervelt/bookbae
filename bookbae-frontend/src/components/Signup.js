import { Button, Form, Modal, Icon, Label, Message} from "semantic-ui-react";
import React, { Component } from 'react';
import { signUpAndFetch } from '../redux/actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Signup extends Component {

  submitHandler = (e) => {
    e.preventDefault()
    this.props.signUpAndFetch(e)
    .then(<Redirect to='/profile' />)
  }

  render() {
    return (
    <div>
      <Modal size="small" trigger={<Button primary >Sign up</Button>}>
        <Modal.Header center>Sign up:</Modal.Header>

          <Modal.Content>
            {this.props.message &&
            <Message negative>
              <Message.Header>{this.props.message}</Message.Header>
            </Message>}
            <Form onSubmit={this.submitHandler}>
              <Label pointing="below">Username:</Label>
                <Form.Input
                  required
                  type="text"
                  name="username"
                  placeholder="username"
                  />
              <Label pointing="below">Email:</Label>
                <Form.Input
                  required
                  type="text"
                  name="email"
                  placeholder="email"
                  />
              <Label pointing="below">Password:</Label>
                <Form.Input
                  required
                  type="password"
                  name="password"
                  placeholder="password"

                  />
                <Label pointing="below">Bio:</Label>
                <Form.Input
                  required
                  type="bio"
                  name="bio"
                  placeholder="enter a short bio"

                  />
                <Label pointing="below">Profile Pic:</Label>
                  <Form.Input
                    required
                  type="url"
                  name="avatar"
                  placeholder="profile pic URL"

                  />
              <br></br><br></br>

              <Modal.Actions>
            <Button color='green' inverted>
              <Icon name='checkmark' /> Sign up!
              </Button>
            </Modal.Actions>
            </Form>

      </Modal.Content>
    </Modal>
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
    signUpAndFetch: (e) => dispatch(signUpAndFetch(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
