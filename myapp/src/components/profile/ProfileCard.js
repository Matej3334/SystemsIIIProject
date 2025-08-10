import { useEffect, useState } from "react";

function ProfileCard() {
    const [userData, setUserData] = useState([]);

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
                {`User: ${userData.first_name}`}
            </div>
            <div>
                {`Last Name: ${userData.last_name}`}
            </div>
            <div>
                { `Email: ${userData.email}`}
            </div>
            <div>
                { `Faculty: ${userData.faculty}`}
            </div>
            <button onClick={logout}>Log out</button>
        </div>
    )
}

export default ProfileCard;
