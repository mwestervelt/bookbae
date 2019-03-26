import React, { Component } from 'react';
import { Input, Header, Icon, Grid} from 'semantic-ui-react'
import Links from './Links'
import debounce from 'lodash/debounce'


export default class SearchForm extends Component {

  state = {
     term: ""
   }

   // changeHandler = (event) => {
   //     this.setState({
   //       [event.target.name]: event.target.value
   //     }, () => this.props.searchHandler(this.state.term))
   // }

      changeHandler = (event) => {

          this.setState({

            [event.target.name]: event.target.value
          }, debounce(() => this.props.searchHandler(this.state.term), 1000))
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
            <Input
              fluid
              required
              onChange={this.changeHandler.bind(this)}
              placeholder="search..."
              value={this.state.term}
              type="text"
              name="term" />
    </Grid.Column>
    </Grid.Row>
  </Grid>
    </div>

  )
}
}
