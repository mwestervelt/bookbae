import React, { Component , Fragment} from 'react';
import Logout from './Logout'
import Login from './Login'
import Signup from './Signup'
// import Links from './Links'
import { NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu,  Segment, Container, Label, Icon} from "semantic-ui-react"


class Nav extends Component {
  state = {}


  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
      const { fixed } = this.state
      const userExists = this.props.user

      return (
        <div>
        <Segment
           inverted
           textAlign='center'
           style={{ minHeight: 100, padding: '1em 0em' }}
           vertical >
              <Menu
                fixed={fixed ? 'top' : null}
                  inverted={!fixed}
                  pointing={!fixed}
                  secondary={!fixed}
                  size='large'>
                <Container>
                      <Menu.Item as='h1' position='left'>
                        <NavLink to='/'>
                          BookBae
                            <Icon name="heart"  color='red'/>

                        </NavLink>

                      </Menu.Item>
                      {
                          userExists ?
                              <Menu.Item position='right'>
                                <Label
                                    color='black'
                                    size='big'
                                    content={<NavLink to="/profile">{`Welcome back, ${this.props.user.username}`}</NavLink>}
                                    image={{avatar: true, spaced: 'right', src: this.props.user.avatar}}
                                />
                                <Logout />
                              </Menu.Item>
                              :
                              <Fragment>
                                  <Menu.Item position='right'>
                                      <Login message={this.props.message}/>
                                  </Menu.Item>
                                  <Menu.Item>
                                      <Signup message={this.props.message} />
                                  </Menu.Item>
                              </Fragment>
                      }

                  </Container>
              </Menu>
          </Segment>

            </div>

      )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Nav)
