import React, { Component } from 'react';
import {Card, Header} from "semantic-ui-react"

class ReviewCard extends Component {


  render() {
    return (
    <Card>
      <Card.Content textAlign="center">
        <Card.Header>{this.props.reviewObj.title}</Card.Header>

      {this.props.reviewObj.content}
    </Card.Content>
    </Card>
    )
  }
}

export default ReviewCard
