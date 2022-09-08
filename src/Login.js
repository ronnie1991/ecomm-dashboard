import React,{useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from './Header';

function Login(){
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate('/add');
        }
    },[]);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    async function login(){
        let item={email,password};
        let result= await fetch("http://127.0.0.1:8000/api/login",
        {
            method:"post",
            headers:{
                'Content-Type':'application/json',
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        },[]);
        result=await result.json();
        if(!result.error){
            localStorage.setItem('user-info',JSON.stringify(result));
            navigate('/add');
        }
        else{
            navigate('/login');
            console.warn(result.error[0]);
        }
        
 


    }

    return (        
        <>
        <Header/>
        <div className="col-sm-4 offset-4">
            <h1>Login </h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
                </Form.Group>
                <Button variant="primary" onClick={login} >
                    Sing-In
                </Button>
            </Form>
        </div>
        </>
    );

}
export default Login;