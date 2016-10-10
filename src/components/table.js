'use strict'
import { Component } from 'jumpsuit'
import _ from 'lodash'
import {mapRender} from 'etc/utils'
import {Table, Column, Cell} from 'fixed-data-table';
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


const TABLE_WIDTH = 960

export default Component({

  r_cell (type) {
    return cellory(this.props.data, type)
  },
  r_controlCell (type) {
    return <Cell>{type}</Cell>
  },
  getColWidth() {
    return TABLE_WIDTH / fields.length
  },
  render() {
    const {data} = this.props
    return <Table
      rowHeight={50}
      rowsCount={data.length}
      width={TABLE_WIDTH}
      height={500}
      headerHeight={50}
    >
      {fields.map((field, idx) => 
        <Column
          key={field}
          width={this.getColWidth()}
          header={this.r_controlCell(fieldsLabels[idx])}
          cell={this.r_cell(field)}/>
        )}
    </Table>    
  }
})
