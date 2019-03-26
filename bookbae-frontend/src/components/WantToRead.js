import React, { Component } from 'react';
import {Card, Header, Icon } from "semantic-ui-react"
import UserBook from './UserBook'
import { connect } from 'react-redux'
import Links from './Links'
import { updateBookObjs, updateUserFromFetch } from '../redux/actions'

class WantToRead extends Component {
  componentDidMount () {
    this.getIdsFromUser()
  }

  getIdsFromUser = () => {
    const ids = this.props.user && this.props.wantToRead.map(user_book => user_book.book_id)
    let bookObjs = this.props.user && this.props.user.books.filter(book => ids.includes(book.id))
    this.props.updateBookObjs(bookObjs)
  }

  deleteBook = (obj) => {
    let choosen_user_book = this.props.wantToRead.find(user_book => user_book.book_id === obj.id)
    let id = choosen_user_book.id
      fetch(`http://localhost:3000/api/v1/user_books/${id}`, {
        method: "DELETE"})
        .then(resp => resp.json())
        .then(resp => {
          this.props.updateUserFromFetch(resp)
          this.getIdsFromUser()
        }
      )
    }


  // handleFilter = (e) => {
  //   e.preventDefault()
  //   if (e.target.filter.value === 'A-Z') {
  //     let books = this.props.bookObjs.sort(function(a, b) {
  //       return a.title.localeCompare(b.title);
  //     })
  //     let update = [...books]
  //     this.props.updateBooks(update)
  //   } else if (e.target.filter.value === 'Z-A') {
  //       let books = this.props.bookObjs.sort(function(a, b) {
  //         return b.title.localeCompare(a.title);
  //     })
  //     let update = [...books]
  //     this.props.updateBooks(update)
  //   } else if (e.target.filter.value === 'Favorites') {
  //     let books = this.props.bookObjs.filter(book => book.favorited === true)
  //     let update = [...books]
  //     this.props.updateBooks(update)
  //   }
  // }

  render() {
    let bookCards = this.props.bookObjs !== undefined && this.props.bookObjs.map(book => <UserBook bookObj={book} key={book.id} handleChange={this.handleChangeCategory} deleteBook={this.deleteBook}/>)
    return (
      <div>
        <Links />

          <br/><br/>
        <Header inverted as='h1' textAlign='center'>
          <Header.Content>
            <Icon name='arrow alternate circle right' />
              WANT TO READ:
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
      wantToRead: state.books.wantToRead,
      bookObjs: state.bookObjs
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      updateBookObjs: (books) => dispatch(updateBookObjs(books)),
      updateUserFromFetch: (user) => dispatch(updateUserFromFetch(user))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(WantToRead)
