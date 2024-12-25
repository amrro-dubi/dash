import { useDeleteRecordMutation } from '../apis/serveces';
import { useTranslation } from 'react-i18next';
import { showAlert } from '../components/Error';
const useDeleteConfirmation = ({url, inValid}:{url:string, inValid:string}) => {

    const {t} = useTranslation()
    const [deleteRecord] = useDeleteRecordMutation();
    const deleteSubmitHandler = async (id: string) => {
        swal({
          title: t('tableForms.confirmationDialog.title'),
          text: t('tableForms.confirmationDialog.text'),
          icon: "error",
          content: {
            element: "input",
            attributes: {
              placeholder: t('tableForms.confirmationDialog.placeholder'),
              type: "text",
            },
          },
          buttons: [t('tableForms.confirmationDialog.buttons.cancel'), t('tableForms.confirmationDialog.buttons.delete')],
          dangerMode: true,
        }).then(async (value: any) => {
          if (value === t('tableForms.confirmationDialog.confirmText')) {
            const data = await deleteRecord({ id, url: url, inValid: [inValid] });
            console.log(data);
            //@ts-ignore
            if (data?.error?.data?.status === 400) {
              //@ts-ignore
              toast.error(data?.error?.data?.message, {});
            }
            //@ts-ignore
            if (data?.data.status === 200) {
              
              showAlert("Added", data?.data.response?.message);
            }
            // setToastData(data);
          } else {
            swal(t('tableForms.confirmationDialog.fail'));
          }
        });
      };


  return deleteSubmitHandler
}

export default useDeleteConfirmation