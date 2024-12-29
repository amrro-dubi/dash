import React, { useEffect, useState } from "react";


import { toast } from "react-toastify";
import { showAlert } from "../../components/Error";


import InputComponent from "../../components/reusableComponents/InputComponent";

import {
 
  useCreateRoleMutation,
 
  useEditRecordMutation,
  useFindRecordQuery,
  useGetPermissionsQuery,

} from "../../apis/serveces";
import { useTranslation } from "react-i18next";



interface RolesFormData {
  title: string;

  permissions: string[];
}

export default function RolesForm({
  editData,
  resetEditData,
  openCloseModal,
}: {
  editData?: any;
  resetEditData?: React.Dispatch<any>;
  openCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
 const {t} = useTranslation()
  const [formData, setFormData] = useState<RolesFormData>({
    title: "",

    permissions: [],
  });

  const closeModal = () => {
    openCloseModal((prevState) => !prevState);
    if (resetEditData) {
      resetEditData([]);
    }
  };
  const [editRecord, {isLoading:editIsLoading}] = useEditRecordMutation();
  const { data: recordUpdateData, isSuccess: recordIsSuccess } =
      useFindRecordQuery(
        { id: editData?.id, url: "admin/role" },
        { skip: editData === null }
      );
  
      console.log(recordUpdateData)
  const permissionHandler = (id:string)=>{

    const index = formData?.permissions?.findIndex(item=> item === id)
    if(index === -1){
      const newPermissions = [...formData.permissions,id];
      setFormData({...formData, permissions:newPermissions})
    } else{
      const newPermiss = [...formData.permissions]
      newPermiss.splice(index, 1)
      setFormData({...formData, permissions:newPermiss})
    }
    
  }
  useEffect(() => {
    if (recordIsSuccess) {
      setFormData({
        ...formData,
        title: recordUpdateData?.data?.title,
        permissions: recordUpdateData?.data?.permissions,
      });
    }
  }, [recordIsSuccess]);
  

  const [toastData, setToastData] = useState<any>({});

  

  const [createRole, { isLoading }] = useCreateRoleMutation();

  const { data } = useGetPermissionsQuery({});

  

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

    if (isLoading|| editIsLoading) {
      toast.loading("Loading...", {
        toastId: "loginLoadingToast",
        autoClose: false,
      });
    } else {
      toast.dismiss("loginLoadingToast");
    }
  }, [toastData, isLoading.valueOf,editIsLoading]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataRequest = new FormData();

    formDataRequest.append("title", formData.title);
    for(let i=0; i < formData.permissions.length; i++){

      formDataRequest.append(`permissions[${i}]`, formData.permissions[i])
    }

  if(formData.permissions.length === 0){
    showAlert('error', 'you must select one role')
    return
  }

    try {
      if (editData?.id) {
        formDataRequest.append("_method", "patch");
        const response = await editRecord({
          id: editData?.id,
          formData: formDataRequest,
          url: "admin/role",
          inValid: ["roles",],
        });
        console.log(response);
        setToastData(response);
       
      } else {
        const response = await createRole(formDataRequest);

        setToastData(response);
      
      }
    } catch (err) {
      setToastData(err);
    
    }
  };
  console.log(formData.permissions)
  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 md:p-5 ">
        <div className="grid gap-4  mb-4 grid-cols-12">
          <div className=" flex flex-col gap-8 col-span-12">
            <InputComponent
              label={t('tableForms.labels.title')}
              onChange={handleChange}
              required
              type="text"
              name="title"
              placeholder={t("tableForms.labels.roleTitlePlaceholder")}
              value={formData.title}
            />
            <div className="flex flex-col justify-between w-full gap-[50px]">
            <span>{t("tableForms.permissionTitle")}</span>
              {data?.data?.map((item:any) => {
                for (const [key, value] of Object.entries(item)) {
                  return (
                    <div className="flex flex-col    w-full">
                      
                      <div className="flex">{key} </div>
                        <div className="flex justify-around items-center gap-3 pt-3">
                        {/* @ts-ignore */}
                        {value?.permissions?.map((per:any) => (
                          <span className="flex gap-3 items-center"> <input type="checkbox" checked={formData?.permissions?.includes(per?.id)} onChange={()=>permissionHandler(per?.id)} className="form-checkbox" />{per?.title} </span>
                        ))}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
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
