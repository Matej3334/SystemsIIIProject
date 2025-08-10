
function UserRating({ u_id, score, comment }) {
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
            <small>User: {u_id}</small>
        </div>
    );
}

export default UserRating;