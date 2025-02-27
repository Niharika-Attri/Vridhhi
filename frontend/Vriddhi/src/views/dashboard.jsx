import icon from '../assets/logoIcon.png'
import AddBar from '../components/addbar'
import PlantCard from '../components/plantCard'
import Tile from '../components/tiles'

function Dashboard() {
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
                <AddBar/>
            </div>
            

            {/* select tiles
            <div className='flex'>
                <Tile title= 'Flowers' />
            </div> */}
            
            <PlantCard/>
        </div>
    )
}

export default Dashboard