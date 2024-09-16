// global imports
import { FC } from "react"

// local imports
import { CustomButtonProps } from "@/interfaces"


export const CustomButton: FC<CustomButtonProps> = ({ buttonType, label, clickEvent }) => {
    const primary = buttonType === "primary";
    
    return (
        <button 
            onClick={clickEvent}
            className={`flex-1 py-2 px-2.5 text-base font-medium border border-green-400 ${primary ? "bg-green-400 text-white" : "bg-white text-green-400"} rounded-lg`}
        >{label}</button>
    )
}
