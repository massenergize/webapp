"use client"
// global imports
import { FC, useEffect, useState } from "react";
import { RiAddCircleFill, RiAddLine, RiArrowDropDownLine, RiCloseLine } from "@remixicon/react";

// local imports
import { CustomSearchBarProps, FilterSectionProp, SoftBorderSectionProps } from "@/interfaces";
import { CustomButton, CustomCheckBox, CustomSearchBar, DropdownInput, RangeSlider } from ".";


const SoftBorderSection: FC<SoftBorderSectionProps> = ({ title, children, shadow }) => {
    return (
        <div className={`py-5 px-4 flex flex-col gap-4 border border-strokeSoft rounded-xl ${shadow ? "shadow-[0_16px_32px_-12px_#0E121B1A]" : "shadow-none"}`}>
            <div className="flex flex-col gap-3.5">
                <h2 className="text-lg font-medium">{title}</h2>
                <hr />
            </div>
            <div className="flex flex-col gap-4">{children}</div>
        </div>
    )
}

export const BasicFilterSection: FC<CustomSearchBarProps> = ({ options, placeholder, onSearchChange, mobileClickEvent }) => {
    return (
        <div className="w-4/5 bg-offWhite py-6 px-5 flex flex-wrap md:flex-nowrap items-center gap-2.5 justify-center rounded-xl">
            <CustomSearchBar placeholder={placeholder} onSearchChange={onSearchChange} />
            <div className="hidden px-3 py-1 w-80 md:flex items-center gap-1.5 text-sm bg-white border border-strokeSoft rounded-lg shrink-0">
                <RiAddCircleFill className="text-primary" />
                <DropdownInput 
                    placeholder={"Create community / campaign"} 
                    options={options}
                />
            </div>
            <div className="w-full flex items-center gap-8 justify-between md:hidden">
                <div role="button" onClick={mobileClickEvent} className="flex items-center gap-1">
                    <span className="underline">Filters</span>
                    <span><RiArrowDropDownLine /></span>
                </div>
                <div className="flex items-center gap-1 text-primary">
                    <RiAddLine size={18} />
                    <span>Add</span>
                </div>
            </div>
        </div>
    )
}

export const FilterSection: FC<FilterSectionProp> = ({ filterItems, applyFilters, clearFilters, onClose }) => {
    const [selectedState, setSelectedState] = useState("");
    const [selectedZip, setSelectedZip] = useState("");

    const [selectedDistance, setSelectedDistance] = useState(0);
    const [allZipCodes, setAllZipCodes] = useState<string[]>([]);

    const [stateSearch, setStateSearch] = useState("");
    const [zipSearch, setZipSearch] = useState("");

    useEffect(() => {
        const zipCodes = filterItems?.flatMap((item) => item.zipCodes);
        const uniqueZipCodes = [...new Set(zipCodes)];
        setAllZipCodes(uniqueZipCodes);
    }, [filterItems]);

    const filteredStates = filterItems?.filter(item =>
        item.name.toLowerCase().includes(stateSearch.toLowerCase())
    );
    const filteredZipCodes = allZipCodes.filter(zip =>
        zip.includes(zipSearch)
    );

    const handleStateChange = (value: string) => {
        setSelectedState(value);
    };
    const handleZipChange = (value: string) => {
        setSelectedZip(value);
    };
    const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDistance(Number(event.target.value));
    };

    const handleApply = () => {
        applyFilters({
            state: selectedState,
            zipCode: selectedZip,
            distance: selectedDistance,
        });
    };
    const handleClear = () => {
        setSelectedState("");
        setSelectedZip("");
        setSelectedDistance(0);
        clearFilters();
    };

    return (
        <section className="flex flex-col gap-4 text-textPrimary">
            <div className="md:flex md:flex-col md:gap-3">
                <div className="flex items-center gap-8 justify-between">
                    <h2 className="text-xl font-medium">Filters</h2>
                    <p role="button" onClick={handleClear} className="hidden md:block text-textSecondary">Clear</p>
                    <RiCloseLine role="button" onClick={onClose} className="md:hidden" />
                </div>
                <hr className="hidden md:block" />
            </div>
            <div className="flex flex-col gap-6">
                <SoftBorderSection shadow title={"State"}>
                    <CustomSearchBar placeholder="Search state" onSearchChange={setStateSearch} regular />
                    <div className="flex flex-col gap-2">
                        {filteredStates?.map((item, index) => (
                            <CustomCheckBox 
                                key={index}
                                name={item.name}
                                value={item.name}
                                label={item.name}
                                checked={selectedState === item.name}
                                handleCheckChange={() => handleStateChange(item.name)}
                            />
                        ))}
                    </div>
                </SoftBorderSection>
                <SoftBorderSection shadow title={"Around me"}>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-base">Miles</h2>
                        <RangeSlider 
                            selectedDistance={selectedDistance} 
                            handleDistanceChange={handleDistanceChange}
                        />
                    </div>
                </SoftBorderSection>
                <SoftBorderSection shadow title={"Zip codes"}>
                    <CustomSearchBar placeholder="Search zip codes" onSearchChange={setZipSearch} regular />
                    <div className="flex flex-col gap-2">
                        {filteredZipCodes.map((zip, index) => (
                            <CustomCheckBox
                                key={index}
                                name={zip}
                                value={zip}
                                label={zip}
                                checked={selectedZip === zip}
                                handleCheckChange={() => handleZipChange(zip)}
                            />
                        ))}
                    </div>
                </SoftBorderSection>
            </div>
            <div className="w-full flex items-center gap-2.5">
                <CustomButton 
                    label="Apply Filters"
                    clickEvent={handleApply}
                    buttonType={"primary"}
                />
                <CustomButton 
                    label="Clear"
                    clickEvent={handleClear}
                    buttonType={"secondary"}
                />
            </div>
        </section>
    );
}
