import React from 'react'
import { Link } from 'react-router-dom'

const UserList = props => {
    return (
        <div>
            {props.users.map(user => (
                <div key={user.id}>
                    <Link to={`/${user.id}`}>{user.name}</Link>
                </div>
            ))}
        </div>
    )
}

export default UserList