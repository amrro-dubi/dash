import { useTranslation } from "react-i18next";

export const useValidationMessages = () => {
  const { t } = useTranslation();

  return {
    confirmPass: t("auth.resetPassword.confirmPass"),
  };
};