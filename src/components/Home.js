import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    const history = useNavigate();
    
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        date: "",
        password: ""
    })

    const bounce = cssTransition({
        enter: "animate__animated",
        exit: "animate__animated animate__bounceOut"
      });
      

    //Storing input data
    const [data, setData] = useState([]);
    console.log(input);


    //Read input data
    const getdata = (event) => {
        // console.log(event.target.value);


        const { value, name } = event.target;
        //console.log(value, name);


        setInput(() => {
            return {
                ...input,
                [name]: value
            }
        })

    }

    //Input Validation

    const DataSubmit = (event) => {
        event.preventDefault();

        const { firstname, lastname, email, username, date, password } = input;

        // Check password validity

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


        if (firstname === "") {
            toast.error('Please enter your first name!', {
                position: "top-center",
                transition: bounce
            });
        }
        else if (lastname === "") {
            toast.error('Please enter your last or family name!', {
                position: "top-center",
                transition: bounce
            });
        } else if (email === "") {
            toast.error('We need your email ID to register!', {
                position: "top-center",
                transition: bounce
            });
        } else if (!email.includes("@")) {
            toast.error('Please enter a valid email address', {
                position: "top-center",
                transition: bounce
            });
        } else if (date === "") {
            toast.error('Please enter your birth date. We promise we wont tell', {
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
            console.log("User registration accepted");

            history("/login")

            //Store and Stringify input data in Local Storage
            localStorage.setItem("userkey", JSON.stringify([...data, input]));
        }
    }

    return (
        <>
            <div className="container mt-6">
                <section className='d-flex justify-content-between'>
                    <div className="mt-4 p-3" style={{ width: "50%", marginLeft: '35%' }}>
                        <h4 className='text-center col-lg-8 text-monospace font-weight-bold mb-3'>Register with us</h4>
                        <Form >
                            <Form.Group className="mb-3 col-lg-8" controlId="formFirstName">

                                <Form.Control type="text" name='firstname' onChange={getdata} placeholder="Enter Your First Name" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-8" controlId="formLastName">

                                <Form.Control type="text" name='lastname' onChange={getdata} placeholder="Enter Your Last Name" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-8" controlId="formBasicEmail">

                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-8" controlId="formUserName">

                                <Form.Control type="text" name='username' onChange={getdata} placeholder="Pick out a Username" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-8" controlId="formPassword">

                                <Form.Control onChange={getdata} name='date' type="date" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-8" controlId="formBasicPassword">

                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Set a Password" />
                            </Form.Group>
                            <Button variant="primary" className='col-lg-6' onClick={DataSubmit} style={{ background: "maroon", width: '20%' }} type="submit">
                                Submit
                            </Button>
                        </Form>
                        <p className='mt-3'>Already submitted your deets? <span><NavLink to="/login" style={{ color: "maroon" }}>Join in the fun!</NavLink></span> </p>
                    </div>
                </section>
                <ToastContainer />
            </div>
        </>
    )
}

export default Signup