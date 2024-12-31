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
  titleEn: string;
  titleAr: string;
  descriptionAr: string;
  descriptionEn: string;
  
}

export default function BlogsForm({
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
      { id: editData?.id, url: "admin/blog" },
      { skip: editData === null }
    );
    const {t} = useTranslation()
    
  const [formData, setFormData] = useState<formDataTyps>({
    titleEn: "",
    titleAr: "",
    descriptionAr: "",
  descriptionEn: ""
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
        titleEn: recordUpdateData?.data?.locales?.en?.title,
        titleAr: recordUpdateData?.data?.locales?.ar?.title,
        descriptionEn: recordUpdateData?.data?.locales?.en?.description,
        descriptionAr: recordUpdateData?.data?.locales?.ar?.description,
      });
      setFile(recordUpdateData?.data?.image);
      setTags(recordUpdateData?.data?.tags)


     
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

    formDataRequest.append("locales[ar][title]", formData.titleAr);
    formDataRequest.append("locales[en][title]", formData.titleEn);
    formDataRequest.append("locales[ar][description]", formData.descriptionAr);
    formDataRequest.append("locales[en][description]", formData.descriptionEn);

  tags.forEach((tage:string, index:number)=>{
           formDataRequest.append(`tags[${index}]`, tage);
  })
    
    
    if (file) {
      formDataRequest.append("image", file);
    }
    
    try {
      if (editData?.id) {
        // formDataRequest.append("_method", 'patch');
        const response = await editRecord({
          id: editData?.id,
          formData: formDataRequest,
          url: "admin/blog",
          inValid: ["blogs"],
        });
        console.log(response);
        setToastData(response);
      } else {
        const response = await createRecord({
          formData: formDataRequest,
          url: "admin/blog",
          inValid: ["blogs"],
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
              label={t("tableForms.labels.titleEn")}
              onChange={handleChange}
              required
              type="text"
              name="titleEn"
              placeholder={t("tableForms.placeholders.title")}
              value={formData.titleEn}
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <InputComponent
              label={t("tableForms.labels.titleAr")}
              onChange={handleChange}
              required
              type="text"
              name="titleAr"
              placeholder={t("tableForms.placeholders.title")}
              value={formData.titleAr}
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <InputComponent
              label={t("tableForms.labels.descEn")}
              onChange={handleChange}
              required
              type="text"
              name="descriptionEn"
              placeholder={t("tableForms.placeholders.desc")}
              value={formData.descriptionEn}
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <InputComponent
              label={t("tableForms.labels.descAr")}
              onChange={handleChange}
              required
              type="text"
              name="descriptionAr"
              placeholder={t("tableForms.placeholders.desc")}
              value={formData.descriptionAr}
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <label htmlFor=""> Tags</label>
          <TagsInput
     
      classNames={{pill:'bg-[#EFB93F] ps-2  text-white ',  input: " border rounded-[8px] border-gray-300 bg-[#F5F5F5] p-3.5" }}
      placeholder="Enter tag"
      
      value={tags} onChange={setTags}
       
      clearable
    />
          </div>
         
          <div className=" col-span-12 mt-7">
            {/* @ts-ignore */}
            <Upload_cover setFile={setFile} editImgUrl={file?.original_url} />
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