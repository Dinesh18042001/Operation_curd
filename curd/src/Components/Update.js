import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    readuser();
  }, []);

  const readuser = () => {
    axios.get(`http://localhost:3000/User/${id}`)
      .then(res => {
        setData(res.data);
        setName(res.data.name);
        setAge(res.data.age);
        setEmail(res.data.email);
      })
      .catch(err => console.log(err));
  };

  function updateuser(e) {
    e.preventDefault();
    const d = { name, age, email };

    fetch(`http://localhost:3000/User/${id}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(d)
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        navigate("/");
      });
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form>
          <h1 className='text-center'>Update User</h1>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age</label>
            <input
              type="text"
              className="form-control"
              placeholder='Enter age'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={updateuser}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
