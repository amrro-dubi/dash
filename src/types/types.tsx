import { Dispatch, SetStateAction } from "react";

//components / reusableComponents/ formLayout
export type formLayoutProps = {
    children: React.ReactNode;
    title?: string;
};

//components / reusableComponents/ mainPageCard
export type MainCardProps = {
    children: React.ReactNode;
};
export type Mainlist = {
    children?: React.ReactNode;
    title?: string;
};

interface Pagination {
    total: number;
    last_page: number;
    per_page: number;
    current_page: number;
}
export type tabelProps = {

    tabelHead: any[];
    TableBody: any[];
    allCols?: string[];
    isLoading?: { [key: number]: boolean };
    isLoadingDelivery?: { [key: number]: boolean };
    Link_Navigation?: string;
    Chcekbox?: boolean;
    Page_Add?: boolean;
    showAddButton?: boolean;
    Enabel_edit?: boolean;
    Enabel_delete?: boolean;
    enable_search?: boolean;
    searchValue?:string;
    resetFilters?: () => void
    typesHandler?: (id: string) => void;
    handleSelect? :  (value: {
        value: any;
        label: string;
    }, stateName: string) => void
    developerOptions?: { value: any; label: string }[]
    cityOptions?: { value: any; label: string }[]
    areaOptions?: { value: any; label: string }[]
    types?: {id:string, name:string} [] 
     setSearch?: Dispatch<SetStateAction<string>>
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onView?: (id: string) => void;
   

    pagination?: Pagination;
    setPage: (page: number) => void;
    page: number;
    openCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
};

//components / reusableComponents/ inputComponnent
export type customInputProps = {
    label: string;
    labelLang?: string;
    type: string;
    placeholder: string;
    name?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    required?: boolean;
    disabled?: boolean;
};
//components / reusableComponents/ NumberInput

export type customNumbersInputProps = {
    value: string;

    onChange: (value: string) => void;
    required?: boolean;
};

//components / reusableComponents/ customSelect
export type customSelectProps = {
    options: { value: any; label: string }[];
    editOptionId?:{ value: any; label: string } |null;
    label?: string;
    onChange: (value: { value: any; label: string }) => void; // Add this prop
};
export type customAnySelectProps = {
    label?: string;
    type: string;
    id?: string;
    onChange: (value: number) => void; // Add this prop
};
export type ModalProps = {
    children: React.ReactNode;
    title?: string;
    openCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
    resetEditData?: React.Dispatch<React.SetStateAction<[]>>;
};
