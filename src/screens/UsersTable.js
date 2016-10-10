import { Component } from 'jumpsuit'
import _ from 'lodash'
import Table from 'components/table'
import NewUserForm from 'components/NewUserForm'
import {loadOrInitUsersData} from 'state/users'
import usersState from 'state/users'


export default Component({
  componentWillMount () {
    loadOrInitUsersData()
  },
  handleSubmit(data) {
    console.log(data, 'data---------')
    usersState.addUser(data)
  },
  composeTableHead() {
    const {users: {loaded, loading, data}} = this.props
    const dataItem = _.head(data)
    return loaded && _.isObject(dataItem) 
      ? _.keys(dataItem)
      : []
  },
  render() {
    const {users: {loaded, loading, data}} = this.props
    return <div>
      <NewUserForm onSubmit={this.handleSubmit} />
      {loading && <span>Loading...</span>}
      {loaded && <Table data={data} head={this.composeTableHead()}/>}
    </div>
  }

}, ({users}) => ({users}))