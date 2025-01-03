import Select, { SingleValue } from "react-select";
import { customSelectProps } from "../../types/types";
// import { useEffect, useState } from "react";

const CustomSelect = (props: customSelectProps) => {
  // const [defultVal , setDefultVal] = useState<{ value: any; label: string }| null>(null)

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      borderColor: "transparent",
      borderWidth: 0.5,
    }),
    control: (provided: any) => ({
      ...provided,
      borderColor: "#d1d5db", // Border color of the control
      "&:hover": {
        borderColor: "#d1d5db", // Border color on hover
      },
      boxShadow: "none", // Remove default box-shadow
    }),
    option: (provided: any) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 9999, // Ensure the dropdown is above other elements
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999, // Ensure the portal itself is above all
    }),
  };

  const handleSelectChange = (
    newValue: SingleValue<{ value: any; label: string }>
  ) => {
    //@ts-ignore
    props.onChange(newValue);
  };
//   useEffect(()=>{
//  const editOpitonn = props?.options?.find((option:{ value: any; label: string }) => option.value === props.editOptionId) 
  
//   if(editOpitonn){

//     setDefultVal(editOpitonn)
//   }

//   },[props.editOptionId])
 console.log(props.editOption)
  return (
    <>
      <div className="flex flex-col gap-0">
        <label
          htmlFor=""
          className="text-[16px] font-[500]"
          style={{ marginBottom: "0px" }}
        >
          {props.label}
        </label>
        {props?.options?.length > 0 && (
          <Select
            defaultValue={props.editOption }
         
            className="select_styles"
            options={props?.options}
            isSearchable={false}
            onChange={handleSelectChange}
            styles={customStyles}
            menuPortalTarget={document.body} // Attach menu to the body
          />
        )}
      </div>
    </>
  );
};

export default CustomSelect;
