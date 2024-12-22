import { useEffect, useState } from "react";

import swal from "sweetalert";

import { Loader } from "@mantine/core";
import { useDeleteAdminMutation, useGetAdminsQuery } from "../../apis/serveces";
import Main_list from "../../components/reusableComponents/Main_list";

import CustomModal from "../../components/reusableComponents/CustomModal";
import ColumnChooser from "../../components/reusableComponents/tabels";
import AdminForm from "./AdminForm";
import { showAlert } from "../../components/Error";
import { useTranslation } from "react-i18next";
import usePermissionGurd from "../../hooks/permession/usePermissionGurd";

export default function Admins() {
  const [page, setPage] = useState(1);
   const {t} = useTranslation()
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>([]);

  const { data, isLoading, isSuccess } = useGetAdminsQuery({
    page: page,
    per_page: 10,
  });

  const [deleteAdmin] = useDeleteAdminMutation();

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
      title: "Are you sure you want to delete this ADMIN?",
      icon: "error",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete: any) => {
      if (willDelete) {
        const data = await deleteAdmin(id);
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
        swal("Not deleted");
      }
    });
  };
  const viewHander = (id: string) => {
    console.log(id);
  };
  const EditHandelr = (data: any) => {
    setEditData(data);
    console.log(data);
  };

  const canDelete = usePermissionGurd('admin', 'delete')
  const canedit = usePermissionGurd('admin', 'edit')
  const canAdd = usePermissionGurd('admin', 'create')
  if (isLoading) {
    return (
      <div>
        {" "}
        <Loader />
      </div>
    );
  }

  return (
    <Main_list title={t("tableForms.adminsTitle")}>
      {/* <MainPageCard> */}
      {open && (
        <CustomModal openCloseModal={setOpen} title={`${t("tableForms.add")} ${t("tableForms.adminTitle")}`}>
          <AdminForm openCloseModal={setOpen} />
        </CustomModal>
      )}
      {open && editData?.id && (
        <CustomModal
          openCloseModal={setOpen}
          title={`${t("tableForms.edit")} ${t("tableForms.adminTitle")}`}
          resetEditData={setEditData}
        >
          <AdminForm
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
