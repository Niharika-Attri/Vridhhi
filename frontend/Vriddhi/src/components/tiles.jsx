function Tile(props){
    return(
        <div className={`text-xs px-2 ${ props.colour == null ? "bg-emerald-500": "bg-{props.colour}" } rounded-full`}>
            <h4> {props.title}</h4>
        </div>
    )
}

export default Tile;