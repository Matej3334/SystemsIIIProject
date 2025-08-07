import React from "react";
import { useState } from 'react';

function Registration(){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
    return(
        <div>
            <form>
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label>Password:
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label>Password:
                        <input
                            type="text"
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