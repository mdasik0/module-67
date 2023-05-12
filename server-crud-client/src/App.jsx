import { Link } from 'react-router-dom';
import './App.css'

function App() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value
    const user = {name,email}
    console.log(user)
    fetch('http://localhost:5000/users',{
      method: 'post',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      if(data.insertedId){
        alert('New Data has been added')
        console.log(data)
        form.reset()
      }
    })
  }

  return (
    <>
     
      <Link to='/users'><button>Go to users</button></Link>
      <h1>SIMPLE CRUD CLIENT</h1>
      <h3>Create new User</h3>
      <form onSubmit={handleSubmit} >
        <input required type="name" name='name' /> <br />
        <input required type="email" name='email' /> <br />
        <input type="submit" value="Add user" />
      </form>
      
      
    </>
  )
}

export default App
