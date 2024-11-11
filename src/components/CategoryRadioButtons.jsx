import React from 'react'
import Form from 'react-bootstrap/Form';

function CategoryRadioButtons() {
  return (
    <Form>
      {['radio'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
          <Form.Check 
            type={type}
            label="Electronics"
            id="Electronics"
            name="group1"
            style={{ color: '#011F5B', borderColor: '#011F5B' }}
            labelStyle={{ marginLeft: '10px' }}
          />
          <Form.Check
            type={type}
            label="Clothing"
            id="Clothing"
            name="group1"
            style={{ color: '#011F5B', borderColor: '#011F5B' }}
            labelStyle={{ marginLeft: '10px' }}
          />
          <Form.Check
            type={type}
            label="Accessories"
            id="Accessories"
            name="group1"
            style={{ color: '#011F5B', borderColor: '#011F5B' }}
            labelStyle={{ marginLeft: '10px' }}
          />
          <Form.Check
            type={type}
            label="Sporting Gear"
            id="SportingGear"
            name="group1"
            style={{ color: '#011F5B', borderColor: '#011F5B' }}
            labelStyle={{ marginLeft: '10px' }}
          />
          <Form.Check
            type={type}
            label="Academic Supplies"
            id="AcademicSupplies"
            name="group1"
            style={{ color: '#011F5B', borderColor: '#011F5B' }}
            labelStyle={{ marginLeft: '10px' }}
          />
          <Form.Check
            type={type}
            label="Miscellaneous"
            id="Miscellaneous"
            name="group1"
            style={{ color: '#011F5B', borderColor: '#011F5B' }}
            labelStyle={{ marginLeft: '10px' }}
          />
        </div>
      ))}
    </Form>
  );
}

export default CategoryRadioButtons;