import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


function Login() {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const navigate=useNavigate()


    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/login',{email,password})
        .then(result=>{ 
            console.log(result)
            if(result.data === "success"){
                navigate('/home')
            }

            navigate('/home')
        })
        .catch(err=> console.log(err))
    }


    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0 mb-2">
                        login
                    </button>
                    </form>
                    {/* <p>Already have an account?</p>
                    <Link to="/login" className="btn btn-outline-secondary w-100 rounded-0">
                        Login
                    </Link> */}

            </div>
        </div>
    );
}

export default Login;
