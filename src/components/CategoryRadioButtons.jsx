import React from 'react'
import Form from 'react-bootstrap/Form';

function CategoryRadioButtons() {
  return (
    <Form>
      {['radio'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
          <Form.Check 
            type={type}
            label={` Electronics`}
            id={`Electronics`}
            name="group1"
          />
          <Form.Check
            type={type}
            label={` Clothing`}
            id={`Clothing`}
            name="group1"
          />
          <Form.Check
            type={type}
            label={` Accessories`}
            id={`Accessories`}
            name="group1"
          />
          <Form.Check
            type={type}
            label={` Sporting Gear`}
            id={`Sporting Gear`}
            name="group1"
          />
          <Form.Check
            type={type}
            label={` Academic Supplies`}
            id={`Academic Supplies`}
            name="group1"
          />
          <Form.Check
            type={type}
            label={` Miscellaneous`}
            id={`Miscellaneous`}
            name="group1"
          />
        </div>
      ))}
      
    </Form>
  );
}

export default CategoryRadioButtons;