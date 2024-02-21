import React, { useEffect, useState } from "react";
import Header from './Header'
import { useNavigate } from 'react-router-dom'
function Register() {
    let history = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history('/add')
        }
    })
    let [name, setname] = useState("")
    let [password, setpassword] = useState("")
    let [email, setemail] = useState("")
    async function signUp() {
        let item = { name, password, email };
        console.log(item);

        try {
            let result = await fetch("http://localhost:8000/api/register", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });

            // Check if the response is successful (status code in the range 200-299)
            if (!result.ok) {
                throw new Error(`HTTP error! Status: ${result.status}`);
            }

            // Parse the response JSON data
            result = await result.json();
            console.log("result", result);

            // Save user info to local storage
            localStorage.setItem("user-info", JSON.stringify(result));

            // Navigate to '/add'
            history('/add');
        } catch (error) {
            console.error("Error during registration:", error);
            // Handle the error (e.g., display an error message to the user)
        }
    }
    return (
        <>
            <Header />
            <div className="col-sm-6 offset-sm-3" >
                <h1>Sign Up Page</h1>
                <input type="text" value={name} placeholder="name" onChange={(e) => setname(e.target.value)} className="form-control" />
                <br />
                <input type="text" value={email} placeholder="email" onChange={(e) => setemail(e.target.value)} className="form-control" />
                <br />
                <input type="text" value={password} placeholder="password" onChange={(e) => setpassword(e.target.value)} className="form-control" />
                <br />
                <button onClick={signUp} className="btn btn-primary"> Sign Up</button>
            </div>
        </>
    )
}
export default Register;