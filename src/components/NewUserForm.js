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
  age: (x) => x >= 0 || x <= 125
}

const validate = (fieldData) => {
  const errors = {}
  if (!valid.name(fieldData.firstName)) errors.firstName = `Invalid field`
  if (!valid.name(fieldData.lastName)) errors.lastName = `Invalid field`
  if (!valid.age(fieldData.age)) errors.age = `Invalid age`
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
      <form onSubmit={handleSubmit}>
        {fields.map((field, idx) =>
          <Field key={field} name={field} component={this.fieldComponents[idx]} />
        )}
        <Button 
          type="submit" 
          bsStyle="primary" 
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
