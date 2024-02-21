import Header from './Header'
import React, { useState } from 'react';
function AddProduct() {
    let [name, setname] = useState("")
    let [file, setfile] = useState("")
    let [price, setprice] = useState("")
    let [description, setdescription] = useState("")
    async function AddProduct() {
        
        let formdata = new FormData();
        formdata.append("file", file)
        formdata.append("name", name)
        formdata.append("price", price)
        formdata.append("description", description)
        let result = await fetch("http://localhost:8000/api/addproduct", {
            method: 'POST',
            body: formdata
        });
        alert("data has been saved")
    }
    return (
        <div>
            <Header />
            <h1>Add Product</h1>
            <div className="col-sm-6 offset-sm-3" >
                <input type="text" placeholder="name" onChange={(e) => setname(e.target.value)} className="form-control" />
                <br />
                <input type="file" placeholder='file' onChange={(e) => setfile(e.target.files[0])} className="form-control" />
                <br />
                <input type="text" placeholder="price" onChange={(e) => setprice(e.target.value)} className="form-control" />
                <br />
                <input type="text" placeholder="description" onChange={(e) => setdescription(e.target.value)} className="form-control" />
                <br />
                <button onClick={AddProduct} className="btn btn-primary">Add Product</button>
            </div>
        </div>
    )
}
export default AddProduct;