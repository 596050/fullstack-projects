import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import List from './components/List';
import Form from './components/Form';
import { useFetch } from './hooks/useFetch';
import { API } from './api-service';

function App() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [data, loading, error] = useFetch();
  const navigate = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    console.log('location', location);
  }, [location]);

  useEffect(() => {
    setUsers(data);
  }, [data]);

  const handleOnCreateNewUser = () => {
    navigate('/create-user', { replace: true });
  };

  const handleCreate = user => {
    API.createUser(user)
      .then(newUser => {
        const newUsers = [...users, newUser];
        setUsers(newUsers);
      })
      .catch(error => console.error(error));
  };

  const handleRemove = user => {
    API.deleteUser(user.id)
      .then(() => {
        const newItems = users.filter(item => item.id !== user.id);
        setUsers(newItems);
      })
      .catch(error => console.error(error));
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <span>Contacts</span>
        </h1>
      </header>
      <div className="layout">
        <div>
          <List users={users} onRemove={handleRemove} />
        </div>
      </div>
      <div className="create-user-button-container">
        <button className="create-user-button" onClick={handleOnCreateNewUser}>
          Create user
        </button>
      </div>
    </div>
  );
}

export default App;
