// UpdateProduct.js

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import './App.css';  // Import your CSS file
import { Button } from 'react-bootstrap';

function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    let [data, setdata] = useState([]);
    let [name, setname] = useState("");
    let [file, setfile] = useState(null);  // Set initial file state to null
    let [price, setprice] = useState("");
    let [description, setdescription] = useState("");

    useEffect(() => {
        Product();
    }, [id]);

    async function Product() {
        try {
            let result = await fetch(`http://localhost:8000/api/product/${id}`);
            result = await result.json();
            setdata(result);
            setname(result.name);
            setprice(result.price);
            setdescription(result.description);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

    async function editProduct(id) {
        try {
            let formdata = new FormData();
            formdata.append("file", file);
            formdata.append("name", name);
            formdata.append("price", price);
            formdata.append("description", description);

            let result = await fetch(`http://localhost:8000/api/updateproduct/${id}?_method=PUT`, {
                method: 'POST',
                body: formdata,
            });

            if (result.ok) {
                alert("Data has been updated");
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

    return (
        <div className="container">
            <Header />
            <h1>Update Product</h1>
            <div className="input-container">
                <label htmlFor="productName">Product Name:</label>
                <input type="text" onChange={(e) => setname(e.target.value)} id="productName" value={name} />
            </div>
            <div className="input-container">
                <label htmlFor="productPrice">Price:</label>
                <input type="text" onChange={(e) => setprice(e.target.value)} id="productPrice" value={price} />
            </div>
            <div className="input-container">
                <label htmlFor="productDescription">Description:</label>
                <input type="text" onChange={(e) => setdescription(e.target.value)} id="productDescription" value={description} />
            </div>
            <div className="input-container">
                <label htmlFor="productImage">Upload Image:</label>
                <input type="file" onChange={(e) => setfile(e.target.files[0])} id="productImage" />
            </div>
            <img className="product-image" alt='Product img' src={'http://localhost:8000/' + data.file_path} />
            <Button onClick={() => editProduct(data.id)}> Update Product</Button>
        </div>
    );
}

export default UpdateProduct;
