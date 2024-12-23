import React, { useRef, useState } from "react";
import uploadImg from "../../assets/img/dashboard/upload.png";
import uploadUser from "../../assets/img/dashboard/upload-user.png";
import { useTranslation } from "react-i18next";
type UploadImageProps = {
  user?: boolean;
  setFile: React.Dispatch<React.SetStateAction<File | File[] |null>>;
  editImgUrl?: string | null;
  cover?:boolean
  multi?:boolean
  label?:string
};
const Upload_cover = (props: UploadImageProps) => {

  const {t} = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleButtonClick = () => {
    // Programmatically click the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files && files?.length > 0) {
      const file = files[0];
      if (props.multi) {
        props.setFile(Array.from(files));
      } else {
       
        props.setFile(file);
       
      }
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageSrc(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex flex-col items-center gap-[10px] w-full">
      <input
        type="file"
        multiple={props.multi? true: false}
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />
      <div
        onClick={handleButtonClick}
        className="flex cursor-pointer  lg:w-[220px] h-[120px] rounded-2xl border-[1px] border-black hover:border-[#EFB93F] border-solid justify-center items-center "
      >
        {props.editImgUrl? <img className="w-full h-full rounded-2xl object-cover" src={`${props?.editImgUrl}`}/> : <> {
          imageSrc ? (
            <img
              src={imageSrc}
              alt="Uploaded"
              className="w-full h-full rounded-2xl object-cover"
            />
          ) : (
            <img
              src={props.user ? uploadUser : uploadImg}
              alt=""
              className="w-[30%]"
            />
          )}
          </>
        }
      </div>

      <button
        onClick={handleButtonClick}
        className="flex justify-between items-center  gap-[2px] "
      >
        <div className="flex flex-col">
          
          <div className="flex items-center gap-1  ">

            {props.label? (  <h5>{t(`${props.label}`)} </h5>):(  <h5>{t("tableForms.labels.upload")} </h5>)}
          
          
          </div>
        </div>
      </button>
    </div>
  );
};

export default Upload_cover;
