import React,{useEffect,useState} from "react";
import Header from './Header'
import {useNavigate} from 'react-router-dom'
function Login() {
    let history = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            history('/add')
        }
    })
let [email, setemail] = useState("")
let [password, setpassword] = useState("")
async function login() {
    
 let item = {email,password}
    try {
        let result = await fetch("http://localhost:8000/api/login", {
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
        <div >
            <Header/>
            <h1>Login Page</h1>
            <div className="col-sm-6 offset-sm-3" >
                <input type="email" value={email} placeholder="email" onChange={(e) => setemail(e.target.value)} className="form-control" />
                <br />
                <input type="password" value={password} placeholder="password" onChange={(e) => setpassword(e.target.value)} className="form-control" />
                <br />
                <button onClick={login} className="btn btn-primary"> Login </button>
            </div>
        </div>
    )
}
export default Login;