function Tile(props){
    const bgColor = props.colour ? `bg-${props.colour}` : "bg-emerald-500";

    return(
        <div className={`text-xs px-2 rounded-full ${bgColor}`}>
            <h4> {props.title}</h4>
        </div>
    )
}

export default Tile;