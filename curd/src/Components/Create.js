import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {

  const [name,setname]=useState("");
  const [age,setage]=useState("");
  const [email,setemail]=useState("");
  const navigate= useNavigate()

  function createuser(e) {

    console.log(name,age,email);
    const d={name,age,email}
    e.preventDefault();
    fetch("http://localhost:3000/User",{
      method:"POST",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(d)
    }).then((res)=>{
      res.json().then((result)=>{
        console.log(result);
        navigate("/")
      
      })
      
    })
  }
  return(

    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
      <form>
        <h1 className='text-center'>Create User</h1>
    <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="email" class="form-control" placeholder='Enter Name'
     value={name} onChange={(e)=>setname(e.target.value)}/>
  </div>

  <div class="mb-3">
    <label for="exampleInputEmail1" aria-describedby="emailHelp"class="form-label">Email address</label>
    <input type="email" class="form-control" placeholder='Enter Email' value={email} onChange={(e)=>setemail(e.target.value)}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Age</label>
    <input type="text" class="form-control"  placeholder='Enter age' value={age} onChange={(e)=>setage(e.target.value)}/>
  </div>
  <Link type="button" class="btn btn-primary" onClick={createuser}>Submit</Link>
</form>
       
      </div>
    </div>
  )
}

export default Create;