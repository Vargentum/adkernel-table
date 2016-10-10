import { Component } from 'jumpsuit'
import _ from 'lodash'
import Table from 'components/table'
import NewUserForm from 'components/NewUserForm'
import {updateUsers, loadUsers} from 'state/users'
import * as st from 'components/states'
import * as u from 'etc/utils'
import {Alert, Grid, Row, Col} from 'react-bootstrap'


const UsersTable = Component({
  componentWillMount () {
    loadUsers()
    this.state = {
      successfullCreation: false
    }
  },
  handleSubmit(fieldData, ac, form) {
    const {users: {data}} = this.props
    const newData = data.concat([fieldData])
    updateUsers(newData)
    form.reset()
    this.showSuccessAlert()
  },
  r_successAlert() {
    return <Alert bsStyle="success" className="UsersTable__successAlert"> Added to table! </Alert>
  },
  showSuccessAlert() {
    this.setState({
      successfullCreation: true 
    });
    _.delay(
      () => this.setState({
        successfullCreation: false
      }),
      2000
    )
  },
  render() {
    const {users: {loaded, loading, data}} = this.props
    const {successfullCreation} = this.state
    return <Row>
      <Col xs={12}>
        <NewUserForm onSubmit={this.handleSubmit} />
        {successfullCreation && this.r_successAlert()}
        {loading && <st.LoadingArea />}
        {loaded && !_.isEmpty(data) 
          ? <Table 
              data={data} />
          : <st.EmptyArea>There are no users. Would you like to add a one?</st.EmptyArea>
        }
      </Col>
    </Row>
  }
}, ({users}) => ({users}))


export default UsersTable