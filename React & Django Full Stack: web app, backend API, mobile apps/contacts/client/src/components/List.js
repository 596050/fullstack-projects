import React from 'react';

function List(props) {
  const handleRemove = item => {
    props.onRemove(item);
  };

  return (
    <div className="layout">
      {props.users &&
        props.users.map(user => {
          return (
            <div key={user.id} className="item">
              <div>
                <h2>{user.username}</h2>
                <p>first name: {user.first_name}</p>
                <p>last name: {user.last_name}</p>
                <p>email: {`${user.contact_1?.email_1}`}</p>
                <p>phone: {`${user.contact_1?.phone_1}`}</p>
              </div>
              <button onClick={() => handleRemove(user)}>Remove</button>
            </div>
          );
        })}
    </div>
  );
}

export default List;
