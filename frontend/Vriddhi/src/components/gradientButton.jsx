function GradientButton(props){
    return(
        <button
            onClick={props.handleClick}
            type={props.type}
            className="w-full mb-1 bg-gradient-to-r from-emerald-950 to-green-700 mt-4"
        >
            {props.title}
        </button>
    )
}

export default GradientButton