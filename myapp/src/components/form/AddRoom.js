import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AddRoom() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        b_id: "",
        name: "",
        capacity: "",
        equipment: "",
        status: "available"
    });

    useEffect(() => {
        const userId = localStorage.getItem('id');
        if (userId != 9) {
            navigate('/'); 
        } 
    }, [navigate]);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

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
            const response = await fetch('http://88.200.63.148:3023/rooms/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add room');
            }
            
            setSuccess(true);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    }

    if (success) {
        return (
            <div>
                <h3>Room added successfully!</h3>
                <Link to="/Home">Go Back</Link>
            </div>
        );
    }

    return (
        <div className='container'>
            <h2>Add New Room</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Building ID:</label>
                    <input
                        type="text"
                        name="b_id"
                        value={formData.b_id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Room Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Capacity:</label>
                    <input
                        type="number"
                        name="capacity"
                        min="1"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Equipment:</label>
                    <select 
                        name="equipment" 
                        value={formData.equipment}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select equipment</option>
                        <option value="mouse">Mouse</option>
                        <option value="charger">Charger</option>
                        <option value="table">Table</option>
                        <option value="marker">Marker</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    <select 
                        name="status" 
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                </div>

                <button type="submit">Add Room</button>
            </form>
        </div>
    );
}

export default AddRoom;