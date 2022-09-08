import React,{useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Register.css';
import Header from './Header';
import {useNavigate } from 'react-router-dom';

function Register() {
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate('/add');
        }        
    },[]);

    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");

    async function singUp(){
        let item={name,password,email};
       let result=await fetch("http://127.0.0.1:8000/api/register",{
            method:"post",
            headers:{
                'Content-Type':'application/json',
                "Accept":"application/json"
            },
            body:JSON.stringify(item)

        });
        result=await result.json(item);
        localStorage.setItem('user-info',JSON.stringify(result));
        navigate("/add");
    }

    return (
        <>
        <Header/>
        <div className="col-sm-4 offset-4">
            <h1>User Sign Up</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter email" />
                </Form.Group>
                <Button variant="primary" onClick={singUp}>
                    Sing UP
                </Button>
            </Form>
        </div>
        </>
    );

}
export default Register;