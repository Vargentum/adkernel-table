'use strict'
import { Component } from 'jumpsuit'
import _ from 'lodash'
import { reduxForm, Field } from 'redux-form'
import * as fh from 'etc/formHelpers'
import {Button} from 'react-bootstrap'

export const fields = ['firstName', 'lastName', 'phone', 'gender', 'age']
export const fieldsLabels = ['First Name', 'Last Name', 'Phone', 'Gender', 'Age']
const valid = {
  name: (x) => !_.isEmpty(x),
  number: (x) => _.isNumber(Number(x)) && !_.isNaN(Number(x)),
  age: (x) => x >= 0 || x <= 125
}

const GENDERS = ['female', 'male']

const validate = (fieldData) => {
  const errors = {}
  if (!valid.name(fieldData.firstName)) errors.firstName = `Should be filled`
  if (!valid.name(fieldData.gender)) errors.gender = `Should be filled`
  if (!valid.number(fieldData.phone)) errors.phone = `Should be a number`
  if (!valid.age(fieldData.age)) errors.age = `Invalid age`
  if (!valid.number(fieldData.age)) errors.age = `Should be a number`
  return errors
}

let NewUserForm = Component({
  componentWillMount () {
    this.fieldComponents = this.props.fields.map(this.createFieldComponent)
  },
  createFieldComponent(field, idx) {
    return fh.createFieldComponent({
      fieldProps: {
        id: field,
        label: fieldsLabels[idx]
      }
    })
  },
  render() {
    const { fields, handleSubmit, valid, submitting } = this.props
    return (
      <form onSubmit={handleSubmit} className="NewUserForm">
        {fields.map((field, idx) =>
          <Field key={field} name={field} component={this.fieldComponents[idx]}
            radioOptions={field === 'gender' ? GENDERS.map(g => ({label: g, value: g})) : null} />
        )}
        <Button
          type="submit"
          bsStyle="primary"
          bsSize="lg"
          className="NewUserForm__submit"
          disabled={!valid || submitting}
          active={submitting}>Add new user</Button>
      </form>
    )
  }
})
NewUserForm.defaultProps = {
  fields: {}
}
NewUserForm = reduxForm({
  form: 'NewUser',
  fields,
  validate
})(NewUserForm)

export default NewUserForm
