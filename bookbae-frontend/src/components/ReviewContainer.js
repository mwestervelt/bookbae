import React, { Component } from 'react';
import {Header, Icon, Card} from "semantic-ui-react"
import { connect } from 'react-redux'
import Review from './Review'
import Links from './Links'
import { fetchReviews } from '../redux/actions'

class ReviewContainer extends Component {

  state = {
    reviews: []
  }

componentDidMount() {
    fetch('http://localhost:3000/api/v1/reviews')
    .then(resp => resp.json())
    .then(data => {
      this.setState({reviews: data})
    })
}

  render() {
    console.log(this.props.reviews);
    let reviewCards = this.state.reviews.map(review => <Review key={review.id} reviewObj={review} />)
    return (
    <div>
      <Links /> <br/><br/>
      <Header inverted as='h1' textAlign='center'>
        <Header.Content>
          <Icon name='write square'/>
            REVIEWS:
            </Header.Content>

        </Header>
        <Card.Group centered>
      {reviewCards}
      </Card.Group>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    reviews: state.reviews
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchReviews: (reviews) => dispatch(fetchReviews(reviews)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewContainer)
