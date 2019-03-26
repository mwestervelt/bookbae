import React from 'react';
import { Segment, Grid, Header, Image, Button, Icon} from "semantic-ui-react"
// import SearchForm from './SearchForm'
import Links from './Links'
import { Link, NavLink} from 'react-router-dom'



const Home = () => {
    return <div className="homepage">
    <Links/>
        <div id="welcomemessage">
        <Segment style={{ padding: '10em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <h1> Welcome </h1> <br/><br/>
                <p>Because that book you started 3 months ago and put down needs some love too.</p><p> Keep track of your reads and discover your next book bae.</p>

            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button primary size='huge'>
                <Link className="first after" to="/search-books" >
                  <p className="userlinks">Make Books Bae Again</p>
                </Link>
                </Button>

              <br/><br/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
        </div>

      </div>


}



export default Home
