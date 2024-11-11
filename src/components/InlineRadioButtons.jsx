import React from 'react'

const InlineRadioButtons = () => {
  return (
    <Form>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="Lost"
            name="group1"
            type={type}
            id={`Lost`}
          />
          <Form.Check
            inline
            label="2"
            name="group1"
            type={type}
            id={`Found`}
          />
        </div>
      ))}
    </Form>
  )
}

export default InlineRadioButtons