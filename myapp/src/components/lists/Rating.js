import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserRating from './UserRating'

function Rating() {
    const [rating, setRating] = useState();
    const [avg, setAvg] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();
    const [form, showForm] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [newRating, setNewRating] = useState({
        score: 3,
        comment: ''
    });
    const [err, setErr] = useState(false);
    const [err2, setErr2] = useState(false);
    useEffect(() => {
        const userId = localStorage.getItem('id');
        if (!userId) {
            navigate('/');
        } else if (userId == 9) {
            setAdmin(true);
        }
    }, [navigate]);

    useEffect(() => {
        const getRatings = async () => {
            try {
                const response = await fetch(`http://88.200.63.148:3023/rating/${id}`);
                const responseAvg = await fetch(`http://88.200.63.148:3023/rating/${id}/average`)
                if (!response.ok || !responseAvg.ok) {
                    throw new Error('Failed to fetch buildings');
                }
                const data = await response.json();
                const dataAvg = await responseAvg.json()
                setRating(data);
                setAvg(dataAvg[0]);
            } catch (err) {
                console.error('API error:', err);
            }
        }; getRatings();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRating(prev => ({
            ...prev,
            [name]: name === 'score' ? parseInt(value) : value
        }));
    };

    const addRating = () => {
        showForm(true);
    }
    const deleteRating = async () => {
        const userId = localStorage.getItem('id');
        try {
            const response = await fetch(`http://88.200.63.148:3023/rating/${id}/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    u_id: userId,
                })
            });
            if (!response.ok) {
                setErr2(true);
                throw new Error('Failed to delete rating');
            }
            const data = await response.json();
            console.log(data);
            window.location.reload();
        } catch (err) {
            console.error('API error:', err);
            setErr2(true);
        }
        console.log("wow")
    }
    const submitRating = async () => {
        const userId = localStorage.getItem('id');
        try {
            const response = await fetch(`http://88.200.63.148:3023/rating/${id}/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    u_id: userId,
                    r_id: id,
                    score: newRating.score,
                    comment: newRating.comment
                })
            });

            if (!response.ok) {
                setErr(true);
                throw new Error('Failed to submit rating');
            }
            window.location.reload();
        } catch (err) {
            setErr(true);
            console.error('Submission error:', err);
        }
    }

    return (
        <div>
            <header>
                <h1>Ratings:</h1>
                <h3>Average Rating:</h3>
                <h4 style={{ margin: '0 0 8px 0' }}>
                    {'★'.repeat(Math.floor(avg))}
                    {'☆'.repeat(5 - Math.ceil(avg))}
                    <span style={{ marginLeft: '8px' }}>{avg}</span>
                </h4>
                {err && <div><h1>Error can't have duplicate ratings</h1></div>}
                {err2 && <div><h1>No review found</h1></div>}
                {!admin && <button onClick={addRating}>Add Review</button>}
                {!admin && <button onClick={deleteRating}>Delete My Review</button>}
            </header>
            <div>
                {form && <div className='container'> 
                    <h3>Add Your Review</h3>
                    <div>
                        <label>Rating: </label>
                        <select
                            name="score"
                            value={newRating.score}
                            onChange={handleChange}
                        >
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num} ★</option>
                            ))}
                        </select>
                    </div>
                    <br></br>
                    <div>
                        <div>
                            <label>Comment: </label>
                        </div>
                        <textarea
                            name="comment"
                            value={newRating.comment}
                            onChange={handleChange}
                            style={{ width: '200px', minHeight: '100px' }}
                        />
                    </div>
                    <button onClick={submitRating}>Submit</button>
                    <button onClick={() => showForm(false)}>Cancel</button>
                </div>
                }
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', rowGap: '5%' }}>
                {
                    rating ?
                        rating.map(r => <UserRating
                            key={r.id}
                            u_id={r.u_id}
                            score={r.score}
                            comment={r.comment}
                        />
                        ) : <p></p>
                }
            </div>
        </div>
    )
}

export default Rating;