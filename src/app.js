import { Render, Router, Route, IndexRoute } from 'jumpsuit'
/* state */
import state from 'state/index'
/* screens */
import App from 'screens/index'
import UsersTable from 'screens/UsersTable'

Render(state, (
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={UsersTable} />
    </Route>
  </Router>
))
