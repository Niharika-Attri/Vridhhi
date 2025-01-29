function AuthInput(props){
    return(
        <div className="flex flex-col justify-center pb-2">
            <label 
                    for={props.id}
                    className="text-black font-normal">
                    {props.label}
            </label>
            <input
                type={props.type}
                id={props.id}
                placeholder={props.placeholder}
                className=" border-1 text-black border-green-900 rounded-lg p-2"
            />
        </div>
    )
}

export default AuthInput