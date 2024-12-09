import React, { useEffect, useState } from 'react';

import swal from 'sweetalert';

import { Loader } from '@mantine/core';
import { useDeleteAdminMutation, useGetAdminsQuery } from '../../apis/serveces';
import Main_list from '../../components/reusableComponents/Main_list';

import CustomModal from '../../components/reusableComponents/CustomModal';
import ColumnChooser from '../../components/reusableComponents/tabels';
import AdminForm from './AdminForm';
import { showAlert } from '../../components/Error';



export default function Admins() {
   
    const [page, setPage] = useState(1);
   
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<any>([]);
   

    const { data, isLoading, isSuccess } = useGetAdminsQuery({page:page, per_page:10})

    const [deleteAdmin, {deleteIsLoading}] = useDeleteAdminMutation()
   


    
    const [toastData, setToastData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [colKeys, setColKeys] = useState<string[]>([]);
    const [finslColsKeys, setFinalKeys] = useState<{ accessor: string; title: string }[]>([]);
    const [loadingDelivery, setLoadingDelivery] = useState<{ [key: string]: boolean }>({});

    const [loadingStatus, setLoadingStatus] = useState<{ [key: string]: boolean }>({});

    let keys: string[] = [];
    useEffect(() => {
        //@ts-ignore
        if (data?.data?.length > 0) {
            //@ts-ignore
            keys = Object?.keys(data?.data[0]);
            setColKeys(keys);

        }
    }, [isSuccess]);

    let colss: { accessor: string; title: string }[] = [];
    useEffect(() => {

        colKeys?.map((key: any) => {
            if (key === "files") {
            }

            const formattedKey = key
                .replace(/_/g, ' ')
                .split(' ')
                .map((word: string) => word?.charAt(0).toUpperCase() + word?.slice(1))
                .join(' ');
            colss?.push({ accessor: key, title: formattedKey });

        });
        if (colss?.length > 0) {
            colss?.push({ accessor: 'action', title: 'Action' });
        }
        setFinalKeys(colss);
    }, [colKeys, isSuccess]);

    const deleteSubmitHandler = async (id: string) => {
        console.log(id)
        swal({
            title: 'Are you sure you want to delete this ADMIN?',
            icon: 'error',
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
        }).then(async (willDelete: any) => {
            if (willDelete) {
                const data = await deleteAdmin(id);
                console.log(data)
                //@ts-ignore
                if (data?.error?.data?.status === 400) {
                    //@ts-ignore
                    toast.error(data?.error?.data?.message, {});
                    setToastData({});
                }
                //@ts-ignore
                if (data?.data.status === 200) {
                    //@ts-ignore
                    showAlert('Added', data?.data.response?.message);
                    setToastData({});
                }
                // setToastData(data);
            } else {
                swal('Not deleted');
            }
        });

        // if (data?.error) setToastData(data);
        setErrors({});
    };
    const viewHander = (id: string) => {
    };
    const EditHandelr = (data: any) => {
        setEditData(data);
    };

    // const [isTrue, setisTrue] = useState(false);
    // const [isTrueFrommoale, setisTrueFrommoale] = useState(false);

    const updateHander = async (id: string, status: string) => {
        swal({
            title: ` هل انت متاكد من ${status === "2" ? 'قبول' : 'رفض'} هذا الشخص `,
            icon: 'warning',
            buttons: ['الغاء', `${status === "2" ? 'قبول' : 'رفض'}`],
            dangerMode: true,
        }).then(async (willDelete: any) => {
            if (willDelete) {
              
                const data = await deleteAdmin(id);
               //@ts-ignore
                if (data?.data.status === 200) {
                   
                    showAlert('Added', data?.data.response?.message);
                    setToastData({});
                }
                setToastData(data);
            } else {
                swal(`لم يتم  ${status === "2" ? 'القبول' : 'الرفض'}`);
            }
        });
    };

    const updateDeliveryHander = async (id: string, status: boolean) => {
    };
    if (isLoading) {
        return <div> <Loader /></div>
    }
    return (
        <Main_list title=" Admins">
            {/* <MainPageCard> */}
                {open && (
                    <CustomModal openCloseModal={setOpen} title="Add Admin">
                       <AdminForm />
                    </CustomModal>
                )}


                <ColumnChooser
                    isLoading={loadingStatus}
                    isLoadingDelivery={loadingDelivery}
                    setPage={setPage}
                    page={page}
                    pagination={data?.pagination}
                    onUpdateDelivery={updateDeliveryHander}
                    Enabel_edit={true}
                    Accept_button={false}
                    Reject_button={false}
                    //@ts-ignore
                    TableBody={data?.data?.length > 0 ? data?.data : []}
                    //@ts-ignore
                    tabelHead={finslColsKeys? finslColsKeys : []
                    }
                    Chcekbox={true}
                    Page_Add={false}
                    showAddButton={true}
                    onDelete={deleteSubmitHandler}
                    onView={viewHander}
                    onUpdate={updateHander}
                    onEdit={EditHandelr}
                    openCloseModal={setOpen}
                    Enabel_delete={true}
                />
                {/* <Viewer
                fileUrl='/assets/pdf-open-parameters.pdf'
                plugins={[
                    // Register plugins
                    defaultLayoutPluginInstance,

                ]}
                /> */}
            {/* </MainPageCard> */}
        </Main_list>
    );
}
