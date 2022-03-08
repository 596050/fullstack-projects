import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import List from './components/List';
import { useFetch } from './hooks/useFetch';
import { API } from './api-service';

function App() {
  const [users, setUsers] = useState([]);
  const [data, loading, error] = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    setUsers(data);
  }, [data]);

  const handleOnCreateNewUser = () => {
    navigate('/create-user');
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
    <main className="App">
      <header className="App-header">
        <h1>
          <span>Contacts</span>
        </h1>
      </header>
      <br />
      <div className="create-user-button-container">
        <button className="create-user-button" onClick={handleOnCreateNewUser}>
          Create user
        </button>
      </div>
      <br />
      <div>
        <List users={users} onRemove={handleRemove} />
      </div>
    </main>
  );
}

export default App;
