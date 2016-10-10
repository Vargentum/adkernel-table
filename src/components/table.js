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

const DATA_ORDERS = {
  ascending: false,
  descending: true
}

export default Component({
  componentWillMount () {
    this.state = {
      mirroredData: this.props.data,
      sortedBy: null
    }
  },
  r_cell (type) {
    return cellory(this.state.mirroredData, type)
  },
  r_controlCell (type, label) {
    const {sortedKey, sortedOrder} = this.state
    const newOrder = sortedKey === type && sortedOrder === DATA_ORDERS.ascending // asc: false, desc: true
    return <Cell 
      onClick={_.partial(this.sortDataBy, type, newOrder)}
      className={cls('Table__cell', {
        'is-asc': sortedKey === type && sortedOrder === DATA_ORDERS.ascending,
        'is-desc': sortedKey === type && sortedOrder === DATA_ORDERS.descending
      })}
    >
      {label}
    </Cell>
  },
  sortDataBy(sortedKey, sortedOrder) {
    const {mirroredData} = this.state
    this.setState({
      mirroredData: sortedOrder === DATA_ORDERS.descending 
        ? mirroredData.reverse()
        : _.sortBy(mirroredData, item => 
            sortedKey === 'age' || sortedKey === 'phone'
              ? Number(item[sortedKey])
              : item[sortedKey]
          )
      ,
      sortedKey,
      sortedOrder
    });
  },
  render() {
    const {mirroredData} = this.state
    return <div style={{height: 500}}>
      <Table
        rowHeight={50}
        rowsCount={mirroredData.length}
        headerHeight={50}
      >
        {fields.map((field, idx) =>
          <Column
            key={field}
            width={0}
            flexGrow={1}
            header={this.r_controlCell(field, fieldsLabels[idx])}
            cell={this.r_cell(field)}/>
          )}
      </Table>
    </div>
  }
})
