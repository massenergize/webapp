// global imports
import { ReactNode } from "react";
import { Control, FieldErrors } from "react-hook-form";


export interface SoftBorderSectionProps {
    title: string;
    shadow?: boolean;
    children: ReactNode;
}

export interface FilterSectionProp {
    control?: Control<any>;
    errors?: FieldErrors;
    filterItems?: any[];
    onClose?: () => void;
    clearFilters: () => void;
    applyFilters: (filters: { state: string; zipCode: string; distance: number }) => void;
}
