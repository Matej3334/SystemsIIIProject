

function ProfileCard(){
    
const logout = () => {
  localStorage.removeItem('id');
  window.location.href = '/'; 
};
    return(
        <div>
            <button onClick={logout}>Log out</button>
        </div>
    )
}

export default ProfileCard;
