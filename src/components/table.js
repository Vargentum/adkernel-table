'use strict'
import { Component } from 'jumpsuit'
import _ from 'lodash'
import {mapRender} from 'etc/utils'


export default Component({

  r_rowOf(Component) {
    return (cells) => {
      return <TableRow key={_.uniqueId('row-')}>
        {cells.map(u.mapRender(TableCell))}
      </TableRow>
    }
  },
  render() {
    const {data, head} = this.props
    return <table>
      <thead>
        {head.map(this.r_rowOf(TableHeadCell))}
      </thead>
      <tbody>
        {data.map(this.r_rowOf(TableCell))}
      </tbody>
    </table>
  }
})



function TableRow ({...props}) {
  return <tr {...props}></tr>
}

function TableCell ({...props}) {
  return <td {...props}></td>
}
function TableHeadCell ({...props}) {
  return <th {...props}></th>
}