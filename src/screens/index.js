import { Component } from 'jumpsuit'
import {Grid} from 'react-bootstrap'

export default Component({
  render () {
    return (
      <Grid>
        {this.props.children}
      </Grid>
    )
  }
})
