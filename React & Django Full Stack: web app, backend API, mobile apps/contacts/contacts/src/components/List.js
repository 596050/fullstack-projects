import React from 'react';

function List(props) {
  const handleRemove = item => {
    props.onRemove(item);
  };

  return (
    <div>
      {props.users &&
        props.users.map(user => {
          return (
            <div key={user.id} className="item">
              <h2>{user.username}</h2>
              <button onClick={() => handleRemove(user)}>Remove</button>
            </div>
          );
        })}
    </div>
  );
}

export default List;
