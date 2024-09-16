// global imports
import { Dispatch, SetStateAction } from "react";
import { StylesConfig } from "react-select";


export const handleSearchChange = (setter: Dispatch<SetStateAction<string>>) => (value: string) => {
    setter(value);
};

export const customStyles: StylesConfig = {
    control: (base: any, state: { isDisabled: any; }) => ({
        ...base,
        height: "100%",
        minHeight: "unset",
        border: "none",
        outline: "none",
        boxShadow: "none",
        backgroundColor: state.isDisabled ? "#F6F8FA" : "#FFF"
    }),
    indicatorSeparator: (provided: any) => ({
        ...provided,
        display: "none",
    }),
    menu: (provided: any) => ({
        ...provided,
        zIndex: 50,
        color: "#0A0D14",
    }),
};
