import React from "react";
import { useState } from 'react';

function Registration(){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [faculty, setFaculty] = useState("");
    const [f_name, setName] = useState("");
    const [l_name, setLName] = useState("");
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const msgbody = JSON.stringify(formData)
        const fetchdata = {
            method: 'POST',
            body: msgbody 
        };
        fetch('https://localhost:4100/users/register',fetchdata);
    }

    return(
        <div>
            <form method='POST' onSubmit={handleSubmit}>
                    <label>Student id:
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </label>
                    <br></br>
                    <label>Email:
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <br></br>
                    <label>Faculty:
                        <input
                            type="text"
                            value={faculty}
                            onChange={(e) => setFaculty(e.target.value)}
                        />
                    </label>
                    <label>First Name:
                        <input
                            type="text"
                            value={f_name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>Last Name:
                        <input
                            type="text"
                            value={l_name}
                            onChange={(e) => setLName(e.target.value)}
                        />
                    </label>
                    <label>Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button type='submit'>Log in</button>
                </form>
        </div> 
    )
}
export default Registration;