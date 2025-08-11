import { useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ReservationForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState('');
    const [error,setError]=useState(false);
    const [formData, setFormData] = useState({
        u_id: localStorage.getItem('id') || '',
        e_time: '',
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
        if(validationError) setValidationError('');
    };

    const validateTimes = (start, end) => {
        const startTime = new Date(start);
        const endTime = new Date(end);
        const diffHours = (endTime - startTime) / (1000 * 60 * 60);
        if (startTime >= endTime) {
            return "End time must be after start time";
        }
        if (diffHours > 5) {
            return "Maximum reservation duration is 5 hours";
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errorMsg = validateTimes(formData.s_time, formData.e_time);
        if (errorMsg) {
            setValidationError(errorMsg);
            return;
        }
        
        setValidationError('');

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
        <div style={{ padding: '20px' }} className='container'>
            <h2>Reserve Room {id}</h2>
            <form onSubmit={handleSubmit} style={{backgroundColor:"#f2f2f2"}}>
                <div>
                    <label>Start time: </label>
                    <input 
                        type="datetime-local"
                        name="s_time" 
                        value={formData.s_time}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().slice(0, 16)} 
                    />
                </div>        
                <div>
                    <label>End time: </label>
                    <input 
                        type="datetime-local" 
                        name="e_time"
                        value={formData.e_time}
                        onChange={handleChange}
                        required
                        min={formData.s_time || new Date().toISOString().slice(0, 16)}
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