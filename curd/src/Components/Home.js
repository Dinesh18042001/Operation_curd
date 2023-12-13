import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    readuser()
  }, []);

  const readuser=()=>{
    axios.get("http://localhost:3000/User")
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }
  const deleteuser=(id)=>{
    fetch(`http://localhost:3000/User/${id}`,{
      method:"DELETE"
    }).then((res)=>{
      res.json().then((result)=>{
        console.log(result);
        readuser()
      }).catch((err)=>{
        console.log(err);
      })
    })
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <Link to="/create" className='btn btn-primary'>Add +</Link>
        <table className='table'>
          <thead>
            <tr>
            <th>S.no</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user,i) => (
              <tr key={i}>
                <td>{++i}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                <Link className='btn btn-danger me-2' onClick={()=>deleteuser(user.id)}>Delete</Link>
                <Link className='btn btn-success me-2' to={`/update/${user.id}`}>Edit</Link>
                <Link className='btn btn-warning' to={`/view/${user.id}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};


export default Home;

