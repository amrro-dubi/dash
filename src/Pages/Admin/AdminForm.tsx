import React, { useEffect, useState } from "react";

import { z } from "zod";
import { toast } from "react-toastify";
import { showAlert } from "../../components/Error";


import InputComponent from "../../components/reusableComponents/InputComponent";
import CustomSelect from "../../components/reusableComponents/CustomSelect";
import { useCreateAdminMutation, useEditAdminMutation, useGetRolesQuery } from "../../apis/serveces";

import { useValidationMessages } from "../../components/Auth/authValidation";
import { useTranslation } from "react-i18next";
const formSchema = (message: any) =>
  z
    .object({
      password: z.string(),
      confirm_password: z.string(),
      role: z
        .number()
        .min(1, "يجب إدخال الاسم")
        .max(100, "يجب أن يكون الاسم أقل من 100 حرف"),
    })
    .refine(
      (data) => {
        
        return data.password === data.confirm_password;
      },
      {
        message: message.confirmPass,
        path: ["confirm_password"], // Specify the path to the field being validated
      }
    );

interface adminFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  role: string;
}

export default function AdminForm({editData, resetEditData, openCloseModal}:{editData?:any, resetEditData?: React.Dispatch<any>,openCloseModal: React.Dispatch<React.SetStateAction<boolean>>}) {
 const {t} = useTranslation()
  const validationMessages = useValidationMessages();
  const [formData, setFormData] = useState<adminFormData>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "",
  });

  const closeModal = () => {
    openCloseModal((prevState) => !prevState);
    if (resetEditData) {
        resetEditData([]);
    }
};
  useEffect(()=>{
if (editData){
  setFormData({...formData, name:editData?.name, username:editData?.username, email:editData?.email, role: editData?.role?.id})

}
  },[])
  const [options, setOptions] = useState<{ value: any; label: string }[]>([]);

  const [toastData, setToastData] = useState<any>({});

  const [errors, setErrors] = useState<any>({});
  const handleSelectChange = (value: { value: any; label: string }) => {
    setFormData({ ...formData, role: value.value });
  };

  const [createAdmin, {isLoading}] = useCreateAdminMutation()
  const [editAdmin ] = useEditAdminMutation()
  const { data, isSuccess } = useGetRolesQuery({});

  useEffect(() => {
    const optionss = data?.data?.data?.map((item: any) => {
      return { value: item?.id, label: item?.title };
    });
    
    setOptions(optionss);
  }, [isSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData)
  useEffect(() => {
    if (toastData?.data?.status === 200) {
      showAlert("Added", toastData?.data?.response?.message);
      
      setToastData({});
      closeModal()
    }
   
    if (toastData?.error?.status === 422) {
      toast.error(toastData?.error?.response.data?.message, {});
      setToastData({});
    }
    if (toastData?.error?.status === 500) {
      toast.error(toastData?.error?.response?.data?.message, {});
      setToastData({});
    }

    if (isLoading) {
        toast.loading('Loading...', {
            toastId: 'loginLoadingToast',
            autoClose: false,
        });
    }
    else {
      toast.dismiss("loginLoadingToast");
    }
  }, [toastData, isLoading]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataRequest = new FormData();

    formDataRequest.append("name", formData.name);
    formDataRequest.append("username", formData.username);
    formDataRequest.append("email", formData.email);
    formDataRequest.append("password", formData.password);
    formDataRequest.append("password_confirmation", formData.confirm_password);
    formDataRequest.append("role", formData.role);

    // dispatch(modalActions.closeModal())
    const result = formSchema(validationMessages).safeParse(formData);

    // Perform your form submission logic here, such as making an API call.
    // After submission, you can close the modal and clear the form
    if (!result.success) {
      // @ts-ignore
      setErrors(result.error.formErrors.fieldErrors);
      console.log(result.error.formErrors.fieldErrors);
      return;
    }

    try {
      if (editData?.id ) {
        formDataRequest.append("_method", 'patch');
          const response = await editAdmin({ id: editData?.id, formData: formDataRequest });
          console.log(response);
          setToastData(response);
          setErrors({});
         
      } else {
          const response = await createAdmin(formDataRequest);
         
          setToastData(response);
          setErrors({});
      }
    } catch (err) {
      setToastData(err);
      setErrors(err);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 md:p-5">
  <div className="grid gap-4 mb-4 grid-cols-12">
    {/* Name */}
    <div className="lg:col-span-6 col-span-12">
      <InputComponent
        label={t("tableForms.labels.name")}
        onChange={handleChange}
        required
        type="text"
        name="name"
        placeholder={t("tableForms.placeholders.name")}
        value={formData.name}
      />
    </div>

    {/* Username */}
    <div className="lg:col-span-6 col-span-12">
      <InputComponent
        label={t("tableForms.labels.username")}
        onChange={handleChange}
        required
        type="text"
        name="username"
        placeholder={t("tableForms.placeholders.username")}
        value={formData.username}
      />
    </div>

    {/* Email */}
    <div className="lg:col-span-6 col-span-12">
      <InputComponent
        label={t("tableForms.labels.email")}
        type="email"
        required
        onChange={handleChange}
        name="email"
        placeholder={t("tableForms.placeholders.email")}
        value={formData.email}
      />
    </div>

    {/* Password */}
    <div className="lg:col-span-6 col-span-12">
      <InputComponent
        label={t("tableForms.labels.password")}
        type="password"
        required
        onChange={handleChange}
        name="password"
        placeholder={t("tableForms.placeholders.password")}
        value={formData.password}
      />
    </div>

    {/* Confirm Password */}
    <div className="lg:col-span-6 col-span-12">
      <InputComponent
        label={t("tableForms.labels.confirmPassword")}
        required
        type="password"
        name="confirm_password"
        onChange={handleChange}
        placeholder={t("tableForms.placeholders.confirmPassword")}
        value={formData.confirm_password}
      />
      {errors.confirm_password && (
        <p className="text-[#FF0000] text-[12px]">{errors.confirm_password}</p>
      )}
    </div>

    {/* Role */}
    <div className="lg:col-span-6 col-span-12">
      <CustomSelect
        options={options}
        label={t("tableForms.labels.role")}
        onChange={handleSelectChange}
      />
    </div>
  </div>

  {/* Submit Button */}
  <div className="w-full flex justify-end">
    <button
      type="submit"
      className="text-white flex bg-gradient-to-r from-[black] to-[black] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <svg
        className="me-1 -ms-1 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clipRule="evenodd"
        ></path>
      </svg>
      {editData ? t("tableForms.edit") : t("tableForms.add")}
    </button>
  </div>
</form>

    </>
  );
}
