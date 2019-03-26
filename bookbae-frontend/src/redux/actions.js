// LOGIN && LOGOUT && SIGNUP
// FETCHING FROM BOOKS-API && FETCHING CURRENT USER INFO


export const selectBook = (bookObj) => ({ type: 'SELECT_BOOK', payload: bookObj })
export const editShelf = (book, prevShelf) => ({ type: 'EDIT_SHELF', payload: {book, prevShelf} })
export const addBook = (user_book) => ({type:"ADD_BOOK", payload: user_book})

export const getBooksFromApi = (books) => ({
  type: 'GET_BOOKS_FROM_API',
  payload: books
})

export const handleLogin = (user) => ({
  type: 'HANDLE_LOGIN',
  payload: {user}
})

export const logoutUser = () => ({
  type: 'HANDLE_LOGOUT'
})

export const getCurrentUser = (user) => ({
  type: 'GET_CURRENT_USER',
  payload: {user}
 })

export const updateBookObjs = (books) => ({
  type: 'UPDATE_BOOK_OBJS',
  payload: books
})

export const updateUserFromFetch = (user) => ({
  type: 'UPDATE_USER_FROM_FETCH',
  payload: user
})

export const loginAndFetch = (e) => {
  return (dispatch) => {
    return loginFetch(e)
    .then(json => dispatch(handleLogin(json.user)) && localStorage.setItem("token", json.jwt))
  }
}

export const signUpAndFetch = (e) => {
  return (dispatch) => {
    return signUpFetch(e)
    .then(json => dispatch(handleLogin(json.user)) && localStorage.setItem("token", json.jwt))
  }
}

export const setAndFetchUser = (token) => {
  return (dispatch) => {
    return fetchingCurrentUser(token)
    .then(json => dispatch(getCurrentUser(json.user)))
  }
}

export const loginFetch = (e) => {
  return fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          email: e.target.email.value,
          password: e.target.password.value
        }
      })
    }).then(resp => resp.json())
}

export const signUpFetch = (e) => {
  return fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        bio: e.target.bio.value,
        avatar: e.target.avatar.value,
      }
      })
    }).then(resp => resp.json())
}

export const fetchingCurrentUser = (token) => {
  return fetch('http://localhost:3000/api/v1/beef', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(resp => resp.json())
}

export const getReviews = (reviews) => ({ type: 'GET_REVIEWS', payload: reviews})

export const fetchReviews = (token) => {
  fetch('http://localhost:3000/api/v1/reviews', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
}

export const patchShelf = (e, user_book) => {
  return fetch(`http://localhost:3000/api/v1/user_books/${user_book.id}`, {
    method: "PATCH",
    headers: {
         "Content-Type": "application/json"
      },
    body: JSON.stringify({
      shelf_type: e.target.category.value
    })
  })
  .then(resp => resp.json())
}


export const updateAndFetch = (e, user_book, prevShelf) => {
  console.log(prevShelf);
  return (dispatch) => {
    patchShelf(e, user_book)
    .then(json => dispatch(editShelf(json.user_book, prevShelf)))
  }
}
