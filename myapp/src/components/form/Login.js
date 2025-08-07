import { useState } from 'react';

function Form(){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const msgbody = JSON.stringify(formData)
        const fetchdata = {
            method: 'POST',
            body: msgbody 
        };
        fetch('https://localhost:4100/users/login',fetchdata);
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