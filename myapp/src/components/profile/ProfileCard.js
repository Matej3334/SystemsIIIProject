import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function ProfileCard() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('id');
        if (!userId) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const getUser = async () => {
            const id = localStorage.getItem('id');
            try {
                const response = await fetch(`http://88.200.63.148:3023/users/get`, {
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
    }, []);

    const logout = () => {
        localStorage.removeItem('id');
        window.location.href = '/';
    };
    return (
        <div>
            <div>
                <h3>
                    {`User: ${userData.first_name}`}
                </h3>
            </div>
            <div>
                <h3>
                    {`Last Name: ${userData.last_name}`}
                </h3>
            </div>
            <div>
                <h3>
                    {`Email: ${userData.email}`}
                </h3>
            </div>
            <div>
                <h3>
                    {`Faculty: ${userData.faculty}`}
                </h3>
            </div>
            <button onClick={logout}>Log out</button>
        </div>
    )
}

export default ProfileCard;
