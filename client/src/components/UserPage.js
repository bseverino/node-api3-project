import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const UserPage = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/users/${id}`)
            .then(res => {
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(`http://localhost:4000/api/users/${id}/posts`)
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    return (
        <div>
            {user && (
                <div key={user.id}>
                    <h2>{user.name}</h2>
                    {posts.map(post => (
                        <div key={post.id}>
                            <p>"{post.text}"</p>
                        </div>
                    ))}
                </div>
            )}
            <Link to='/'>Return</Link>
        </div>
    )
}

export default UserPage