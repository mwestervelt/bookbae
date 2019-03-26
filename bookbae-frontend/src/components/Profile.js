import React, { Component } from 'react';
import { connect } from 'react-redux'
// import CurrentlyReading from './CurrentlyReading'
import Links from './Links'
import { Card, Icon, Image} from "semantic-ui-react"

class Profile extends Component {

render() {
  return (
    <div>
      <Links />

            <Card centered>
                <Card.Content textAlign='center'>
                    <Card.Header>{this.props.user.username}</Card.Header>
                    <Image alt='' src={this.props.user.avatar} />
                    <Card.Meta>
                        <span className='date'>Joined in 2019</span>

                    </Card.Meta>
                    <Card.Description>{this.props.user.bio}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='user' />
                    24 Friends
                </Card.Content>
            </Card>
            <p> put books here</p>
    }
    </div>
  )
}
}

const mapStateToProps = (state) => {
return {
  user: state.auth.user

  }
}




export default connect(mapStateToProps, null)(Profile)
