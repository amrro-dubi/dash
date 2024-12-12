import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { showAlert } from "../../components/Error";

import InputComponent from "../../components/reusableComponents/InputComponent";

import {
  useCreatRecordMutation,
  useEditRecordMutation,
  useFindRecordQuery,
  useGetRecordsQuery,
} from "../../apis/serveces";

import Upload_cover from "../../components/reusableComponents/Upload_Cover";
import CustomSelect from "../../components/reusableComponents/CustomSelect";

interface formDataTyps {
  nameEn: string;
  nameAr: string;
  city_id: string;
}

export default function CitesForm({
  editData,
  resetEditData,
  openCloseModal,
}: {
  editData?: any;
  resetEditData?: React.Dispatch<any>;
  openCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: recordUpdateData, isSuccess: recordIsSuccess } =
    useFindRecordQuery(
      { id: editData?.id, url: "admin/area" },
      { skip: editData === null }
    );

  const [formData, setFormData] = useState<formDataTyps>({
    nameEn: "",
    nameAr: "",
    city_id:""
  });
  const [options, setOptions] = useState<{ value: any; label: string }[]>([]);
  const handleSelectChange = (value: { value: any; label: string }) => {
    console.log(value)
    setFormData({ ...formData, city_id: value.value });
  };
  const [file, setFile] = useState<File | null>(null);
  console.log(file);
  const closeModal = () => {
    openCloseModal((prevState) => !prevState);
    if (resetEditData) {
      resetEditData([]);
    }
  };
  const { data, isLoading, isSuccess } = useGetRecordsQuery({
   
  
    url:'admin/city',
    inValid:['areas']
  });

  console.log(data)
  useEffect(() => {
    const optionss = data?.data?.data?.map((item: any) => {
      return { value: item?.id, label: item?.name };
    });
    
    setOptions(optionss);
  }, [isSuccess]);
  useEffect(() => {
    if (recordIsSuccess) {
      setFormData({
        ...formData,
        nameEn: recordUpdateData?.data?.locales?.en?.name,
        nameAr: recordUpdateData?.data?.locales?.ar?.name,
      });
      setFile(recordUpdateData?.data?.image);
    }
  }, [recordIsSuccess]);
  // const [options, setOptions] = useState<{ value: any; label: string }[]>([]);

  const [toastData, setToastData] = useState<any>({});

  const [createRecord, { isLoading:createIsLoading }] = useCreatRecordMutation();

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

    if (isLoading || createIsLoading) {
      toast.loading("Loading...", {
        toastId: "loginLoadingToast",
        autoClose: false,
      });
    } else {
      toast.dismiss("loginLoadingToast");
    }
  }, [toastData, isLoading, createIsLoading]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataRequest = new FormData();

    formDataRequest.append("locales[ar][name]", formData.nameAr);
    formDataRequest.append("locales[en][name]", formData.nameEn);
    formDataRequest.append("city_id", formData.city_id);
    if (file) {
      formDataRequest.append("image", file);
    }

    try {
      if (editData?.id) {
        // formDataRequest.append("_method", 'patch');
        const response = await editRecord({
          id: editData?.id,
          formData: formDataRequest,
          url: "admin/area",
          inValid: ["areas",],
        });
        console.log(response);
        setToastData(response);
      } else {
        const response = await createRecord({
          formData: formDataRequest,
          url: "admin/area",
          inValid: ["areas"],
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
              label="Name En"
              onChange={handleChange}
              required
              type="text"
              name="nameEn"
              placeholder="please enter name"
              value={formData.nameEn}
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <InputComponent
              label="Name Ar"
              onChange={handleChange}
              required
              type="text"
              name="nameAr"
              placeholder="please enter name"
              value={formData.nameAr}
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <CustomSelect
              options={options}
              label="City"
              onChange={handleSelectChange}
            />{" "}
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
              {editData ? "Edit" : "Add"}
            </button>
          </>
        </div>
      </form>
    </>
  );
}
