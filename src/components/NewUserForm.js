'use strict'
import { Component } from 'jumpsuit'
import _ from 'lodash'
import { reduxForm, Field } from 'redux-form'
import * as fh from 'etc/formHelpers'
import {Button} from 'react-bootstrap'

const fields = ['firstName', 'lastName', 'phone', 'gender', 'age']
const fieldsLabels = ['First Name', 'Last Name', 'Phone', 'Gender', 'Age']
const valid = {
  string: (x) => !_.isEmpty(x),
  age: (x) => x <= 0 || x >= 125
}

const validate = (fieldData) => {
  const errors = {}
  if (!valid.age(fieldData.age)) errors.age = `Invalid age`
  fields.forEach(field => {
    if (!valid.string(fieldData[field])) 
      errors[field] = "This field is required"
  })
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
    const { fields, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        {fields.map((field, idx) =>
          <Field key={field} name={field} component={this.fieldComponents[idx]} />
        )}
        <Button type="submit" bsStyle="primary">Add new user</Button>
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
