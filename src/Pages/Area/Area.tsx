import { useEffect, useState } from "react";

import swal from "sweetalert";

import { Loader } from "@mantine/core";
import {  useDeleteRecordMutation, useGetRecordsQuery } from "../../apis/serveces";
import Main_list from "../../components/reusableComponents/Main_list";

import CustomModal from "../../components/reusableComponents/CustomModal";
import ColumnChooser from "../../components/reusableComponents/tabels";

import { showAlert } from "../../components/Error";

import AreaForm from "./AreaForm";
import { useTranslation } from "react-i18next";
type amrro = {
  data: {amr: string}
}
export default function Areas() {
  const [page, setPage] = useState(1);

  const {t} = useTranslation()

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  // const [skipedId, setSkipedId]  = useState(false)

  const { data, isLoading, isSuccess } = useGetRecordsQuery({
    page: Number(page),
    per_page: 10,
    url:'admin/area',
    inValid:['areas']
  });


  const tyedData = data as amrro
  console.log(tyedData?.data)
  const [deleteRecord] = useDeleteRecordMutation();


  // const {refetch,data:recordUpdateData, isSuccess:recordIsSuccess} = useFindRecordQuery({id:editData.id, url:"admin/city"},{skip:!skipedId})


// useEffect(()=>{
//   if(skipedId === true){

//     refetch()
//   }

// },[skipedId])

// useEffect(()=>{
//   if(recordIsSuccess){
// setSkipedId(false)
    
//   }

// },[recordIsSuccess])


// console.log(recordUpdateData)

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
  }, [isSuccess]);
  console.log(colKeys);
  const colss: { accessor: string; title: string }[] = [];
  useEffect(() => {
    colKeys?.map((key: any, i: number) => {
      colss?.push({ accessor: key, title: data?.data?.head[i] });
    });
    if (colss?.length > 0) {
      colss?.push({ accessor: "action", title: "Action" });
    }
    setFinalKeys(colss);
  }, [colKeys, isSuccess]);

  const deleteSubmitHandler = async (id: string) => {
    console.log(id);
    swal({
      title: t('tableForms.confirmationDialog.title'),
      icon: "error",
      buttons: [t('tableForms.confirmationDialog.buttons.cancel'), t('tableForms.confirmationDialog.buttons.delete')],
      dangerMode: true,
    }).then(async (willDelete: any) => {
      if (willDelete) {
        const data = await deleteRecord({id, url:'admin/area', inValid:['areas']});
        console.log(data);
        //@ts-ignore
        if (data?.error?.data?.status === 400) {
          //@ts-ignore
          toast.error(data?.error?.data?.message, {});
        }
        //@ts-ignore
        if (data?.data.status === 200) {
          //@ts-ignore
          showAlert("Added", data?.data.response?.message);
        }
        // setToastData(data);
      } else {
        swal(t('tableForms.confirmationDialog.fail'));
      }
    });
  };
  const viewHander = (id: string) => {
    console.log(id);
  };
  const EditHandelr = (data: any) => {
    // setSkipedId(true)
    setEditData(data);
    console.log(data);
  };

  if (isLoading) {
    return (
      <div>
        {" "}
        <Loader />
      </div>
    );
  }
  console.log(finslColsKeys);
  return (
    <Main_list title={`${t("tableForms.areasTitle")}`}>
      {/* <MainPageCard> */}
      {open && (
        <CustomModal openCloseModal={setOpen} title={`${t("tableForms.add")} ${t("tableForms.areaTitle")}`}>
          <AreaForm openCloseModal={setOpen} editData={null} />
        </CustomModal>
      )}
      {open && editData?.id && (
        <CustomModal
          openCloseModal={setOpen}
          title={`${t("tableForms.edit")} ${t("tableForms.areaTitle")}`}
          resetEditData={setEditData}
        >
          <AreaForm
            editData={editData}
            resetEditData={setEditData}
            openCloseModal={setOpen}
          />
        </CustomModal>
      )}

      <ColumnChooser
        setPage={setPage}
        page={page}
        pagination={data?.data?.pagination}
        Enabel_edit={true}
       
        //@ts-ignore
        TableBody={data?.data?.data?.length > 0 ? data?.data?.data : []}
        //@ts-ignore
        tabelHead={finslColsKeys ? finslColsKeys : []}
        Chcekbox={true}
        Page_Add={false}
        showAddButton={true}
        onDelete={deleteSubmitHandler}
        onView={viewHander}
        onEdit={EditHandelr}
        openCloseModal={setOpen}
        Enabel_delete={true}
      />
   
    </Main_list>
  );
}
