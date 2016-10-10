import { State } from 'jumpsuit'
import _ from 'lodash'

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
  updateUsers(state, payload) {
    return {
      ...state,
      data: payload
    }
  },
  addUser(state, payload) {
    return {
      ...state,
      data: state.data.concat([payload])
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

/* -----------------------------
  Actions
----------------------------- */
const storage = window.localStorage

export function loadUsers () {
  let users = JSON.parse(storage.getItem('users'))
  if (!isValidUsers(users))
    users = initUsers()
  usersState.receiveUsers(users)
}

export function updateUsers(data) {
  usersState.updateUsers(data)
  storage.setItem('users', JSON.stringify(data))
}