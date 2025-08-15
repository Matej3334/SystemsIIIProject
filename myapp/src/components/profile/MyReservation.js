import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ReservationCard from './ReservationCard'

function MyReservation() {
    const [reservation, setReservation] = useState(null);
    const [deleted, setDelete] = useState(false);
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

        setDelete(true);
    };

    const handleUpdate = async (id, r_id, s_time, e_time) => {
        try {
            const response = await fetch('http://88.200.63.148:3023/reservation/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    r_id,
                    s_time,
                    e_time,
                })

            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error('Failed to update reservation time');
            }
            setReservation(prev => prev.map(r =>
                r.id === id ? { ...r, s_time, e_time } : r
            ));

            return result;
        } catch (err) {
            console.error('Update error:', err);
            throw err;
        }
    }

    if (deleted) {
        return <div><h3>Registration deleted!</h3></div>;
    }

    return (
        <div>
            <header>
                <h1>Your reservation:</h1>
            </header>
            <div style={{
                border: '1px solid #ddd',
                padding: '15px',
                margin: '10px',
                borderRadius: '5px'
            }}>
                {reservation ?
                    reservation.map(r => <ReservationCard
                        id={r.id}
                        key={r.id}
                        r_id={r.r_id}
                        s_time={r.s_time}
                        e_time={r.e_time}
                        use_equipment={r.use_equipment}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                    ) : <p></p>
                }
            </div>
        </div>
    )
}
export default MyReservation;