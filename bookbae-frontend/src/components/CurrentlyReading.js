import React, { Component } from 'react';
import {Card, Header, Icon } from "semantic-ui-react"
import UserBook from './UserBook'
import Links from './Links'
import { connect } from 'react-redux'
import { updateBookObjs, updateUserFromFetch } from '../redux/actions'

class CurrentlyReading extends Component {

  componentDidMount () {
    this.getIdsFromUser()
  }

  getIdsFromUser = () => {
    const ids = this.props.user && this.props.currentlyReading.map(user_book => user_book.book_id)
    let bookObjs = this.props.user && this.props.user.books.filter(book => ids.includes(book.id))
    this.props.updateBooks(bookObjs)
  }


    deleteBook = (obj) => {
      let choosen_user_book = this.props.currentlyReading.filter(user_book => user_book.book_id === obj.id)
      let id = choosen_user_book[0].id
        fetch(`http://localhost:3000/api/v1/user_books/${id}`, {
          method: "DELETE"})
          .then(resp => resp.json())
          .then(resp => {
            this.props.updateUserFromFetch(resp)
            this.getIdsFromUser()
          }
        )
      }

  render() {
    let bookCards = this.props.bookObjs !== undefined && this.props.bookObjs.map(book => <UserBook bookObj={book} key={book.id} deleteBook={this.deleteBook}/>)
    return (
      <div>
        <Links/> <br/><br/>
          <Header inverted as='h1' textAlign='center'>
            <Header.Content>
              <Icon name='th'/>
                CURRENTLY READING:
            </Header.Content>
          </Header>
        <Card.Group centered>
        {bookCards}
        </Card.Group>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    currentlyReading: state.books.currentlyReading,
    bookObjs: state.bookObjs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateBooks: (books) => dispatch(updateBookObjs(books)),
    updateUserFromFetch: (user) => dispatch(updateUserFromFetch(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentlyReading)
