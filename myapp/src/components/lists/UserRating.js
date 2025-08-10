import { useEffect, useState } from "react";

function UserRating({ u_id, score, comment }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            var id = u_id;
            try {
                const response = await fetch(`http://88.200.63.148:3023/users/get`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id
                })
            });
                if (!response.ok) {
                    throw new Error('Failed to fetch User');
                }
                const data = await response.json();
                setUserData(data[0]);
            } catch (err) {
                console.error('API error:', err);
            }
        }; getUser();
    }, [u_id]);

    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            margin: '8px',
            backgroundColor: '#f9f9f9'
        }}>
            <h4 style={{ margin: '0 0 8px 0' }}>
                {'★'.repeat(Math.floor(score))}
                {'☆'.repeat(5 - Math.ceil(score))}
                <span style={{ marginLeft: '8px' }}>{score.toFixed(1)}</span>
            </h4>
            <p>{comment || 'No comment'}</p>
            <small>{userData ? `User: ${userData.first_name}` : `User ID: ${u_id}`}</small>
        </div>
    );
}

export default UserRating;