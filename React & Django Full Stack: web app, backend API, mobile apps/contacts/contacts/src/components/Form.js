import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import get from 'lodash.get';
import set from 'lodash.set';
import merge from 'lodash.merge';

import { API } from '../api-service';

const FormInputElement = ({ id, label, type = 'text', onChange, value }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <br />
      <input id={id} name={id} type={type} value={value} onChange={onChange} />
    </>
  );
};

function Form(props) {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const mergeIntoData = newData => {
    setData(prevData => merge(prevData, newData));
  };

  const handleChange = event => {
    const { name, value } = event.target;
    const dataToMerge = set({}, name, value);
    mergeIntoData(dataToMerge);
  };

  const handleCreateClick = () => {
    API.createUser(data)
      .then(response => {})
      .catch(error => console.error(error));
  };

  const isDisabled = !data;

  return (
    <div
      style={{
        padding: '2rem',
      }}
    >
      <FormInputElement
        id="username"
        label="Username"
        onChange={handleChange}
      />
      <br />
      <FormInputElement
        id="first_name"
        label="First name"
        onChange={handleChange}
      />
      <FormInputElement
        id="last_name"
        label="Last name"
        onChange={handleChange}
      />
      <FormInputElement
        id="contact_1.email_1"
        label="Email"
        onChange={handleChange}
      />
      <FormInputElement
        id="contact_1.phone_1"
        label="Phone"
        onChange={handleChange}
      />
      <FormInputElement
        id="contact_1.address_one"
        label="Address one"
        onChange={handleChange}
      />
      <FormInputElement
        id="contact_1.address_two"
        label="Address two"
        onChange={handleChange}
      />
      <FormInputElement
        id="contact_1.post_code"
        label="Postcode"
        onChange={handleChange}
      />
      <FormInputElement
        id="contact_1.city"
        label="City"
        onChange={handleChange}
      />
      <br />
      <button onClick={handleCreateClick} disabled={isDisabled}>
        Create
      </button>
    </div>
  );
}

export default Form;
