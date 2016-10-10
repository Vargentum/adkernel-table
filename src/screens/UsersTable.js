import { Component } from 'jumpsuit'
import _ from 'lodash'
import Table from 'components/table'
import NewUserForm from 'components/NewUserForm'
import {updateUsers, loadUsers} from 'state/users'


export default Component({
  componentWillMount () {
    loadUsers()
  },
  handleSubmit(fieldData, ac, form) {
    const {users: {data}} = this.props
    const newData = data.concat([fieldData])
    updateUsers(newData)
    form.reset()
  },
  render() {
    const {users: {loaded, loading, data}} = this.props
    return <div>
      <NewUserForm onSubmit={this.handleSubmit} />
      {loading && <span>Loading...</span>}
      {loaded && <Table data={data} />}
    </div>
  }

}, ({users}) => ({users}))