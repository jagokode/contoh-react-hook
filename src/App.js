import React, { useState, Fragment } from 'react';
import UserTable from './tables/UserTable';
import EditUserForm from './forms/EditUserForm';
import AddUserForm from './forms/AddUserForm';

const App = () => {
  // setting inital datas
  const usersData = [
    { id: 1, name: 'Aqua', username: 'aquaman' },
    { id: 2, name: 'Iron', username: 'ironman' },
    { id: 3, name: 'Sand', username: 'Sandman' }
  ];

  const initialFormState = {
    id: null,
    name: '',
    username: ''
  };

  // Setting state
  const [users, setUsers] = useState(usersData);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);

  // CRUD operations
  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = id => {
    setEditing(false);
    setUsers(users.filter(user => user.id !== id));
  };

  const updateUser = (id, updateUser) => {
    setEditing(false);

    setUsers(users.map(user => (user.id === id ? updateUser : user)));
  };

  const editRow = user => {
    setEditing(true);

    setCurrentUser({
      id: user.id,
      name: user.name,
      username: user.username
    });
  };

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h3>Edit User</h3>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          <h2>List of users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </div>
    </div>
  );
};

export default App;
