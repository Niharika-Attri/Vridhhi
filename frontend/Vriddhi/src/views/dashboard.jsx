import icon from '../assets/logoIcon.png'
import PlantCard from '../components/plantCard'

function Dashboard() {
    return(
        <div className="flex-col w-full h-full bg-black/10">
            <div className='flex w-full ml-10 items-center'>
                <img className='w-20' src={icon}/>
                <h2 className='text-black text-3xl'>Vridhhi</h2>
            </div>
            <PlantCard/>
        </div>
    )
}

export default Dashboard