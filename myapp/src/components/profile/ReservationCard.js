
function ReservationCard({ id, r_id, s_time, length, use_equipment, onDelete }) {
    
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
        </div>
    );
}

export default ReservationCard;