import { useEffect, useState } from "react";

 
import { Loader } from "@mantine/core";
import {     useGetRecordsQuery } from "../../apis/serveces";
import Main_list from "../../components/reusableComponents/Main_list";

import CustomModal from "../../components/reusableComponents/CustomModal";
import ColumnChooser from "../../components/reusableComponents/tabels";

  import FqaForm from "./TermsForm";
import { useTranslation } from "react-i18next";
import usePermissionGurd from "../../hooks/permession/usePermissionGurd";
import useDeleteConfirmation from "../../hooks/useDeleteConfirmation";

export default function Terms() {
  const [page, setPage] = useState(1);
const {t}= useTranslation()
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  // const [skipedId, setSkipedId]  = useState(false)

  const { data, isLoading, isSuccess } = useGetRecordsQuery({
    page: Number(page),
    per_page: 10,
    url:'admin/setting/terms',
    inValid:['terms']
  });

  const canDelete = usePermissionGurd('type', 'delete')
  const canedit = usePermissionGurd('type', 'edit')
  const canAdd = usePermissionGurd('type', 'create')

   


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
              //@ts-ignore

      colss?.push({ accessor: key, title: data?.data?.head[i] });
    });
    if (colss?.length > 0) {
      colss?.push({ accessor: "action", title: "Action" });
    }
    setFinalKeys(colss);
  }, [colKeys, isSuccess]);

  const deleteSubmitHandler = useDeleteConfirmation({url:"admin/setting/terms", inValid:'terms'})
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
    <Main_list title={t("tableForms.typesTitle")}>
      {/* <MainPageCard> */}
      {open && (
        <CustomModal openCloseModal={setOpen} title={`${t("tableForms.add")} ${t("tableForms.typeTitle")}`}>
          <FqaForm openCloseModal={setOpen} editData={null} />
        </CustomModal>
      )}
      {open && editData?.id && (
        <CustomModal
          openCloseModal={setOpen}
          title={`${t("tableForms.edit")} ${t("tableForms.typeTitle")}`}
          resetEditData={setEditData}
        >
          <FqaForm
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
        pagination={data?.data?.pagination}
       
       
        //@ts-ignore
        TableBody={data?.data?.data?.length > 0 ? data?.data?.data : []}
        //@ts-ignore
        tabelHead={finslColsKeys ? finslColsKeys : []}
        Chcekbox={true}
        Page_Add={false}
       
        onDelete={deleteSubmitHandler}
        onView={viewHander}
        onEdit={EditHandelr}
        openCloseModal={setOpen}
        showAddButton={canAdd}
        Enabel_edit={canedit}
        Enabel_delete={canDelete}
      />
   
    </Main_list>
  );
}
