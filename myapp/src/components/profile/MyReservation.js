import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ReservationCard from './ReservationCard'

function MyReservation() {
    const [reservation, setReservation] = useState(null);
    const [d, setD] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('id');
        if (!userId) {
            navigate('/');
        }
    }, [navigate]);

    
    useEffect(() => {
        const getReservation = async () => {
            try {
                const userId = localStorage.getItem('id');
                const response = await fetch('http://88.200.63.148:3023/reservation/get', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ u_id: userId })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch Reservation');
                }
                const data = await response.json();
                setReservation(data);
            } catch (err) {
                console.error('API error:', err);
            }
        }; getReservation();
    }, []);

    const handleDelete = async (id) => {
        
        const response = await fetch('http://88.200.63.148:3023/reservation/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id
            })
        });
        if (!response.ok) {
            throw new Error('Failed to delete reservation');
        }
        //window.location.reload();
        setD(true);
    };

    if (d) {
        return <div>Registration deleted!</div>;
    }

    return (
        <div>
            <header>
                <h1>Your reservation:</h1>
            </header>
            <div>
                {reservation ?
                    reservation.map(r => <ReservationCard
                        id={r.id}
                        key={r.id}
                        r_id={r.r_id}
                        s_time={r.s_time}
                        length={r.length}
                        use_equipment={r.use_equipment}
                        onDelete={handleDelete}
                    />
                    ) : <p></p>
                }
            </div>
        </div>
    )
}
export default MyReservation;