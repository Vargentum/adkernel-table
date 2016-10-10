'use strict'
import { Component } from 'jumpsuit'
import _ from 'lodash'
import {mapRender} from 'etc/utils'
import {Column, Cell} from 'fixed-data-table';
import Table from 'responsive-fixed-data-table';
import {fields, fieldsLabels} from 'components/NewUserForm'
import cls from 'classnames'

/* -----------------------------
  cell factory
----------------------------- */
function cellory (data, type) {
  return function _Cell ({rowIndex, ...props}) {
    const value = data[rowIndex][type]
    return <Cell {...props}> {value} </Cell>
  }
}

export default Component({

  r_cell (type) {
    return cellory(this.props.data, type)
  },
  r_controlCell (type) {
    return <Cell>{type}</Cell>
  },
  render() {
    const {data} = this.props
    return <div style={{height: 500}}>
      <Table
        rowHeight={50}
        rowsCount={data.length}
        headerHeight={50}
      >
        {fields.map((field, idx) => 
          <Column
            key={field}
            width={0}
            flexGrow={1}
            header={this.r_controlCell(fieldsLabels[idx])}
            cell={this.r_cell(field)}/>
          )}
      </Table>    
    </div>
  }
})
