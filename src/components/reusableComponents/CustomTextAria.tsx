import React from 'react';
type CustomTextAriaProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    name: string;
    placeholder: string;
    label: string;
    labelLang?: string;
};
const CustomTextAria = (props: CustomTextAriaProps) => {
    return (
        <div className="col-span-12">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {props?.label} <span className="bg-custom-gradient bg-clip-text text-transparent font-medium text-[16px]">{props.labelLang}</span>
            </label>

            <textarea
                rows={4}
                name={props?.name}
                id="name"
                onChange={props?.onChange}
                value={props?.value}
                className="bg-[#F5F5F5] border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={props?.placeholder}
            />
        </div>
    );
};

export default CustomTextAria;
