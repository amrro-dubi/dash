import { useEffect, useState } from "react";

 
import { Loader } from "@mantine/core";
import {  useGetRolesQuery } from "../../apis/serveces";
import Main_list from "../../components/reusableComponents/Main_list";

import CustomModal from "../../components/reusableComponents/CustomModal";
import ColumnChooser from "../../components/reusableComponents/tabels";

  import RolesForm from "./RolesForm";
import { useTranslation } from "react-i18next";
import usePermissionGurd from "../../hooks/permession/usePermissionGurd";
import useDeleteConfirmation from "../../hooks/useDeleteConfirmation";

export default function Roles() {
  const [page, setPage] = useState(1);
const {t} = useTranslation()
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>([]);


  

  const { data, isLoading, isSuccess } = useGetRolesQuery({
    page: page,
    per_page: 10,
  });



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

  const deleteSubmitHandler = useDeleteConfirmation({url:"admin/role", inValid:'roles'})

  const EditHandelr = (data: any) => {
    setEditData(data);
    console.log(data);
  };


  const canDelete = usePermissionGurd('role', 'delete')
  const canedit = usePermissionGurd('role', 'edit')
  const canAdd = usePermissionGurd('role', 'create')
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
    <Main_list title={t("tableForms.rolesTitle")}>
      {open && (
        <CustomModal openCloseModal={setOpen} title={`${t("tableForms.add")} ${t("tableForms.roleTitle")}`}>
          <RolesForm openCloseModal={setOpen} />
        </CustomModal>
      )}
      {open && editData?.id && (
        <CustomModal
          openCloseModal={setOpen}
          title={`${t("tableForms.edit")} ${t("tableForms.roleTitle")}`}
          resetEditData={setEditData}
        >
          <RolesForm
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
       
        //@ts-ignore
        TableBody={data?.data?.data?.length > 0 ? data?.data?.data : []}
        //@ts-ignore
        tabelHead={finslColsKeys ? finslColsKeys : []}
        Chcekbox={true}
        Page_Add={false}
       
        onDelete={deleteSubmitHandler}
        onEdit={EditHandelr}
        openCloseModal={setOpen}
        showAddButton={canAdd}
        Enabel_edit={canedit}
        Enabel_delete={canDelete}
      />
    </Main_list>
  );
}
