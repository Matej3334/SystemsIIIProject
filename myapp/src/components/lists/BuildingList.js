import BuildingCard from "./BuildingCard";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function BuildingList() {
  const [building, setBuilding] = useState();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    const userId = localStorage.getItem('id');
    if (!userId) {
      navigate('/');
    } else if (userId == 9) {
      setAdmin(true)
    }
  }, [navigate]);

  useEffect(() => {
    const getBuildings = async () => {
      try {
        const response = await fetch('http://88.200.63.148:3023/build');

        if (!response.ok) {
          throw new Error('Failed to fetch buildings');
        }

        const data = await response.json();
        setBuilding(data);
      } catch (err) {
        console.error('API error:', err);
      }
    }; getBuildings();
  }, []);
  const handle = () => {
    navigate(`./addroom`);
  };
  return (
    <div >
      <header>
        <h1>University Buildings</h1>
      </header>
      {admin && <div><button onClick={handle}>Add room?</button></div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', rowGap: '5%' }}>
        {
          building ?
            building.map(bu => <BuildingCard
              id={bu.id}
              key={bu.id}
              b_name={bu.b_name}
              location={bu.location}
              workhours={bu.workhours}
            />
            ) : <p></p>
        }
      </div>
    </div>
  );
};

export default BuildingList;