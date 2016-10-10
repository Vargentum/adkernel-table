import { State } from 'jumpsuit'
import _ from 'lodash'
import axios from 'axios'

const usersState = State('users', {
  initial: {
    data: [],
    loading: false,
    loaded: false
  },
  loadingUsers(state) {
    return {
      ...state,
      loading: true
    }
  },
  addUser(state, payload) {
    return {
      ...state,
      data: data.concat([payload])
    }
  },
  receiveUsers(state, payload) {
    return {
      ...state,
      data: payload,
      loading: false,
      loaded: true
    }
  }
})

export default usersState

function initUsers() {
  return []
}
function isValidUsers(users) {
  return Array.isArray(users)
}

export function loadOrInitUsersData () {
  const storage = window.localStorage
  let users = storage.getItem('users')
  if (!isValidUsers(users))
    users = initUsers()
  usersState.receiveUsers(users)
}

