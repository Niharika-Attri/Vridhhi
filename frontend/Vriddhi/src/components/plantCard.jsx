import sunflower from '../assets/images/sunflower.png'
import Tile from './tiles'

function PlantCard(){
    return(
        <div className="flex flex-col items-center text-left bg-white w-52 h-64 rounded-2xl text-black " style={{boxShadow:"0 3px 2px rgba(0, 0, 0, 0.2)"}}>
            <img className="w-[86%] mt-[6%]" src={sunflower}/>
            <div className='flex flex-col items-left w-full px-3 py-1 '>
                <h2 className=''>Sunflower</h2>
                <div className='flex flex-col gap-1'>
                    <div className='flex'>
                        <span className='text-xs pr-2'>Category:</span> <Tile title={"Flower"}/> 
                    </div>
                    <div className='flex'>
                    <span className='text-xs pr-2'>Growth stage:</span>  <Tile title={"Blooming"} colour=''/>
                    </div>
                    
                </div>
                

            </div>
            
        </div>
    )
}

export default PlantCard