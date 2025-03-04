import icon from '../assets/logoIcon.png'
import AddBar from '../components/addbar'
import PlantCard from '../components/plantCard'
import Tile from '../components/tiles'
import { useState, useEffect } from 'react'
import axios from 'axios'   

function Dashboard() {
    const [plants, setPlants] = useState([])
    const [refreshTrigger, setRefreshTrigger] = useState(0);  

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await axios.get('http://localhost:8000/plant/');  // Replace with your actual API URL
                setPlants(response.data.data[0]);
                console.log(response);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching plants:", error);
            }
        };

        fetchPlants();
        console.log(
            "Plants:", plants
        );
    }, [refreshTrigger]);

    const refreshDashboard = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return(
        <div className="flex-col w-full h-full bg-black/10">
            <div className='flex ml-10 items-center'>
                <img className='w-20' src={icon}/>
                <h2 className='text-black text-3xl'>Vridhhi</h2>
                {/* <nav className='flex ml-auto text-black gap-5'>
                    <a href='#' className='text-black'>Home</a>
                    <a href='#' className='text-black'>About</a>
                    <a href='#' className='text-black'>Contact</a>  
                </nav> */}
            </div>
            <div className='flex px-10'>
                <AddBar refreshDashboard={refreshDashboard}/>
            </div>
            

            {/* select tiles
            <div className='flex'>
                <Tile title= 'Flowers' />
            </div> */}
            <div className="flex flex-wrap gap-5 px-10 mt-5">
                {plants.length > 0 ? (
                    plants.map((plant, index) => (
                        <PlantCard
                            key={index}
                            name={plant.name}
                            category={plant.category}
                            initialHeight={plant.initial_height}
                            presentHeight={plant.present_height}
                            description={plant.description}
                            date_planted={plant.date_planted}
                            refreshDashboard={refreshDashboard} 
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No plants found.</p>
                )}
            </div>
        </div>
    )
}

export default Dashboard