import React from "react";
import Select, { SingleValue } from "react-select";
import { customSelectProps } from "../../types/types";

const CustomSelect = (props: customSelectProps) => {
  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      borderColor: "transparent", // Adjust the border color as needed
      borderWidth: 0.5,

      // borderRadius: 4,
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: "#d1d5db", // This will affect the border color of the control
      "&:hover": {
        borderColor: "#d1d5db", // Ensure the border color remains red on hover
      },
      boxShadow: "none", // Remove any default box-shadow
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor:  "white",
      color: 'black'
      
    }),
   
    // Add more styles here if needed
  };


  const handleSelectChange = (
    newValue: SingleValue<{ value: any; label: string }>
  ) => {
   
    props.onChange(newValue); 
  };

console.log(props)
  return (
    <>
      <div className="flex flex-col gap-0">
        <label
          htmlFor=""
          className=" text-[16px]  font-[500]    "
          style={{ marginBottom: "4px" }}
        >
          {props.label}
        </label>
          {props?.options?.length > 0 && (<Select
        
        defaultValue={props?.options}
     
        className="select_styles "
        options={props?.options}
        isSearchable={false}
        onChange={handleSelectChange}
        styles={customStyles}
      />)}
        
      </div>
    </>
  );
};

export default CustomSelect;
