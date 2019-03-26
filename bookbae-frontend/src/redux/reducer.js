const initialState = {
  auth: {},
  books: {
    read: [],
    wantToRead: [],
    currentlyReading: []
  },
  bookObjs: [],
  booksFromAPI: [],
  selectedBook: {},
  reviews: []
}

const reducer = (state = initialState, action) => {
  switch (action.type){

    case 'GET_REVIEWS':
      return {...state, reviews: action.payload}

    case 'GET_BOOKS_FROM_API':
       return {...state, booksFromAPI: action.payload}

    case 'ADD_BOOK':
      let addedBook = action.payload
      return {...state, books: {
        read: state.books.read,
        wantToRead: [...state.books.wantToRead, addedBook],
        currentlyReading: state.books.currentlyReading
      }
}
    case 'HANDLE_LOGIN': {
      return {...state, auth: action.payload,
        books: {
          read: action.payload.user.read,
          wantToRead: action.payload.user.want_to_read,
          currentlyReading: action.payload.user.currently_reading}
         }
       }
     case 'HANDLE_LOGOUT': {
       return {...state, auth: {},
         books: {
           read: {},
           wantToRead: {},
           currentlyReading: {}
           }
         }
       }

     case 'GET_CURRENT_USER': {
       // console.log("is there a current user payload?", action.payload);
       return {...state, auth: action.payload,
          books: {
            read: action.payload.user.read,
            wantToRead: action.payload.user.want_to_read,
            currentlyReading: action.payload.user.currently_reading
           }
         }
       }

     case 'UPDATE_BOOK_OBJS': {
       console.log("these are all the book objs:", action.payload);
       return { ...state, bookObjs: action.payload }
     }

     case 'SELECT_BOOK': {
      return { ...state, selectedBook: action.payload }
    }

     case 'EDIT_SHELF': {
       //current shelf minus the chosenbook
      let bookInformation = action.payload
      let filteredArray = state.books[bookInformation.prevShelf].filter(book => book.id !== bookInformation.book.id )
      let addedArray = [...state.books[bookInformation.book.shelf_type], bookInformation.book]
      return {...state,
          books: {...state.books, [bookInformation.prevShelf]: filteredArray, [bookInformation.book.shelf_type]: addedArray },
          bookObjs: state.bookObjs.filter(book => book.id !== bookInformation.book.book_id)
        }
      }

     case 'UPDATE_USER_FROM_FETCH': {
       return {...state,
         auth: {
           user: action.payload
       }
     }
   }

    // case "ADD_TO_BOOKSHELF":
    //   let newBook = action.payload
    //   let uniqueArray = new Set()
    //   let newArray = [...uniqueArray.add(newBook)]
    //     return {...state, shelf: newArray}

    default:
      return state

    }
}

export default reducer
