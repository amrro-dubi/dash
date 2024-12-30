import { useEffect, useState } from "react";

const useLanguage = () => {
const [isRtl,setIsRtl] = useState(false) 
  useEffect(() => {


    const savedLanguage = window.localStorage.getItem("language");

    // document.documentElement.dir = savedLanguage
    //     ? savedLanguage === "ar"
    //         ? "rtl"
    //         : "ltr"
    //     : "ltr";
    setIsRtl(savedLanguage === "ar" ? true : false)

},[])
  return isRtl
}

export default useLanguage