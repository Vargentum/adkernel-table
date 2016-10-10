import { Render, Router, Route, IndexRoute } from 'jumpsuit'
/* state */
import state from 'state/index'
/* screens */
import App from 'screens/index'
import Github from 'screens/github'
import UsersTable from 'screens/UsersTable'

Render(state, (
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={UsersTable} />
      <Route path="/github" component={Github} />
    </Route>
  </Router>
))
