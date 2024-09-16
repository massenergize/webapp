// global imports
import { FC } from "react";
import Select from "react-select";
import { RiCheckLine, RiSearch2Line } from "@remixicon/react";

// local imports
import { CustomCheckBoxProps, CustomInputProps, CustomSearchBarProps, RangeSliderProps } from "@/interfaces";
import { customStyles } from "@/utils";


export const CustomCheckBox: FC<CustomCheckBoxProps> = ({ value, checked, label, handleCheckChange }) => {
    return (
        <div className="flex items-center gap-1.5 text-base font-normal">
            <label className="relative cursor-pointer flex items-center">
                <input
                    type="checkbox"
                    value={value}
                    checked={checked}
                    style={{ accentColor: "#124B68" }}
                    onChange={handleCheckChange}
                    className="sr-only"
                />
                <span className={`h-5 w-5 rounded-md border-2 inline-block p-0.5 ${checked ? "bg-green-400 border-green-400" : "bg-white border-strokeSoft"}`}>
                    {checked && <RiCheckLine className="h-full w-full text-white" />}
                </span>
            </label>
            <span>{label}</span>
        </div>
    );
}

export const RangeSlider: FC<RangeSliderProps> = ({ selectedDistance, handleDistanceChange }) => {
    return (
      <div className="relative w-full">
        <input
          type="range"
          id="distance"
          min="0"
          max="100"
          value={selectedDistance}
          onChange={handleDistanceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
          style={{
            background: `linear-gradient(to right, #22C55E 0%, #22C55E ${(selectedDistance / 100) * 100}%, #E5E7EB ${(selectedDistance / 100) * 100}%, #E5E7EB 100%)`,
          }}
        />
        {selectedDistance > 0 && (
            <div className="absolute left-0 top-[-2rem] text-center font-medium z-10" style={{ left: `calc(${(selectedDistance / 100) * 100}% - 20px)` }}>
                <span className="bg-black py-1 px-2 text-white text-sm text-nowrap rounded shadow-lg">
                    {selectedDistance} miles
                </span>
                <div className="w-0 h-0 border-t-[10px] border-t-black border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent mx-auto"></div>
            </div>
        )}
      </div>
    );
  };

export const DropdownInput: FC<CustomInputProps> = ({ placeholder, options, onOptionChange }) => {
    return (
        <Select 
            isClearable
            options={options}
            styles={customStyles}
            placeholder={placeholder}
            onChange={onOptionChange && ((value) => onOptionChange(value))}
            className="w-full focus:outline-none"
        />
    )
}

export const CustomSearchBar: FC<CustomSearchBarProps> = ({ placeholder, onSearchChange, regular }) => {
    return (
        <div className={`w-full relative ${regular ? "py-1.5 px-2.5" : "py-2.5 px-3"} flex items-center gap-1.5 text-sm bg-white border border-strokeSoft rounded-lg`}>
            <RiSearch2Line size={18} />
            <input 
                type="text" 
                placeholder={placeholder} 
                aria-activedescendant={undefined} 
                onChange={onSearchChange && ((e) => onSearchChange(e.target.value))} 
                className={`w-full p-0 border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none`} 
            />
        </div>
    )
}
