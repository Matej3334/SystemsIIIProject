import { useNavigate } from 'react-router-dom';


function RoomCard({ id, name, capacity, equipment, status }) {
    const navigate = useNavigate();
    const handleReserveClick = () => {
        navigate(`./reserve/${id}`); 
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
            <h4>Room {name}</h4>
            <p>Capacity: {capacity}</p>
            <p>Equipment: {equipment}</p>
            <p>Availability: {status}</p>
            <button 
                onClick={handleReserveClick}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '10px'
                }}
                disabled={status === "unavailable"}
            >Reserve</button>
        </div>
    );
}

export default RoomCard;