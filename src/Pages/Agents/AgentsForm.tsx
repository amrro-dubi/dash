import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { showAlert } from "../../components/Error";

import InputComponent from "../../components/reusableComponents/InputComponent";

import {
  useCreatRecordMutation,
  useEditRecordMutation,
  useFindRecordQuery,
  
} from "../../apis/serveces";

import Upload_cover from "../../components/reusableComponents/Upload_Cover";

import { useTranslation } from "react-i18next";
import { TagsInput } from "@mantine/core";

interface formDataTyps {
  firstNameEn: string;
  firstNameAr: string;
  lastNameEn: string;
  lastNameAr: string;
  positionEn: string;
  positionAr: string;
  phone: string;
  whatsapp: string;
  email: string;
  
}

export default function AgentsForm({
  editData,
  resetEditData,
  openCloseModal,
}: {
  editData?: any;
  resetEditData?: React.Dispatch<any>;
  openCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const [tags, setTags] = useState<string[]>(['amr']);
  const { data: recordUpdateData, isLoading, isSuccess: recordIsSuccess } =
    useFindRecordQuery(
      { id: editData?.id, url: "admin/agent" },
      { skip: editData === null }
    );
    const {t} = useTranslation()
    
  const [formData, setFormData] = useState<formDataTyps>({
   firstNameEn: '',
    firstNameAr: '',
    lastNameEn: '',
    lastNameAr: '',
    positionEn: '',
    positionAr: '',
    phone: '',
    whatsapp: '',
    email: ''
  });
 
  
  const [file, setFile] = useState<File | null>(null);
  console.log(file);
  const closeModal = () => {
    openCloseModal((prevState) => !prevState);
    if (resetEditData) {
      resetEditData([]);
    }
  };
 
 

  useEffect(() => {
    if (recordIsSuccess) {
      setFormData({
        ...formData,
        firstNameEn: recordUpdateData?.data?.locales?.en?.firstName,
        firstNameAr: recordUpdateData?.data?.locales?.ar?.firstName,
        lastNameEn: recordUpdateData?.data?.locales?.en?.lastName,
        lastNameAr: recordUpdateData?.data?.locales?.ar?.lastName,
        positionEn: recordUpdateData?.data?.locales?.en?.position,
        positionAr: recordUpdateData?.data?.locales?.ar?.position,
        phone: recordUpdateData?.data?.phone,
        whatsapp: recordUpdateData?.data?.whatsapp,
        email: recordUpdateData?.data?.email,
      });
      setFile(recordUpdateData?.data?.image);
      // setTags(recordUpdateData?.data?.tags);
    }
  }, [recordIsSuccess]);
  // const [options, setOptions] = useState<{ value: any; label: string }[]>([]);

  const [toastData, setToastData] = useState<any>({});

  const [createRecord, { isLoading:createIsLoading }] = useCreatRecordMutation();

  // const [editCity ] = useEditCityMutation()
  const [editRecord, {isLoading:editIsLoading}] = useEditRecordMutation();

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

    if (isLoading|| createIsLoading || editIsLoading) {
      toast.loading("Loading...", {
        toastId: "loginLoadingToast",
        autoClose: false,
      });
    } else {
      toast.dismiss("loginLoadingToast");
    }
  }, [toastData, isLoading, createIsLoading, editIsLoading]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataRequest = new FormData();

    formDataRequest.append(`locales[en][firstName]`, formData.firstNameEn);
    formDataRequest.append(`locales[ar][firstName]`, formData.firstNameAr);
    formDataRequest.append(`locales[en][lastName]`, formData.lastNameEn);
    formDataRequest.append(`locales[ar][lastName]`, formData.lastNameAr);
    formDataRequest.append(`locales[en][position]`, formData.positionEn);
    formDataRequest.append(`locales[ar][position]`, formData.positionAr);
    formDataRequest.append(`phone`, formData.phone);
    formDataRequest.append(`whatsapp`, formData.whatsapp);
    formDataRequest.append(`email`, formData.email);

 
    
    
    if (file) {
      formDataRequest.append("image", file);
    }
    
    try {
      if (editData?.id) {
        // formDataRequest.append("_method", 'patch');
        const response = await editRecord({
          id: editData?.id,
          formData: formDataRequest,
          url: "admin/agent",
          inValid: ["agents"],
        });
        console.log(response);
        setToastData(response);
      } else {
        const response = await createRecord({
          formData: formDataRequest,
          url: "admin/agent",
          inValid: ["agents"],
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
      <div className="grid gap-6 mb-4 grid-cols-12">
        <div className="lg:col-span-6 col-span-12">
          <InputComponent
            label={t('tableForms.labels.firstNameEn')}
            onChange={handleChange}
            required
            type="text"
            name="firstNameEn"
            placeholder={t('tableForms.placeholders.name')}
            value={formData.firstNameEn}
          />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <InputComponent
            label={t('tableForms.labels.firstNameAr')}
            onChange={handleChange}
            required
            type="text"
            name="firstNameAr"
            placeholder={t('tableForms.placeholders.name')}
            value={formData.firstNameAr}
          />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <InputComponent
            label={t('tableForms.labels.lastNameEn')}
            onChange={handleChange}
            required
            type="text"
            name="lastNameEn"
            placeholder={t('tableForms.placeholders.name')}
            value={formData.lastNameEn}
          />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <InputComponent
            label={t('tableForms.labels.lastNameAr')}
            onChange={handleChange}
            required
            type="text"
            name="lastNameAr"
            placeholder={t('tableForms.placeholders.name')}
            value={formData.lastNameAr}
          />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <InputComponent
            label={t('tableForms.labels.positionEn')}
            onChange={handleChange}
            required
            type="text"
            name="positionEn"
            placeholder={t('tableForms.placeholders.title')}
            value={formData.positionEn}
          />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <InputComponent
            label={t('tableForms.labels.positionAr')}
            onChange={handleChange}
            required
            type="text"
            name="positionAr"
            placeholder={t('tableForms.placeholders.title')}
            value={formData.positionAr}
          />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <InputComponent
            label={t('tableForms.labels.phone')}
            onChange={handleChange}
            required
            type="text"
            name="phone"
            placeholder={t('tableForms.placeholders.phone')}
            value={formData.phone}
          />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <InputComponent
            label={t('tableForms.labels.whatsapp')}
            onChange={handleChange}
            required
            type="text"
            name="whatsapp"
            placeholder={t('tableForms.placeholders.whatsapp')}
            value={formData.whatsapp}
          />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <InputComponent
            label={t('tableForms.labels.email')}
            onChange={handleChange}
            required
            type="email"
            name="email"
            placeholder={t('tableForms.placeholders.email')}
            value={formData.email}
          />
        </div>
     
        <div className="col-span-12 mt-7">
          {/* @ts-ignore */}
          <Upload_cover setFile={setFile} editImgUrl={file?.original_url} />
        </div>
      </div>

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
          {editData ? t('tableForms.edit') : t('tableForms.add')}
        </button>
      </div>
    </form>
    </>
  );
}
