import React from 'react'
import { useNavigate } from 'react-router-dom';

const PagenotFound = () => {
    const navigate=useNavigate();
    const handleBack=()=>{
        navigate(-1)
    }
    return(
        <div>
            <button onClick={handleBack}>Go back</button>
        </div>
    )
}

export default PagenotFound
