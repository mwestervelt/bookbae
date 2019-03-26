import React, { Component } from 'react';
import {Card, Header, Dropdown, Message, Image, Button, Modal, Form, Label, Icon} from "semantic-ui-react"
import { Redirect, Link } from 'react-router-dom'

// redux stuff
import { connect } from 'react-redux'
import { updateUserFromFetch, updateBookObjs, addBook } from '../redux/actions'


const shelftypes = [
  {key: 'read', text: 'Have Read', value: 'read'},
  {key: 'reading', text: 'Currently Reading', value: 'currently_reading'},
  {key: 'want', text: 'Want to Read', value: 'want_to_read'},
]


class Book extends Component {

state = {
  bookCardClicked: false,
  modalOpen: false
}

// handleOpen = () => this.setState({ modalOpen: true })
//
// handleClose = () => this.setState({ modalOpen: false })


handleClickedImage = () => {
  this.setState({
    bookCardClicked: !this.state.bookCardClicked
  })
}

handleChange = (e, { value }) => {
  console.log("changed dropdown", value);
  this.setState({ value })
}
// (e) => this.addToBookshelf(e, this.props.bookObj)


  addToBookshelf = (e, bookObj) => {
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`},
        body: JSON.stringify({
          title: this.props.bookObj.volumeInfo.title,
          author: this.props.bookObj.volumeInfo.authors[0],
          description: this.props.bookObj.volumeInfo.description,
          image:  this.props.bookObj.volumeInfo.imageLinks.thumbnail,
        })
      }
        fetch('http://localhost:3000/api/v1/books', options)
        .then(resp => resp.json())
        .then(book => fetch('http://localhost:3000/api/v1/user_books', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}`},
          body: JSON.stringify({
            shelf_type: "wantToRead",
            book_id: book.id,
            user_id: this.props.user.id,
          })
        }))
          .then(resp => resp.json())
          .then(data => {console.log("are you updating?", data)
            this.props.updateUserFromFetch(data.user)
            // find appropriate id and shovel in to wantToRead
            const ids = data.user.want_to_read.map(user_book => user_book.book_id)
            let books = data.user.books.filter(book => ids.includes(book.id))
            this.props.updateBookObjs(books)
            const user_book = {...data}
            delete user_book.user
            delete user_book.book
            this.props.addBook(user_book)
            // alert("ya book has been added")
          }
        )
      }


  render() {
    return (
      <Card>
      <Card.Content textAlign="center">
        <Card.Header >
          {this.props.bookObj.volumeInfo.title}
        </Card.Header>
        <Card.Meta>
          {this.props.bookObj.volumeInfo.authors}
        </Card.Meta>
        <Image
        alt={this.props.bookObj.volumeInfo.title}
        src={this.props.bookObj.volumeInfo.imageLinks === undefined ? null : this.props.bookObj.volumeInfo.imageLinks.thumbnail}/>

        {this.state.bookCardClicked &&
        <div>
          <p>{this.props.bookObj.volumeInfo.author}</p>
          <p>{this.props.bookObj.volumeInfo.description}</p>
      </div>}
      </Card.Content>
      <Modal size="small" trigger={<Button  primary >Book Details</Button>}>
        <Modal.Header>{this.props.bookObj.volumeInfo.title}</Modal.Header>
          <Modal.Content>
          {this.props.bookObj.volumeInfo.authors} <br/><br/>
        {this.props.bookObj.volumeInfo.description}<br/><br/>

        <Image
        alt={this.props.bookObj.volumeInfo.title}
        src={this.props.bookObj.volumeInfo.imageLinks === undefined ? null : this.props.bookObj.volumeInfo.imageLinks.thumbnail}/>


              <br></br><br></br>
              <Modal.Actions>

            </Modal.Actions>

      </Modal.Content>
    </Modal>
{this.props.user ?

  <Modal
      trigger={<Button secondary onClick={(e) => this.addToBookshelf(e, this.props.bookObj)}>Add to Shelf</Button>}
      basic
      size='small'

    >
      <Header icon='book' content='{this.props.bookObj.volumeInfo.title} has been added' />
      <Modal.Content>
        <h3>Congrats. What will you do next?</h3>
      </Modal.Content>
      <Modal.Actions>

        <Button color='green'  >
          <Icon name='checkmark' /> Add more books, obviously.
        </Button>

        <Button color='teal' content={<Link to='/want-to-read'/>} >
          <Icon name='checkmark' /> View my books!
        </Button>
      </Modal.Actions>
    </Modal>
        : ""
        }
      </Card>
      )
    }
  }


const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    bookObjs: state.bookObjs,
    wantToRead: state.books.wantToRead
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserFromFetch: (user) => dispatch(updateUserFromFetch(user)),
    updateBookObjs: (books) => dispatch(updateBookObjs(books)),
    addBook: (books) => dispatch(addBook(books)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)
