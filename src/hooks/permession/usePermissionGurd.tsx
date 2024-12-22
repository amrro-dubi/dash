import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
type PermissionType = 'view' | 'create' | 'delete' | 'edit';
const usePermissionGurd = (permissionKey:string , permissionType : PermissionType) => {
    const [permission, setPermission] = useState(false)
    const {permissions} = useSelector((state:RootState)=> state.permissions);

   console.log(permissions)

    useEffect(()=>{
          
           
           if(permissions[permissionKey]){

             setPermission(permissions[permissionKey][permissionType] === true)
           }
           

    },[permissionKey, permissionType, permissions])

  return permission
}

export default usePermissionGurd