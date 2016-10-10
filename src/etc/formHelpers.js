'use strict'
import React, { Component, PropTypes as PT } from 'react'
import {Col, FormGroup, FormControl, ControlLabel, HelpBlock, Radio} from 'react-bootstrap'
import _ from 'lodash'

export function fillExisntenceErrors (data, errorMsg = 'Required') {
  return _.transform(
    data,
    (errors, field) => field ? errors : {...errors, [field]: errorMsg},
    {}
  )
}

export const smallInputCfg = {
  main: 2, label: 3
}

export function CompleteField ({colConfig={label: 3, main: 9}, label, id, error, children, ...props}) {
  const formGroupProps = {
    controlId: id,
    key: id
  }
  if (error) {
    formGroupProps.validationState = 'error'
  }
  return <FormGroup {...formGroupProps}>
    <Col componentClass={ControlLabel} sm={colConfig.label}>
      {/*<span className={style.CompleteFieldLabel}>{label}</span>*/}
      <span>{label}</span>
    </Col>
    <Col sm={colConfig.main}>
      {children}
      {!!error && <HelpBlock>{error}</HelpBlock>}
    </Col>
  </FormGroup>
}


/* -----------------------------
  factory for redux form <Filed component={} /> fulfilling
----------------------------- */
export function createFieldComponent ({Cmp = FormControl, fieldProps}) {
  return function ({input: {value, onChange}, meta: {error}, radioOptions}) {
    return <CompleteField error={error} {...fieldProps}>
      {radioOptions && radioOptions.length
        ? radioOptions.map(o =>
            <label key={o.value} className="FieldComponent__radioWrap">
              <Radio
                checked={o.value === value}
                value={o.value}
                onChange={onChange} />
              <span className="FieldComponent__radioWrapLabel">{o.label}</span>
            </label>
          )
        : <Cmp value={value} onChange={onChange} />
      }
    </CompleteField>
  }
}

export function createQuantityManager(mapper) {
  return function ({fields: {map}}) {
    // return <div className={style.FieldSparcer}>
    return <div>
      {map(mapper)}
    </div>
  }
}
