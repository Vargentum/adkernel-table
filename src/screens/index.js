import { Component } from 'jumpsuit'

export default Component({
  render () {
    return (
      <div className='container'>
        {this.props.children}
      </div>
    )
  }
})
