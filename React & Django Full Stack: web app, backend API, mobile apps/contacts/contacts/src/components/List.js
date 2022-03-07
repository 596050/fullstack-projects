import React from 'react';
import { API } from '../api-service';

function List(props) {
  const handleRemove = item => {
    props.onRemove(item);
  };

  console.log('List props:', props);

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
