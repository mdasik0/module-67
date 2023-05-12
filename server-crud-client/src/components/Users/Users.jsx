// import React from 'react';
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const [Uzer, setUzer] = useState([]);
  const LoadedUsers = useLoaderData();
  useEffect(() => {
    setUzer(LoadedUsers);
  }, []);

  const deleteUser = (_id) => {
    fetch(`http://localhost:5000/users/${_id}`, {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("User has been deleted succesfully");
          const remaining = Uzer.filter((user) => user._id != _id);
          setUzer(remaining);
        }
      });
  };

  // const {_id,email,name} = user;
  return (
    <div>
      <Link to="/"><button>Home</button></Link>
      <h2>All Users Here : {Uzer.length}</h2>
      <div>
        {Uzer.map((user) => (
          <p key={user._id}>
            {user.name} : {user.email}
            <Link to={`/update/${user._id}`}>
              <button>update</button>
            </Link>
            <button onClick={() => deleteUser(user._id)}>x</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
