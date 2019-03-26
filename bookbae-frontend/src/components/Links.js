import React from 'react';
import { Link } from 'react-router-dom'

const Links = () => {
  return (
    <div className="container">
      <Link className="first after" to='/read'>
        <p className="userlinks">{"Books Read"}</p>
      </Link>
      <Link className="first after" to='/currently-reading'>
        <p className="userlinks">{"Currently Reading"}</p>
      </Link>
      <Link className="first after" to='/want-to-read'>
        <p className="userlinks">{"Want to Read"}</p>
      </Link>
      <Link className="first after" to='/reviews'>
        <p className="userlinks">Reviews</p>
      </Link>

      <Link className="first after" to="/search-books" >
        <p className="userlinks">Search Books</p>
      </Link>
    </div>
  )
}

export default Links
