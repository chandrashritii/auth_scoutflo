import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const [logindata, setLoginData] = useState([]);
    console.log(logindata);
    const history = useNavigate();

    const DisplayDetails = () => {
        const validateuser = localStorage.getItem("user_login");
        if (validateuser && validateuser.length) {
            const user = JSON.parse(validateuser);

            setLoginData(user);
        }
    }

    const userlogout = () => {
        localStorage.removeItem("userloginkey")
        history("/");
    }

    useEffect(() => {
        DisplayDetails();
    }, [])

    return (
        <>
            {
                logindata.length === 0 ? "Error" :
                    <div className="mt-4 p-3" style={{ width: "50%", marginLeft: '35%' }}>
                        <h1>User Info</h1> <br />
                        <h2 className="mt-6">Hey {logindata[0].firstname} {logindata[0].lastname}!</h2>
                        <p className='mt-3'> Here are your details : </p>
                        <h3>Email ID : {logindata[0].email}</h3>
                        <h3>Birthday: {logindata[0].birthdate}</h3>

                        <h2></h2>
                        <Button className="mt-12" onClick={userlogout} style={{ background: "maroon" }}>Log Out</Button>
                    </div>
            }
        </>
    )
}

export default Dashboard






















