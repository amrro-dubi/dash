import React, { useEffect, useState } from "react";

import { z } from "zod";
import { toast } from "react-toastify";
import { showAlert } from "../../components/Error";
import { useNavigate } from "react-router-dom";
// import LoadingButton from '../../components/reusableComponents/Loading_button';
import InputComponent from "../../components/reusableComponents/InputComponent";
import CustomSelect from "../../components/reusableComponents/CustomSelect";
import { useCreateAdminMutation, useGetRolesQuery } from "../../apis/serveces";
// import { useCreateCategoryMutation, useEditCategoryMutation } from '../../../api/Resturants/Categories';
import { useValidationMessages } from "../../components/Auth/authValidation";
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
        // Check if password matches password_confirmation
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

export default function AdminForm(props: adminFormData) {
  const navigate = useNavigate();
  const validationMessages = useValidationMessages();
  const [formData, setFormData] = useState<adminFormData>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "",
  });
  const [options, setOptions] = useState<{ value: any; label: string }[]>([]);

  const [toastData, setToastData] = useState<any>({});

  const [errors, setErrors] = useState<any>({});
  const handleSelectChange = (value: { value: any; label: string }) => {
    setFormData({ ...formData, role: value.value });
  };

  const [createAdmin, {isLoading}] = useCreateAdminMutation()
  const { data, isSuccess } = useGetRolesQuery();

  useEffect(() => {
    const optionss = data?.data?.map((item: any) => {
      return { value: item?.id, label: item?.title };
    });
    console.log(optionss);
    setOptions(optionss);
  }, [isSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // useEffect(() => {
  //     setFormData({
  //         ...formData,
  //         name: props?.data?.name,
  //     });
  // }, []);
  console.log(formData);
  useEffect(() => {
    if (toastData?.data?.status === 200) {
      showAlert("Added", toastData?.data?.response?.message);
      
      setToastData({});
    }
    console.log(toastData.data);
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
      if (props?.data?.id) {
        //   const response = await editCategory({ id: props?.data?.id, formData });
        //   console.log(response);
        //   setToastData(response);
        //   setErrors({});
      } else {
          const response = await createAdmin(formDataRequest);
          console.log(response);
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
        <div className="grid gap-4  mb-4 grid-cols-12">
          <div className="lg:col-span-6 col-span-12">
            <InputComponent
              label="Name"
              onChange={handleChange}
              required
              type="text"
              name="name"
              placeholder="please enter name"
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <InputComponent
              label="username"
              onChange={handleChange}
              required
              type="text"
              name="username"
              placeholder="please enter name"
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <InputComponent
              label="Email"
              type="email"
              required
              onChange={handleChange}
              name="email"
              placeholder="please enter email"
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <InputComponent
              label="password"
              type="password"
              required
              onChange={handleChange}
              name="password"
              placeholder="please enter password"
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <InputComponent
              label="Confirm Password"
              required
              type="password"
              name="confirm_password"
              onChange={handleChange}
              placeholder="please enter confirm_password"
            />
            {errors.confirm_password && (
            <p className="text-[#FF0000] text-[12px]">
              {errors.confirm_password}
            </p>
          )}
          </div>
          
          <div className="lg:col-span-6 col-span-12">
            <CustomSelect
              options={options}
              label="Role"
              onChange={handleSelectChange}
            />{" "}
          </div>

          {/* <div className="lg:col-span-2 col-span-12  ">
                        <h2 className="text-[#2E2E2E] text-center text-[16px] font-medium   pb-5">Delivery</h2>

                        <div className="flex gap-4 capitalize items-center justify-center ">
                            <span className={!isChecked ? 'text-red-500 font-semibold text-[16px]' : 'text-[16px]'}>No</span>

                            <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                                <input
                                    id="switch-2"
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-red-500 peer-checked:border-red-500 peer-checked:before:bg-red-500"
                                />
                                <label
                                    htmlFor="switch-2"
                                    className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-red-500 peer-checked:before:bg-red-500"
                                >
                                    <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" data-ripple-dark="true"></div>
                                </label>
                            </div>
                            <span className={isChecked ? 'text-red-500 font-semibold text-[16px]' : 'text-[16px]'}>Yes</span>
                        </div>
                    </div> */}
          {/* <div className="col-span-12  ">
                        <label htmlFor="price" className="block mb-2 text-[16px] font-medium text-[#2E2E2E]  dark:text-white">
                            Image
                        </label>
                        <Upload setFile={setFile} editImgUrl={props?.data ? props?.data?.image : null} />
                    </div> */}
        </div>
        <div className="w-full  flex justify-end">
          {/* {isLoading ||editIsLoading ? (
                        <>
                            <LoadingButton />
                        </>
                    ) : ( */}
          <>
            <button
              type="submit"
              className="text-white flex    bg-gradient-to-r from-[black] to-[black]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              Add
            </button>
          </>
        </div>
      </form>
    </>
  );
}
