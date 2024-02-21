import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
function Login(props) {
    let history = useNavigate()

    useEffect(()=>{
        if(!localStorage.getItem('user-info'))
        {
            history('/register')
        }
    })
    let Cmp = props.Cmp
    
    return (
        <div >
            <Cmp/>
        </div>
    )
}
export default Login;