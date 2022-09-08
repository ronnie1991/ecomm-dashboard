import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from './Header';
import {useParams} from 'react-router-dom';
import {useEffect,useState} from 'react';
function UpdateProduct(props){
    const params = useParams();
    const [data,setData]=useState([]);

    const [productName,setProductName]=useState("");
    const [price,setPrice]=useState("");
    const [filePath,setFilePath]=useState("");
    const [description,setDescription]=useState("");  
    useEffect(()=>{
       (async ()=>{
        let result= await fetch('http://127.0.0.1:8000/api/product/'+params.id);
        result=await result.json();
        setData(result);
        setFilePath(result.filePath);
        setProductName(result.productName);
        setPrice(result.price);
        setDescription(result,description);
       })();
    },[])
    async function editeProduct(id){
        const formData=new FormData(); 
        formData.append("filePath",filePath);
        formData.append("productName",productName);
        formData.append("price",price);
        formData.append("description",description);
        let result=await fetch("http://127.0.0.1:8000/api/updateProduct/"+id+"?_method=PUT",{
            method:"post",           
            body:formData,
        });
        console.warn(result);
    }
    return(
        <>
            <Header/>        
            <div className="col-sm-6 offset-3">
                <h4>Update Product Page</h4>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setProductName(e.target.value)} defaultValue={data.name} placeholder="Enter Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setPrice(e.target.value)}  defaultValue={data.price} placeholder="Enter Price" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" onChange={(e)=>setDescription(e.target.value)} row={2} defaultValue={data.description} placeholder="Enter Description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicProductImage">
                        <Form.Label>Product Image</Form.Label>
                        <img src={"http://127.0.0.1:8000/"+data.file_path} width="100" />
                        <Form.Control type="file" onChange={(e)=>setFilePath(e.target.files[0])}  defaultValue={data.file_path} placeholder="Enter Product Image" />
                    </Form.Group>
                    <Button variant="primary" onClick={()=>{editeProduct(data.id)}} >
                        Update
                    </Button>
                    </Form>
            </div>
        </>
    );

}
export default (UpdateProduct);