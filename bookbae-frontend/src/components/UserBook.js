import React, { Component } from 'react';
import {Card,  Button, Form, Image, Input} from "semantic-ui-react"

//redux stuff
import { connect } from 'react-redux'
import { editShelf, updateBookObjs, fetchReviews, updateAndFetch } from '../redux/actions'

class UserBook extends Component {
  state = {
    bookCardClicked: false,
    reviewFormClicked: false,
    categoryFormClicked: false,
    rating: null,
    shelf_type: ""
  }

  // handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })

  handleClickedImage = () => {
    this.setState({
      bookCardClicked: !this.state.bookCardClicked
    })
  }

  handleReviewClicked = () => {
    this.setState({
      reviewFormClicked: !this.state.reviewFormClicked
    })
  }

  changeCategory = () => {
    this.setState({
      categoryFormClicked: !this.state.categoryFormClicked
    })
  }

  handleSelect = (e) => {
    this.setState({
      shelf_type: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        title: e.target.title.value,
        content: e.target.content.value,
        rating: 5,
        user_id: e.target.userid.value,
        book_id: e.target.bookid.value,

      })
    }
    fetch('http://localhost:3000/api/v1/reviews', options)
    .then(res => res.json())
    .then(review => console.log(review))
    // send this to review container???????
  }


  handleChangeCategory = (e, book) => {
    e.preventDefault()
    let user_book = this.props.user.user_books.find(user_book => user_book.book_id === book.id)

    this.props.updateAndFetch(e, user_book, user_book.shelf_type)
  }




  renderReviewForm (){
    return (
      <div className="reviewform">
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Input className="inputfieldsreview"><Input type="text" name="title" placeholder="Review Title"/><br /></Form.Input>
          <Form.TextArea type="text" name="content" placeholder="Review content..."></Form.TextArea>
            {/* /<Rating icon='heart'
              defaultRating={1}
              maxRating={5}
              onRate={this.handleRate} >

            </Rating> /*/}
            <input type="hidden" name="userid" value={this.props.user.id}/><br />
            <input type="hidden" name="bookid" value={this.props.bookObj.id}/>
            <Button className="button" type="submit">Send it</Button>
        </Form>
      </div>
    )
  }

  render() {
    console.log(this.props);
    return (
      <Card raised>
        <Card.Content textAlign="center">
            <Card.Header as='h2' attached='top'>
              {this.props.bookObj.title}
              </Card.Header>
              <Card.Meta>
              {this.props.bookObj.authors}
        </Card.Meta>
        <Image
          onClick={() => this.handleClickedImage()}
          alt={this.props.bookObj.title}
          src={this.props.bookObj.image === undefined ? null : this.props.bookObj.image}/>
        <div>{this.state.favorited === true ? <i onClick={() => this.changeFavorited(this.props.bookObj)} className="fas fa-heart"></i> : <i onClick={() => this.changeFavorited(this.props.bookObj)} className="far fa-heart"></i>}</div>
          {this.state.bookCardClicked &&
          <div>
            <p>{this.props.bookObj.author}</p>
            <p>{this.props.bookObj.description}</p>
            <Button.Group vertical>
              <Button onClick={this.handleReviewClicked}>Leave a Review</Button>
              <Button onClick={this.changeCategory}>Change Bookshelf</Button>
              <Button onClick={() => this.props.deleteBook(this.props.bookObj)}>Remove Book</Button>
            </Button.Group> <br/><br/>
            {this.state.categoryFormClicked &&
              <form onSubmit={(e) => this.handleChangeCategory(e, this.props.bookObj)} >
                <select className="filter" name="category" onChange={this.handleSelect}>
                  <option value="read">Have Read</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="currentlyReading">Currently Reading</option>
                </select>
                <input className="button" type="submit" value="Submit" />
              </form>}

            <div>
              {this.state.reviewFormClicked ? this.renderReviewForm() : null}
            </div>
        </div>}
        </Card.Content>
      </Card>
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
    editShelf: (book) => dispatch(editShelf(book)),
    updateBookObjs: (bookObjs) => dispatch(updateBookObjs(bookObjs)),
    fetchReviews: (review) => dispatch(fetchReviews(review)),
    updateAndFetch: (e, book, prevShelf) => dispatch(updateAndFetch(e, book, prevShelf))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserBook)
