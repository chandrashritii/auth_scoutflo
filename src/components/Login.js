import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const history = useNavigate();

    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const [data, setData] = useState([]);
    console.log(input);

    const bounce = cssTransition({
        enter: "animate__animated",
        exit: "animate__animated animate__bounceOut"
    });

    const getdata = (e) => {
        // console.log(e.target.value);


        const { value, name } = e.target;
        // console.log(value,name);


        setInput(() => {
            return {
                ...input,
                [name]: value
            }
        })

    }

    const DataSubmit = (e) => {
        e.preventDefault();

        //Access local storage
        const getUserReg = localStorage.getItem("userkey");
        console.log(getUserReg);


        const { email, password } = input;
        let upper_count = 0;
        let lower_count = 0;
        let number_count = 0;
        let symbol_count = 0

        for (let i = 0; i < password.length; i++) {
            let c = password.charAt(i);

            if ('A' <= c && c <= 'Z') {
                upper_count += 1;
            } else if ('a' <= c && c <= 'z') {
                lower_count += 1;
            } else if ('0' <= c && c <= '9') {
                number_count += 1;
            } else {
                symbol_count += 1;
            }
        }

        if (email === "") {
            toast.error('We need your email ID to register!', {
                position: "top-center",
                transition: bounce
            });
        } else if (!email.includes("@")) {
            toast.error('Please enter a valid email address', {
                position: "top-center",
                transition: bounce
            });
        } else if (password === "") {
            toast.error('Please enter a valid password', {
                position: "top-center",
                transition: bounce
            });
        } else if (password.length < 3) {
            toast.error('Password length must be greater than 3 digits', {
                position: "top-center",
                transition: bounce
            });
        } else if (upper_count < 1) {
            toast.error('Password must contain atleast 1 Upper Case letter', {
                position: "top-center",
                transition: bounce
            });
        } else if (lower_count < 1) {
            toast.error('Password must contain atleast 1 Lower Case letter', {
                position: "top-center",
                transition: bounce
            });
        } else if (symbol_count < 1) {
            toast.error('Password must contain atleast 1 alphanumeric character', {
                position: "top-center",
                transition: bounce
            });
        } else {

            //Check if user input matches with local storage
            if (getUserReg && getUserReg.length) {
                const userdata = JSON.parse(getUserReg);
                const logininput = userdata.filter((el, k) => {
                    return el.email === email && el.password === password
                });
                //console.log(logininput);

                if (logininput.length === 0) {
                    alert("Details do not match.")
                } else {
                    console.log("Login successful!");

                    //Store Login data
                    localStorage.setItem("user_login", JSON.stringify(logininput))

                    history("/dashboard")
                }
            }
        }

    }

    return (
        <>
            <div className="container mt-6">
                <section className='d-flex justify-content-between'>
                    <div className="mt-4 p-3" style={{ width: "50%", marginLeft: '35%' }}>
                        <h3 className='text-center col-lg-8'>Join the fun!</h3>
                        <Form >

                            <Form.Group className="mb-3 col-lg-8" controlId="formBasicEmail">

                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-8" controlId="formBasicPassword">

                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" className='col-lg-2' onClick={DataSubmit} style={{ background: "maroon" }} type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </section>
                <ToastContainer />
            </div>
        </>
    )
}

export default Login