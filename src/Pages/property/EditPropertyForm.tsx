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
import CustomDataInput from "../../components/reusableComponents/DateInput";

import { useNavigate, useParams } from "react-router-dom";


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
  has_studio: string;
  addressEn: string;
  addressAr: string;
  payment_planEn: string;
  payment_planAr: string;
  handover_date: Date | null;
  lat: string,
    long: string,
  area_id:string;
    developer_id :string
    category_id :string
}


type typesRecordesType = {
  data: { head: string[], data: { id: string, name: string }[] }
}
export default function EditPropertyForm() {


  const {propertyId} = useParams()
  console.log(propertyId)
  const { data: recordUpdateData, isSuccess: recordIsSuccess } =
    useFindRecordQuery(
      { id: propertyId, url: "admin/product" },
      
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
    area_id:"",
    developer_id :"",
    category_id :"",
    has_studio: '0',
    handover_date: new Date(),
    lat: '',
    long: ''
  });
  const [options, setOptions] = useState<{ value: any; label: string }[]>([]);
  const [arrTypes, setArrTypes] = useState< string []>([]);
  const [devOptions, setDevOptions] = useState<{ value: any; label: string }[]>([]);
  const [catOptions, setCatOptions] = useState<{ value: any; label: string }[]>([]);
   {/* @ts-ignore */}
  const [editOptionId, setEditOptionId] = useState<{ value: any; label: string } |null>(null);
  const [isOffPlan, setIsOffPlan] = useState(false);
  const handleSelectChange = (value: { value: any; label: string }) => {
    // console.log(value)
    setFormData({ ...formData, area_id: value.value });
  };
  const handleSelectDevChange = (value: { value: any; label: string }) => {
    console.log(value)
    setFormData({ ...formData, developer_id: value.value });
  };
  
  const handleSelectCatChange = (value: { value: any; label: string }) => {
    console.log(value.label)
    if(value.label === 'Off plan'){
      setIsOffPlan(true)
    }else{
      setIsOffPlan(false)
    }
    setFormData({ ...formData, category_id: value.value });
  };
  console.log('formData', formData)
  const [files, setFile] = useState<File[] | null>([]);
  const [cover, setCover] = useState<File | null>(null);
  const [layout, setLayout] = useState<File | null>(null);
  const [brochure, setBrochure] = useState<File | null>(null);
  const navigate = useNavigate()
 
 
  const { data, isLoading, isSuccess } = useGetRecordsQuery({
    url:'admin/area',
    inValid:['areas']
  });

  const { data : developersRecordes , isSuccess:developerIsSuccess } = useGetRecordsQuery({
    url:'admin/developer',
    inValid:['developers']
  });

  const { data : categoriesRecordes, isSuccess:categoriesIsSuccess } = useGetRecordsQuery({
    url:'admin/category',
    inValid:['categories']
  });

  const { data : typesRecordes } = useGetRecordsQuery({
   
  
    url:'admin/type',
    inValid:['types']
  });

   const types = typesRecordes as typesRecordesType
 

   useEffect(() => {
if(recordIsSuccess){
  setFormData({
    ...formData,
    titleEn: recordUpdateData?.data?.locales?.en?.title,
    titleAr: recordUpdateData?.data?.locales?.ar?.title,
    sub_titleEn: recordUpdateData?.data?.locales?.en?.sub_title,
    sub_titleAr: recordUpdateData?.data?.locales?.ar?.sub_title,
    descriptionEn: recordUpdateData?.data?.locales?.en?.description,
    descriptionAr: recordUpdateData?.data?.locales?.ar?.description,
    addressEn: recordUpdateData?.data?.locales?.en?.address,
    addressAr: recordUpdateData?.data?.locales?.ar?.address,
    payment_planEn: recordUpdateData?.data?.locales?.en?.payment_plan,
    payment_planAr: recordUpdateData?.data?.locales?.ar?.payment_plan,
    max_size: recordUpdateData?.data?.details?.max_size,
    min_size: recordUpdateData?.data?.details?.min_size,
    max_bathrooms_count: recordUpdateData?.data?.details?.max_bathrooms_count,
    min_bathrooms_count: recordUpdateData?.data?.details?.min_bathrooms_count,
    price: recordUpdateData?.data?.details?.price,
    lat: recordUpdateData?.data?.location?.lat,
    long: recordUpdateData?.data?.location?.long,
    has_studio: recordUpdateData?.data?.has_studio === true ? "1" : "0",
    category_id: recordUpdateData?.data?.category?.id,
    developer_id: recordUpdateData?.data?.developer?.id,
    area_id: recordUpdateData?.data?.area?.id,
    handover_date: recordUpdateData?.data?.handover_date
  });
  setFile(recordUpdateData?.data?.images)
  setCover(recordUpdateData?.data?.cover)
  setLayout(recordUpdateData?.data?.layout)
  setBrochure(recordUpdateData?.data?.brochure)
  
}
    // recordUpdateData
   },[recordIsSuccess])
  useEffect(() => {
            //@ts-ignore

    const optionss = data?.data?.data?.map((item: any) => {
      return { value: item?.id, label: item?.name };
    });
    
    if(optionss?.length > 0){
      
      setFormData({...formData, area_id: optionss[0]?.value})
    }
    setOptions(optionss);
  }, [isSuccess]);
  useEffect(() => {
            //@ts-ignore

    const optionss = developersRecordes?.data?.data?.map((item: any) => {
      return { value: item?.id, label: item?.name };
    });
    
    setDevOptions(optionss);
    if(optionss?.length > 0){
    setFormData({...formData, developer_id: optionss[0]?.value})
    }
  }, [developerIsSuccess]);
  useEffect(() => {
            //@ts-ignore

    const optionss = categoriesRecordes?.data?.data?.map((item: any) => {
      return { value: item?.id, label: item?.name };
    });
    if(optionss?.length > 0){
    setFormData({...formData, category_id: optionss[0]?.value})
    }
    setCatOptions(optionss);
  }, [categoriesIsSuccess]);



