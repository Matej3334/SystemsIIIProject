import React from "react";
import { useState } from 'react';

function Form(){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    
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
                    <label>Password:
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <br></br>
                    <button type='submit'>Log in</button>
                </form>
        </div> 
    )
}
export default Form;