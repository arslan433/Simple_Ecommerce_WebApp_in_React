import { useState } from "react";
import Header from "./Header";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
function SearchComponent() {
    let [data, setdata] = useState([])
    async function search(key) {
        let result = await fetch("http://localhost:8000/api/search/" + key)
        result = await result.json();
        console.log(result)
        setdata(result)
    }
        async function deleteOperation(id) {
            let result = await fetch("http://localhost:8000/api/delete/" + id, {
                method: "DELETE"
            });
            result = await result.json();
            console.log(result);
    }
    return (
        <div>
            <Header />
            <h1>Search Page</h1>
            <br />
            <input type="text" onChange={(e) => search(e.target.value)} placeholder="Search Product" />
            <div>
                {
                    data.length > 0 ?
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
                        : null
                }
            </div>

        </div>
    )
}
export default SearchComponent;