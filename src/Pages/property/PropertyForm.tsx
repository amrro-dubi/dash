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
import { useTranslation } from "react-i18next";

interface formDataTyps {
  titleEn: string;
  titleAr: string;
  sub_titleEn: string;
  sub_titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  max_size: string;
  min_size: string;
  max_bathrooms_count:string;
  min_bathrooms_count:string;
  price:string;

  addressEn: string;
  addressAr: string;
  payment_planEn: string;
  payment_planAr: string;
  city_id: string;
}

export default function PropertyForm({
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
    const {t} = useTranslation()
    
  const [formData, setFormData] = useState<formDataTyps>({
    titleEn: '',
    titleAr: '',
    sub_titleEn: '',
    sub_titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    addressEn: '',
    addressAr: '',
    payment_planEn: '',
    payment_planAr: '',
    max_size: '',
    min_size: '',
    max_bathrooms_count:'',
    min_bathrooms_count:'',
    price:'',
    city_id:""
  });
  const [options, setOptions] = useState<{ value: any; label: string }[]>([]);
  const [editOptionId, setEditOptionId] = useState<{ value: any; label: string } |null>(null);
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
    inValid:['cites']
  });

  console.log(data)
  useEffect(() => {
            //@ts-ignore

    const optionss = data?.data?.data?.map((item: any) => {
      return { value: item?.id, label: item?.name };
    });
    
    setOptions(optionss);
  }, [isSuccess]);
  useEffect(() => {
    if (recordIsSuccess) {
      setFormData({
        ...formData,
        // nameEn: recordUpdateData?.data?.locales?.en?.name,
        // nameAr: recordUpdateData?.data?.locales?.ar?.name,
        city_id: recordUpdateData?.data?.city?.id,
      });
      setFile(recordUpdateData?.data?.image);


      // const editOpitonn = options?.find((option:{ value: any; label: string }) => option.value === recordUpdateData?.data?.city?.id ) 
      // console.log('defult opton', editOpitonn)
      if(recordUpdateData?.data?.city?.id){

        setEditOptionId(recordUpdateData?.data?.city?.id)
      }
    }
  }, [recordIsSuccess]);
  // const [options, setOptions] = useState<{ value: any; label: string }[]>([]);
console.log(editOptionId)
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

    if (isLoading || createIsLoading || editIsLoading) {
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

    // formDataRequest.append("locales[ar][name]", formData.nameAr);
    // formDataRequest.append("locales[en][name]", formData.nameEn);
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
    label={t("tableForms.labels.sub_titleEn")}
    onChange={handleChange}
    required
    type="text"
    name="sub_titleEn"
    placeholder={t("tableForms.placeholders.sub_title")}
    value={formData.sub_titleEn}
  />
</div>
<div className="lg:col-span-6 col-span-12">
  <InputComponent
    label={t("tableForms.labels.sub_titleAr")}
    onChange={handleChange}
    required
    type="text"
    name="sub_titleAr"
    placeholder={t("tableForms.placeholders.sub_title")}
    value={formData.sub_titleAr}
  />
</div>
<div className="lg:col-span-6 col-span-12">
  <InputComponent
    label={t("tableForms.labels.descriptionEn")}
    onChange={handleChange}
    required
    type="text"
    name="descriptionEn"
    placeholder={t("tableForms.placeholders.description")}
    value={formData.descriptionEn}
  />
</div>
<div className="lg:col-span-6 col-span-12">
  <InputComponent
    label={t("tableForms.labels.descriptionAr")}
    onChange={handleChange}
    required
    type="text"
    name="descriptionAr"
    placeholder={t("tableForms.placeholders.description")}
    value={formData.descriptionAr}
  />
</div>
<div className="lg:col-span-6 col-span-12">
  <InputComponent
    label={t("tableForms.labels.addressEn")}
    onChange={handleChange}
    required
    type="text"
    name="addressEn"
    placeholder={t("tableForms.placeholders.address")}
    value={formData.addressEn}
  />
</div>
<div className="lg:col-span-6 col-span-12">
  <InputComponent
    label={t("tableForms.labels.addressAr")}
    onChange={handleChange}
    required
    type="text"
    name="addressAr"
    placeholder={t("tableForms.placeholders.address")}
    value={formData.addressAr}
  />
</div>
<div className="lg:col-span-6 col-span-12">
  <InputComponent
    label={t("tableForms.labels.payment_planEn")}
    onChange={handleChange}
    required
    type="text"
    name="payment_planEn"
    placeholder={t("tableForms.placeholders.payment_plan")}
    value={formData.payment_planEn}
  />
</div>
<div className="lg:col-span-6 col-span-12">
  <InputComponent
    label={t("tableForms.labels.payment_planAr")}
    onChange={handleChange}
    required
    type="text"
    name="payment_planAr"
    placeholder={t("tableForms.placeholders.payment_plan")}
    value={formData.payment_planAr}
  />
</div>

<div className="lg:col-span-6 col-span-12">
  <InputComponent
    label={t("tableForms.labels.max_size")}
    onChange={handleChange}
    required
    type="number"
    name="max_size"
    placeholder={t("tableForms.placeholders.max_size")}
    value={formData.max_size}
  />
</div>
<div className="lg:col-span-6 col-span-12">
  <InputComponent
    label={t("tableForms.labels.min_size")}
    onChange={handleChange}
    required
    type="number"
    name="min_size"
    placeholder={t("tableForms.placeholders.min_size")}
    value={formData.min_size}
  />
</div>
<div className="lg:col-span-6 col-span-12">
  <InputComponent
    label={t("tableForms.labels.max_bathrooms_count")}
    onChange={handleChange}
    required
    type="number"
    name="max_bathrooms_count"
    placeholder={t("tableForms.placeholders.max_bathrooms_count")}
    value={formData.max_bathrooms_count}
  />
</div>
<div className="lg:col-span-6 col-span-12">
  <InputComponent
    label={t("tableForms.labels.min_bathrooms_count")}
    onChange={handleChange}
    required
    type="number"
    name="min_bathrooms_count"
    placeholder={t("tableForms.placeholders.min_bathrooms_count")}
    value={formData.min_bathrooms_count}
  />
</div>
<div className="lg:col-span-6 col-span-12">
  <InputComponent
    label={t("tableForms.labels.price")}
    onChange={handleChange}
    required
    type="number"
    name="price"
    placeholder={t("tableForms.placeholders.price")}
    value={formData.price}
  />
</div>

          <div className="lg:col-span-6 col-span-12">
            <CustomSelect
            editOptionId={editOptionId}
              options={options}
              label={t("tableForms.labels.city")}
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
              {editData ? t("tableForms.edit") : t("tableForms.add")}
            </button>
          </>
        </div>
      </form>
    </>
  );
}