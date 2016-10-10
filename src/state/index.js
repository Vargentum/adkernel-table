import github from './github'
import users from './users'
import {reducer as formReducer} from 'redux-form'

export default { github, users, form: formReducer }
