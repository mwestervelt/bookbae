import React, { Component } from 'react';
import { Header, Icon, Grid, Button, Form} from 'semantic-ui-react'
import Links from './Links'



class SearchForm extends Component {

  state = {
     term: ""
   }


  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = () => {
    this.props.searchHandler(this.state.term)
    this.setState({ term: ''})
  }


  render() {
    return (
      <div >
      <Links/>
      <br/><br/>
        <Header inverted as='h1' textAlign='center'>
          <Header.Content>
            <Icon name='search'/>
              SEARCH:
          </Header.Content>
        </Header>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={7}>
              <Form onSubmit={this.submitHandler}>
                <Form.Group>
                  <Form.Input
                    style={{width:"500px"}}
                    onChange={this.changeHandler}
                    placeholder="search..."
                    value={this.state.term}
                    type="text"
                    name="term" />
                  <Form.Button primary >Search</Form.Button>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}



export default SearchForm
