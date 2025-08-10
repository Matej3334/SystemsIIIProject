import { useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ReservationForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [error,setError]=useState(false);
    const [formData, setFormData] = useState({
        u_id: localStorage.getItem('id') || '',
        length: '',
        r_id: id,
        use_equipment: '', 
        s_time: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://88.200.63.148:3023/reservation/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Reservation failed');
            
            alert('Reservation successful!');
            navigate('/home');
        } catch (err) {
            setError(true)
        }
    };

    if (error){ return(
        <div><h1>Reservation failed</h1></div>
    )}
    return (
        <div style={{ padding: '20px' }}>
            <h2>Reserve Room {id}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Hour: </label>
                    <input 
                        type="number"
                        name="s_time" 
                        value={formData.s_time}
                        onChange={handleChange}
                        required
                    />
                </div>        
                <div>
                    <label>Length of stay: </label>
                    <input 
                        type="number" 
                        name="length"
                        max={4}
                        min={1}
                        value={formData.length}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Additional equipment:</label>
                    <select 
                        name="use_equipment"
                        onChange={handleChange} 
                        required 
                        value={formData.use_equipment}
                    >
                        <option value="" disabled>--Please choose an option--</option>
                        <option value="none">No need</option>
                        <option value="mouse">mouse</option>
                        <option value="charger">charger</option>
                        <option value="table">table</option>
                        <option value="marker">marker</option>
                    </select>
                </div>
                <button type="submit">Confirm Reservation</button>
            </form>
        </div>
    );
}

export default ReservationForm;