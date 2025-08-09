import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Form() {
    const [formData, setFormData] = useState({
        id: "",
        password: "",
    });


    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://88.200.63.148:3023/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: formData.id,
                    password: formData.password,
                })
            });

           const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

           console.log('Login successful', data);
           navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            {error}
            <form method='POST' onSubmit={handleSubmit} >
                <label>Student id:
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br></br>
                <label>Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                </label>
                <br></br>
                <button type='submit'>Log in</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    )
}
export default Form;