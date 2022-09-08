import Header from './Header';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
function SearchProduct() {
    const [data, setData] = useState([]);
    async function searchProductResult(key) {
        if (key.length >= 2) {
            let result = await fetch('http://127.0.0.1:8000/api/search/' + key);
            result = await result.json();
            setData(result);
        }
    }
    return (<>
        <Header />
        <div className="col-sm-8 offset-2">
            <h3>Search Product</h3>
            <input type="text" onChange={(e) => searchProductResult(e.target.value)} placeholder="Product Name To Search" />
            {
            data.length>0?
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Descriptio</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td><img src={"http://127.0.0.1:8000/" + item.file_path} width="100" alt={item.name} /></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            :
            null
            }
        </div>


    </>);
}
export default SearchProduct;