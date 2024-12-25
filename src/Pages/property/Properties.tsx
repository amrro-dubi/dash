import { useEffect, useState } from "react";

import swal from "sweetalert";

import { Loader } from "@mantine/core";
import {  useDeleteRecordMutation, useGetRecordsQuery } from "../../apis/serveces";
import Main_list from "../../components/reusableComponents/Main_list";

import CustomModal from "../../components/reusableComponents/CustomModal";
import ColumnChooser from "../../components/reusableComponents/tabels";

import { showAlert } from "../../components/Error";

import  { typesRecordesType } from "./PropertyForm";
import { useTranslation } from "react-i18next";
import PropertyForm from "./PropertyForm";
import { useNavigate } from "react-router-dom";
import useDeleteConfirmation from "../../hooks/useDeleteConfirmation";
import usePermissionGurd from "../../hooks/permession/usePermissionGurd";

// type amrro = {
//   data: {amr: string}
// }
export default function Properties() {
  const [page, setPage] = useState(1);

  const {t} = useTranslation()
  const [options, setOptions] = useState<{ value: any; label: string }[]>([]);
  const [arrTypes, setArrTypes] = useState< string []>([]);
  const [devOptions, setDevOptions] = useState<{ value: any; label: string }[]>([]);
  const [cityId, setCityId] = useState('')
  const [areaId, setAreaId] = useState('')
  const [developerId, setDeveloperId] = useState('')
  const [cityOptions, setCityOptions] = useState<{ value: any; label: string }[]>([]);
  const [types, setTypes] = useState <typesRecordesType |null>(null);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate()

  // console.log(cityId, developerId, areaId)
 const resetFilters = ()=>{
  setCityId('')
  setDeveloperId('')
  setAreaId('')
  refetch()
 }
  const { data: allData, isLoading, isSuccess,refetch } = useGetRecordsQuery({
    page: Number(page),
    per_page: 10,
    city_id:cityId,
    developer_id: developerId,
    area_id: areaId,
    url:'admin/product',
    inValid:['products']
  });
 


  const { data:searchData , isSuccess: searchIsSuccess} = useGetRecordsQuery({
   
    searchKeyword: search,
    url:'admin/filterproducts/search',
    inValid:['products']
  }, {skip: search.length === 0} );

  const { data: areaData, isSuccess:areaIsSucces } = useGetRecordsQuery({
   
    city_id:cityId,
    url:'admin/area',
    inValid:['areas']
  });

  console.log(areaData)
  const { data : developersRecordes , isSuccess:developerIsSuccess } = useGetRecordsQuery({
   
  
    url:'admin/developer',
    inValid:['developers']
  });
  const { data : cityRecordes, isSuccess:cityIsSuccess } = useGetRecordsQuery({
   
  
    url:'admin/city',
    inValid:['areas']
  });
  const { data : typesRecordes } = useGetRecordsQuery({
   
  
    url:'admin/type',
    inValid:['types']
  });
  useEffect(() => {
    setTypes(typesRecordes as typesRecordesType)
  }, [typesRecordes]);
 console.log(types)
  const typesHandler = (id:string)=>{
    console.log(id)
    
    
    
        const index = arrTypes?.findIndex(item=> item === id)
    
    
       
        if(index === -1){
    
          const newTypes = [...arrTypes]
          newTypes.push(id)
    
          setArrTypes(newTypes)
    
        } else{
          const newTypes = [...arrTypes]
          newTypes.splice(index, 1)
          setArrTypes(newTypes)
        }
        
      }
    
  const handleSelectChange = (value: { value: any; label: string }, stateName:string) => {
    console.log(value)

    if(stateName ===  'city'){
           setCityId(value.value)
    }
    if(stateName ===  'area'){
           setAreaId(value.value)
    }
    if(stateName ===  'developer'){
           setDeveloperId(value.value)
    }
    
  };

  useEffect(()=>{
    if(search.length === 0){
    
      refetch()
      setData(allData)
    }
    },[search, refetch])



useEffect(()=>{
if(searchIsSuccess){

 setData(searchData)
}
},[searchIsSuccess,searchData])

useEffect(()=>{
  if(isSuccess){
  
   setData(allData)
  }
  },[isSuccess, allData])
 

  useEffect(() => {
    //@ts-ignore

const optionss = areaData?.data?.data?.map((item: any) => {
return { value: item?.id, label: item?.name };
});

setOptions(optionss);
}, [areaIsSucces, areaData]);
useEffect(() => {
    //@ts-ignore

const optionss = developersRecordes?.data?.data?.map((item: any) => {
return { value: item?.id, label: item?.name };
});

setDevOptions(optionss);
}, [developerIsSuccess]);
useEffect(() => {
    //@ts-ignore

const optionss = cityRecordes?.data?.data?.map((item: any) => {
return { value: item?.id, label: item?.name };
});

setCityOptions(optionss);
}, [cityIsSuccess]);
  const [deleteRecord] = useDeleteRecordMutation();




  const [colKeys, setColKeys] = useState<string[]>([]);
  const [finslColsKeys, setFinalKeys] = useState<
    { accessor: string; title: string }[]
  >([]);
  let keys: string[] = [];
  useEffect(() => {
    //@ts-ignore
    if (data?.data?.data?.length > 0) {
      //@ts-ignore
      keys = Object?.keys(data?.data?.data[0]);
      setColKeys(keys);
    }
  }, [isSuccess, data]);

  const colss: { accessor: string; title: string }[] = [];
  useEffect(() => {
    colKeys?.map((key: any, i: number) => {
              //@ts-ignore

      colss?.push({ accessor: key, title: data?.data?.head[i] });
    });
    if (colss?.length > 0) {
      colss?.push({ accessor: "action", title: "Action" });
    }
    setFinalKeys(colss);
  }, [colKeys, isSuccess]);






  const deleteSubmitHandler = useDeleteConfirmation({url:"admin/product", inValid:'products'})
  const viewHander = (id: string) => {
    console.log(id);
  };
  const EditHandelr = (data: any) => {
navigate(`/home/ediPropertiesForm/${data.id}`)  ;
    
  };
  const canDelete = usePermissionGurd('product', 'delete')
  const canedit = usePermissionGurd('product', 'edit')
  const canAdd = usePermissionGurd('product', 'create')
  if (isLoading) {
    return (
      <div>
        {" "}
        <Loader />
      </div>
    );
  }
  //  console.log( navigator.geolocation.getCurrentPosition((position)=> setLocaiton(position)))
  
  console.log(finslColsKeys);
  return (
    <Main_list title={`${t("tableForms.propertiesTitle")}`}>
      {/* <MainPageCard> */}
      {open && (
        <CustomModal openCloseModal={setOpen} title={`${t("tableForms.add")} ${t("tableForms.propertyTitle")}`}>
          <PropertyForm openCloseModal={setOpen} editData={null} />
        </CustomModal>
      )}
      {open && editData?.id && (
        <CustomModal
          openCloseModal={setOpen}
          title={`${t("tableForms.edit")} ${t("tableForms.propertyTitle")}`}
          resetEditData={setEditData}
        >
          <PropertyForm
            editData={editData}
            resetEditData={setEditData}
            openCloseModal={setOpen}
          />
        </CustomModal>
      )}

      <ColumnChooser
        setPage={setPage}
        page={page}
                //@ts-ignore
        Link_Navigation="/home/propertiesForm"
        pagination={data?.data?.pagination}
       
       
        //@ts-ignore
        TableBody={data?.data?.data?.length > 0 ? data?.data?.data : []}
        //@ts-ignore
        tabelHead={finslColsKeys ? finslColsKeys : []}
        Chcekbox={true}
        Page_Add={true}
        
        onDelete={deleteSubmitHandler}
        onView={viewHander}
        onEdit={EditHandelr}
        enable_search={true}
        openCloseModal={setOpen}
       
        setSearch ={setSearch}
        searchValue={search}
        cityOptions={cityOptions}
        areaOptions={options}
        developerOptions={devOptions}
        handleSelect={handleSelectChange}
        resetFilters={resetFilters}
        types={types?.data?.data}
        typesHandler={typesHandler}
        showAddButton={canAdd}
        Enabel_edit={canedit}
        Enabel_delete={canDelete}
      />
   
{/* <div key={new Date()} className="flex">
<GoogleMapComponent   />
</div> */}
  
    </Main_list>
  );
}
