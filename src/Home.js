import Header from './Header';
import Table from 'react-bootstrap/Table';
import React,{useState,UseEffect, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Home() {
    const [data,setData]=useState([]);
    // useEffect(()=>{
    //     (async ()=>{
    //         let result=await fetch('http://127.0.0.1:8000/api/productList');
    //         result=await result.json();
    //         setData(result);
    //     })();
    // },[])
    useEffect(()=>{
        getData();
    },[])
   async function deleteOperation(id){
        let result=await fetch('http://127.0.0.1:8000/api/delete/'+id,{
            method:'DELETE'
        });
        result=await result.json();
        getData();
    }
    async function getData(){
        let result=await fetch('http://127.0.0.1:8000/api/productList');
        result=await result.json();
        setData(result);
    }
    return (<>
        <Header />
        <div className="col-sm-8 offset-2">
            <h1>Products List</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index)=>
                        <tr>
                            <td>{(index)+1}</td>
                            <td>{item.name}</td>
                            <td> {item.description}</td>
                            <td>{item.price}</td>
                            <td><img src={"http://127.0.0.1:8000/"+item.file_path} width="80" alt={item.name}/></td>
                            <td>
                               <Link to={'/update/'+item.id}><span className="edit">Edit </span></Link>
                                <span onClick={()=>{deleteOperation(item.id)}} className="delete">Delete</span>                            
                            </td>
                        </tr>)
                    }
                </tbody>
            </Table>

        </div>

    </>);

}
export default Home;