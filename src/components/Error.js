import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {


    const history = useNavigate();

  return (
    <>
            <div className='container'>
            <div className="error d-flex flex-column justify-content-lg-center align-items-center" style={{marginTop: '20%'}}>
                <h4>Oops. You seem to be lost :/</h4>
                <button type="submit" className='col-lg-2 p-2 mt-12' style={{ background: "maroon", color: "white"}} onClick={()=>history("/")}>Go back to safe ground</button>
            </div>

        </div>
    </>
  )
}

export default Error