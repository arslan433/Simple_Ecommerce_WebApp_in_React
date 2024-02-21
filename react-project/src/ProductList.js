import { Table } from "react-bootstrap";
import Header from "./Header";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function ProductList() {
    let [data, setdata] = useState([]);
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs once after the initial render
    async function deleteOperation(id) {
        let result = await fetch("http://localhost:8000/api/delete/" + id, {
            method: "DELETE"
        });
        result = await result.json();
        console.log(result);
        fetchData()
    }
    const fetchData = async () => {
        try {
            let result = await fetch('http://localhost:8000/api/list');
            result = await result.json();
            setdata(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <>
            <Header />
            <div className="col-sm-8 offset-sm-2">
                <h1>Products list</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>description</th>
                            <th>Price</th>
                            <th>image</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) =>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td><img alt="Product Pic" style={{ width: "140px" }} src={"http://localhost:8000/" + item.file_path} /></td>
                                    <td><span className="delete" onClick={() => { deleteOperation(item.id) }}>Delete</span>
                                    <Link to={'update/' + item.id} ><span className="update" >Update</span></Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}
export default ProductList;