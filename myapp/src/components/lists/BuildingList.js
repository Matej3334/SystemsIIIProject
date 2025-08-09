import BuildingCard from "./BuildingCard";
import { useEffect,useState} from "react";

function BuildingList() {
    const [building, setBuilding]=useState();

    useEffect(() => {
      const getBuildings = async() => {
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

  return (
    <div >
      <header>
        <h1>University Buildings</h1>
        <p>Select a building to view available study rooms</p>
      </header>

      <div style={{display: 'grid', gridTemplateColumns:'auto auto auto auto', rowGap:'5%'}}>
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