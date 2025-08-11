import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Registration() {
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        email: "",
        faculty: "",
        f_name: "",
        l_name: ""
    });

    const [error, setError] = useState("");
    const [state, setState] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.email.includes('@student.upr.si')) {
            setError("Not a valid email");
            return;
        }

        try {
            const response = await fetch('http://88.200.63.148:3023/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: formData.id,
                    password: formData.password,
                    email: formData.email,
                    faculty: formData.faculty,
                    f_name: formData.f_name,
                    l_name: formData.l_name
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }
            
            setState(true)
            setError("");
        } catch (err) {
            setError(err.message);
        }
    }

    if (state) {
        return <div>Registration successful! Click here to <Link to="/">Log in</Link></div>;
    }

    return (
        <div className='container'>
            <h2>Registration</h2>
            {error && <div>{error}</div>}
            <form method='POST' onSubmit={handleSubmit}>
                <div>
                    <label>Student ID:</label>
                    <input
                        type="text"
                        name="id"
                        minLength="6"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Faculty:</label>
                    <select id="mySelect" onChange={handleChange} required value={formData.faculty}  name="faculty">
                        <option value="" disabled>--Please choose an option--</option>
                        <option value="FAMNIT">UP FAMNIT</option>
                        <option value="FM">UP FM</option>
                        <option value="FVZ">UP FVZ</option>
                        <option value="PEF">UP PEF</option>
                    </select>
                </div>

                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="f_name"
                        value={formData.f_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="l_name"
                        value={formData.l_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/">Log in</Link>
            </p>
        </div>
    );
}

export default Registration;