console.log(formData)
  const [toastData, setToastData] = useState<any>({});
//@ts-ignore
  const [createRecord, { isLoading:createIsLoading }] = useCreatRecordMutation();

  // const [editCity ] = useEditCityMutation()
  const [editRecord, {isLoading:editIsLoading}] = useEditRecordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const typesHandler = (id:string)=>{

    const index = arrTypes?.findIndex(item=> item === id)
    if(index === -1){
      const newTypes = [...arrTypes,id];
      setArrTypes(newTypes)
    } else{
      const newTypes = arrTypes
      newTypes.splice(index, 1)
      setArrTypes(newTypes)
    }
    
  }

  useEffect(() => {
    if (toastData?.data?.status === 200) {
      showAlert("Added", toastData?.data?.response?.message);

      setToastData({});
      navigate('/home/properties')
      // closeModal();
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


  // Append Arabic fields
  formDataRequest.append("locales[ar][title]", formData.titleAr);
  formDataRequest.append("locales[ar][sub_title]", formData.sub_titleAr);
  formDataRequest.append("locales[ar][description]", formData.descriptionAr);
  formDataRequest.append("locales[ar][address]", formData.addressAr);
  formDataRequest.append("locales[ar][payment_plan]", formData.payment_planAr);

  // Append English fields
  formDataRequest.append("locales[en][title]", formData.titleEn);
  formDataRequest.append("locales[en][sub_title]", formData.sub_titleEn);
  formDataRequest.append("locales[en][description]", formData.descriptionEn);
  formDataRequest.append("locales[en][address]", formData.addressEn);
  formDataRequest.append("locales[en][payment_plan]", formData.payment_planEn);

  // Append other fields
  formDataRequest.append("max_size", formData.max_size);
  formDataRequest.append("min_size", formData.min_size);
  formDataRequest.append("max_bathrooms_count", formData.max_bathrooms_count);
  formDataRequest.append("min_bathrooms_count", formData.min_bathrooms_count);
  formDataRequest.append("price", formData.price);
  formDataRequest.append("area_id", formData.area_id);
  formDataRequest.append("developer_id", formData.developer_id);
  formDataRequest.append("category_id", formData.category_id);
  formDataRequest.append("has_studio", formData.has_studio);
  formDataRequest.append("category_id", formData.category_id);
  formDataRequest.append("location[lat]", formData.lat);
  formDataRequest.append("location[long]", formData.long);
  arrTypes?.forEach((arrtype, index) => {
    formDataRequest.append(`types[${index}]`, arrtype);
  });
  // Append files if they exist
  if (files) {
    files.forEach((file, index) => {
      formDataRequest.append(`images[${index}]`, file);
    });
  }
  if (cover) {
    formDataRequest.append("cover", cover);
  }
  if (layout) {
    formDataRequest.append("layout", layout);
  }
  if (brochure) {
    formDataRequest.append("brochure", brochure);
  }

    // formDataRequest.append("city_id", formData.city_id);
    // if (file) {
    //   formDataRequest.append("image", file);
    // }
    
    try {
    
        // formDataRequest.append("_method", 'patch');
        const response = await editRecord({
          //@ts-ignore
          id: propertyId,
          formData: formDataRequest,
          url: "admin/area",
          inValid: ["areas",],
          method: "PATCH",
        });
        console.log(response);
        setToastData(response);
      
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
    type="text"
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
    type="text"
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
    type="text"
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
    type="text"
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
    type="text"
    name="price"
    placeholder={t("tableForms.placeholders.price")}
    value={formData.price}
  />
</div>

          <div className="lg:col-span-6 col-span-12">
            <CustomSelect
            // editOptionId={editOptionId}
              options={options}
              label={t("tableForms.labels.city")}
              onChange={handleSelectChange}
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <CustomSelect
            // editOptionId={editOptionId}
              options={devOptions}
              label={t("tableForms.labels.developersTitels")}
              onChange={handleSelectDevChange}
            />{" "}
          </div>
          <div className="lg:col-span-6 col-span-12">
            <CustomSelect
            // editOptionId={editOptionId}
              options={catOptions}
              label={t("tableForms.labels.categoriesTitle")}
              onChange={handleSelectCatChange}
            />{" "}
          </div>
          {isOffPlan && (      <div className="lg:col-span-6 col-span-12">
            <CustomDataInput
             label="HandOverDate"
             value={formData.handover_date}
             onChange={(date) => setFormData({ ...formData, handover_date: date as Date | null })}
            />
          </div>)}
    
          <div className=" lg:col-span-6 col-span-12   mt-7">

         <div className="flex gap-4   "><span className="font-bold">has studio </span> <label className="inline-flex items-center me-5 cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" onChange={(e) => setFormData({...formData, has_studio: e.target.checked ? "1" : "0" })} checked={formData.has_studio === "1"} />
                                  <div className="relative w-11 h-6 bg-gray-200 rounded-full  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-[#af7a3d] to-[#ecb022]"></div>
                              </label></div>

          </div>
          <div className={`${!isOffPlan ? 'lg:col-span-6 col-span-12' : 'lg:col-span-12 col-span-12'} mt-7`}>

       <div className="flex gap-4"> <span className="font-bold">Types :  </span>   
       {types?.data?.data?.map((type : {id:string, name:string}) => {
        return (                       
            

          <span>{type?.name}  <input type="checkbox" checked={arrTypes.includes(type?.id)} onChange={()=>typesHandler(type?.id)} className="form-checkbox" /></span>

          
        
       

      )
       })}
       </div> 
          </div>
          <div className=" col-span-12 md:col-span-3 mt-7">
           {/* @ts-ignore */}
            <Upload_cover multi label="tableForms.labels.images" setFile={setFile} editImgUrl={files[0]? files[0]?.original_url :""} />
          </div>
          <div className=" col-span-12 md:col-span-3 mt-7">
            {/* @ts-ignore */}
            <Upload_cover label="tableForms.labels.cover" setFile={setCover} cover editImgUrl={cover?.original_url} />
          </div>
          <div className=" col-span-12 md:col-span-3 mt-7">
            {/* @ts-ignore */}
            <Upload_cover label="tableForms.labels.brochure"  setFile={setBrochure} editImgUrl={brochure?.original_url} />
          </div>
          <div className=" col-span-12 md:col-span-3 mt-7">
            {/* @ts-ignore */}
            <Upload_cover label="tableForms.labels.layout" setFile={setLayout}  editImgUrl={layout?.original_url} />
          </div>

          <div className="lg:col-span-6 col-span-12">

  <InputComponent
    label="long"
    onChange={handleChange}
    required
    type="text"
    name="long"
    placeholder="enter long"
    value={formData.long}
  />
</div>
<div className="lg:col-span-6 col-span-12">
  <InputComponent
    label="lat"
    onChange={handleChange}
    required
    type="text"
    name="lat"
    placeholder="enter lat"
    value={formData.lat}
  />
</div>

          {/* <div className=" col-span-12 md:col-span-6  mt-7 ">  */}

  {/* <div  className="flex w-full"> 
 <GoogleMapComponent   />
 </div>  */}
           {/* </div> */}
          
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
              { t("tableForms.edit") }
            </button>
          </>
        </div>
      </form>
    </>
  );
}
