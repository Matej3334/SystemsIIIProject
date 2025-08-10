import { useState } from "react";
function ReservationCard({ id, r_id, s_time, length, use_equipment, onDelete, onUpdate }) {
    const [formData, setFormData] = useState({
        length: length,
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
                formData.s_time,
                formData.length
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
                <p><strong>Duration:</strong> {length || 'N/A'}</p>
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
                        type="number"
                        name="s_time"
                        min="6"
                        max="23"
                        value={formData.s_time}
                        onChange={handleChange}
                        required
                    />
                </label>
                </div>
                <div>
                <label>
                    Length:
                    <input
                        type="number"
                        name="length"
                        min="1"
                        max="4"
                        value={formData.length}
                        onChange={handleChange}
                        required
                    />
                </label>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default ReservationCard;