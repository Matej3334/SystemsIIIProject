import { useEffect,useState} from "react";
import RoomCard from "./RoomCard"

function BuildingCard({ id, b_name, location, workhours }) {
    const [rooms, setRooms]=useState([]);

    
    useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await fetch(`http://88.200.63.148:3023/rooms/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch rooms for building ${id}`);
                }

                const data = await response.json();
                setRooms(data);
            } catch(err){
                console.error('API error:', err);
            }
        }; getRooms();
    }, [id]);
    return (
        <div>
            <h3>{b_name}</h3>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Hours:</strong> {workhours}</p>
            <div style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            margin: '10px',
            borderRadius: '5px'
        }}>
            <h4>Study rooms:</h4>
            <div>
                {
                    rooms ?
                    rooms.map(ru => <RoomCard
                    id={ru.id}
                    key={ru.id}
                    name={ru.name}
                    capacity={ru.capacity}
                    equipment={ru.equipment}
                    status={ru.status}
                    />) : <p></p>
                }
            </div>
        </div>
        </div>
    );
}

export default BuildingCard;