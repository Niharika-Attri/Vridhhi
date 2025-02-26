function AuthInput(props){
    return(
        <div className="flex flex-col justify-center pb-2">
            <label 
                    for={props.id}
                    className="text-black font-normal">
                    {props.label}
            </label>
            <input
                value={props.value}
                type={props.type}
                id={props.id}
                placeholder={props.placeholder}
                className={`text-black rounded-lg p-2 ${props.error === "" ? "border border-green-900" : "border-2 border-red-600"}`}
                onChange={props.onChange}
            />
            { props.error !== '' && <p className="mt-1 text-red-600 text-xs">{props.error}</p>}
        </div>
    )
}

export default AuthInput