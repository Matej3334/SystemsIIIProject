import { useState } from "react";


function ReservationCard({ id, r_id, s_time, e_time, use_equipment, onDelete, onUpdate }) {
    const [formData, setFormData] = useState({
        e_time: e_time,
        s_time: s_time
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await onUpdate(
                id,
                r_id,
                formData.s_time,
                formData.e_time
            );
            alert("reservation updated");
        } catch (error) {
            alert(`Update failed: ${error.message}`);
        }
    }
    return (
        <div>
            <h3>Reservation</h3>
            <div>
                <p><strong>Room ID:</strong> {r_id || 'N/A'}</p>
                <p><strong>Start Time:</strong> {s_time}</p>
                <p><strong>End time:</strong> {e_time || 'N/A'}</p>
                <p><strong>Equipment:</strong> {use_equipment}</p>
            </div>
            <button onClick={() => onDelete(id)}
                style={{
                    padding: '8px 16px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '10px'
                }}>Cancel</button>

            <h3>Edit time:</h3>
            <form onSubmit={handleSubmit}>
                <div>
                <label>
                    Start Time:
                    <input 
                        type="datetime-local"
                        name="s_time" 
                        value={formData.s_time}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().slice(0, 16)} 
                    />
                </label>
                </div>
                <div>
                <label>
                    End time:
                    <input 
                        type="datetime-local" 
                        name="e_time"
                        value={formData.e_time}
                        onChange={handleChange}
                        required
                        min={formData.s_time || new Date().toISOString().slice(0, 16)}
                    />
                </label>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default ReservationCard;