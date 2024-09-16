// global imports
import { Control, FieldErrors } from "react-hook-form";


export interface CustomButtonProps {
    label: string;
    clickEvent: () => void;
    buttonType?: "primary" | "secondary" | "custom";
}


export interface CustomInputProps {
    placeholder?: string;
    onOptionChange?: (value: any) => void;
    options?: { label: string; value: string }[];
}


export interface CustomCheckBoxProps {
    control?: Control<any>;
    errors?: FieldErrors;
    rules?: any;
    name?: string;
    value: string;
    label: string;
    checked: boolean;
    handleCheckChange: (e?: any) => void;
}


export interface RangeSliderProps {
    selectedDistance: number;
    handleDistanceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export interface CustomSearchBarProps {
    placeholder?: string;
    onSearchChange?: (value: string) => void;
    options?: { label: string; value: string }[];
    mobileClickEvent?: () => void;
}
