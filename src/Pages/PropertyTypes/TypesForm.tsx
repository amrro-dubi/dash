import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { showAlert } from "../../components/Error";

import InputComponent from "../../components/reusableComponents/InputComponent";

import {
  useCreatRecordMutation,
  useEditRecordMutation,
  useFindRecordQuery,
} from "../../apis/serveces";


import { useTranslation } from "react-i18next";

interface formDataTyps {
  nameEn: string;
  nameAr: string;
}

export default function TypesForm({
  editData,
  resetEditData,
  openCloseModal,
}: {
  editData?: any;
  resetEditData?: React.Dispatch<any>;
  openCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const {t} = useTranslation()
  const { data: recordUpdateData, isSuccess: recordIsSuccess } =
    useFindRecordQuery(
      { id: editData?.id, url: "admin/type" },
      { skip: editData === null }
    );

  const [formData, setFormData] = useState<formDataTyps>({
    nameEn: "",
    nameAr: "",
  });

 
  
  const closeModal = () => {
    openCloseModal((prevState) => !prevState);
    if (resetEditData) {
      resetEditData([]);
    }
  };
  console.log(editData);
  useEffect(() => {
    if (recordIsSuccess) {
      setFormData({
        ...formData,
        nameEn: recordUpdateData?.data?.locales?.en?.name,
        nameAr: recordUpdateData?.data?.locales?.ar?.name,
      });
      
    }
  }, [recordIsSuccess]);
  // const [options, setOptions] = useState<{ value: any; label: string }[]>([]);

  const [toastData, setToastData] = useState<any>({});

  const [createRecord, { isLoading }] = useCreatRecordMutation();

  // const [editCity ] = useEditCityMutation()
  const [editRecord] = useEditRecordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);
  useEffect(() => {
    if (toastData?.data?.status === 200) {
      showAlert("Added", toastData?.data?.response?.message);

      setToastData({});
      closeModal();
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
      toast.loading("Loading...", {
        toastId: "loginLoadingToast",
        autoClose: false,
      });
    } else {
      toast.dismiss("loginLoadingToast");
    }
  }, [toastData, isLoading]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formDataRequest = new FormData();

    // formDataRequest.append("locales[ar][name]", formData.nameAr);
    // formDataRequest.append("locales[en][name]", formData.nameEn);
    
  const payload = {locales:{
    ar:{
      name:formData.nameAr },
    en:{
      name:formData.nameEn }
  
  }}
    try {
      if (editData?.id) {
        // formDataRequest.append("_method", 'patch');
        const response = await editRecord({
          id: editData?.id,
          formData: payload,
          url: "admin/type",
          method:"PATCH",
          inValid: ["types"],
        });
        console.log(response);
        setToastData(response);
      } else {
        const response = await createRecord({
          formData: payload,
          url: "admin/type",
          inValid: ["types"],
        });

        setToastData(response);
      }
    } catch (err) {
      setToastData(err);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 md:p-5">
        <div className="grid gap-6  mb-4 grid-cols-12">
          <div className="lg:col-span-6 col-span-12">
            <InputComponent
            label={t("tableForms.labels.nameEn")}
              onChange={handleChange}
              required
              type="text"
              name="nameEn"
              placeholder={t("tableForms.placeholders.name")}
              value={formData.nameEn}
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <InputComponent
               label={t("tableForms.labels.nameAr")}
              onChange={handleChange}
              required
              type="text"
              name="nameAr"
              placeholder={t("tableForms.placeholders.name")}
              value={formData.nameAr}
            />
          </div>

          
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
              {editData ? t("tableForms.edit") : t("tableForms.add")}
            </button>
          </>
        </div>
      </form>
    </>
  );
}
