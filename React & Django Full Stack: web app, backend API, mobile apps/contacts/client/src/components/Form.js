import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const formMetaData = [
  { id: 'username', label: 'Username' },
  { id: 'first_name', label: 'First name' },
  { id: 'last_name', label: 'Last name' },
  { id: 'contact_1.email_1', label: 'Email' },
  { id: 'contact_1.phone_1', label: 'Phone' },
  { id: 'contact_1.address_one', label: 'Address one' },
  { id: 'contact_1.address_two', label: 'Address two' },
  { id: 'contact_1.post_code', label: 'Postcode' },
  { id: 'contact_1.city', label: 'City' },
];

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
      .then(response => {
        navigate('/');
      })
      .catch(error => console.error(error));
  };

  const isDisabled = !data;

  return (
    <div
      style={{
        padding: '2rem',
      }}
    >
      <h1>Create user</h1>
      <br />
      {formMetaData.map(({ id, label }) => (
        <FormInputElement
          key={id}
          id={id}
          label={label}
          onChange={handleChange}
        />
      ))}

      <br />
      <button onClick={handleCreateClick} disabled={isDisabled}>
        Create
      </button>
    </div>
  );
}

export default Form;
