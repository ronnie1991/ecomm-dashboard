import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from './Header';
import {useNavigate} from 'react-router-dom';
function AddProduct(){
    const navigation=useNavigate();
    const [productName,setProductName]=useState("");
    const [price,setPrice]=useState("");
    const [filePath,setFilePath]=useState("");
    const [description,setDescription]=useState("");
    async function addProduct(){
        let item={productName,price,filePath,description};
        const formData=new FormData(); 
        formData.append("filePath",filePath);
        formData.append("productName",productName);
        formData.append("price",price);
        formData.append("description",description);
        let result=await fetch('http://127.0.0.1:8000/api/addProduct',{
            method:"post",           
            body:formData,
        });
        navigation('/');
        

    }
    return(
        <>
            <Header/>
            <div className="col-sm-4 offset-4">
                <h4>Add Product</h4>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicProductName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text"  onChange={(e)=>setProductName(e.target.value)}  placeholder="Enter Product Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setPrice(e.target.value)}  placeholder="Enter Price" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicProductImage">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control type="file" onChange={(e)=>setFilePath(e.target.files[0])}  placeholder="Enter Product Image" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control as="textarea" rows={2}  onChange={(e)=>setDescription(e.target.value)}  placeholder="Enter Product Description" />
                    </Form.Group>                    
                    <Button variant="primary" onClick={addProduct} >
                        Add Product
                    </Button>
                </Form>
            </div>
        </>
    );
}
export default AddProduct;