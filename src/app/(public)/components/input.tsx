
export default function BInput(
    {className, ...props}
        :
    { className?: string, placeholder?: string, name?: string, id?: string, type?: string, onChange: (newValue: string) => void, value?: string }
){


    return (
        <input
            className={`h-[45px] rounded-lg p-3 w-[95%] mx-auto
                     border border-gray-100 hover:border-gray-200 focus:border-none               
                     placeholder-gray-400 
                     shadow-inner hover:shadow-sm focus:shadow-sm
                     transition-all ease-out duration-500
                      ${className}`}
            placeholder={props.placeholder}
            name={props.name}
            id={props.id}
            type={props.type}
            onChange={(e) => props.onChange(e.target.value)}
            value={props.value}
        ></input>
    )
};