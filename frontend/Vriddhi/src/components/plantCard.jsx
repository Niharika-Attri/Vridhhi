import sunflower from '../assets/images/sunflower.png'
import aloevera from '../assets/images/aloevera.png'
import methi from '../assets/images/methi.png'
import rose from '../assets/images/rose.png'
import tulsi from '../assets/images/tulsi.png'
import hibiscus from '../assets/images/hibiscus.png'
import Tile from './tiles'

const plantImages = {
    "sunflower": sunflower,
    "Aloe Vera": aloevera,
    "aloe vera": aloevera,
    "methi": methi,
    "rose": rose,
    "tulsi": tulsi,
    "hibiscus": hibiscus
};

function PlantCard({ name, image, description, category, growthStage, initialHeight, presentHeight, refreshDashboard  }) {
    const deletePlant = async () => {
        try {
            await axios.delete(`http://localhost:8000/plant/${name}`);  // Adjust API as needed
            refreshDashboard();  // ✅ Refresh dashboard after deletion
        } catch (error) {
            console.error("Error deleting plant:", error);
        }
    };

    return (
        <div className="flex flex-col items-center text-left bg-white w-52 h-72 rounded-2xl text-black"
            style={{ boxShadow: "0 3px 2px rgba(0, 0, 0, 0.2)" }}>
            
            <img className="w-[86%] mt-[6%] rounded-lg" src={plantImages[name] || sunflower} alt={name} />

            <div className="flex flex-col w-full px-3 py-1">
                <h2 className="font-semibold">{name}</h2>

                <p className="text-[11px] text-gray-600 line-clamp-2 mb-3 overflow-hidden text-ellipsis h-[2.5em] leading-[1.2em] leading-[1.2em]">
                    {description}
                </p>
                
                <div className="flex flex-col gap-1">
                    {/* Category */}
                    <div className="flex">
                        <span className="text-xs pr-2">Category:</span> 
                        <div className="flex gap-1 flex-wrap">
                            {category.map((cat, index) => (
                                <Tile key={index} title={cat} />
                            ))}
                        </div>
                    </div>

                    {/* Growth Stage
                    <div className="flex">
                        <span className="text-xs pr-2">Growth stage:</span>  
                        <Tile title={growthStage} />
                    </div> */}

                    {/* Initial Height */}
                    <div className="flex">
                        <span className="text-xs pr-2">Initial Height:</span>  
                        <span className="text-xs font-medium">{initialHeight} cm</span>
                    </div>

                    {/* Present Height */}
                    <div className="flex">
                        <span className="text-xs pr-2">Present Height:</span>  
                        <span className="text-xs font-medium">{presentHeight} cm</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default PlantCard