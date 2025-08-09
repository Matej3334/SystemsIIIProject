function RoomCard({ name, capacity, equipment, status }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
            <h4>Room {name}</h4>
            <p>Capacity: {capacity}</p>
            <p>Equipment: {equipment}</p>
            <p>Availability: {status}</p>
        </div>
    );
}

export default RoomCard;