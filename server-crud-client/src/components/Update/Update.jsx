// import React from 'react';

import { Link, useLoaderData } from "react-router-dom";

const Update = () => {
    const loadedUsers = useLoaderData()
    const handleUpdate = (event) => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const user = {name , email}
        fetch(`http://localhost:5000/users/${loadedUsers._id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount> 0){
                alert('data has been updated')
            }
        })
    }
  return (
    <div>
        <Link to='/'><button>Home</button></Link>
        <Link to='/users'><button>Users</button></Link>
        <h1>Update User</h1>
        <h3>Update Details Of: {loadedUsers.name}</h3>
      <form onSubmit={handleUpdate}>
         <input type="text" defaultValue={loadedUsers.name} name="name" id="" />
         <input type="email" defaultValue={loadedUsers.email} name="email" id="" />
         <input type="submit" value="update" />
      </form>
    </div>
  );
};

export default Update;
