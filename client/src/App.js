import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'

import UserList from './components/UserList'
import UserPage from './components/UserPage'

function App() {
  const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/users')
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

  return (
    <div>
      <Route exact path='/' render={() => <UserList users={users} />} />
      <Route exact path='/:id' render={() => <UserPage />} />
    </div>
  );
}

export default App