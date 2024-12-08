import React, { useEffect, useState } from "react";
import { Form, InputGroup, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useConfirmCodeMutation } from "../../../apis/authSlice";
import { toast } from "react-toastify";

const PinInput: React.FC = () => {
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const location = useLocation();
  let pinEmail = "";
  if (location?.state !== null) {
    const { email } = location?.state;
    pinEmail = email;
  }
  const [toastData, setToastData] = useState<any>({});
  const [confirmCode, { isLoading }] = useConfirmCodeMutation();

  const handleChange = (value: string, index: number) => {
    // Only allow numeric input
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Automatically focus on the next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`pin-input-${index + 1}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleBackspace = (value: string, index: number) => {
    if (value === "" && index > 0) {
      const prevInput = document.getElementById(`pin-input-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");

    // Check if pasted data is numeric and of the correct length
    if (/^\d{6}$/.test(pastedData)) {
      const newPin = pastedData.split("").slice(0, 6);
      setPin(newPin);

      // Focus on the last input
      const lastInput = document.getElementById(`pin-input-${5}`);
      if (lastInput) (lastInput as HTMLInputElement).focus();
    }
  };

  useEffect(() => {
    if (toastData?.data?.status === 200) {
      toast.success("code is valid", {});
     
      setToastData({});
      navigate("/resetPassword", {
        state: { token: toastData?.data?.response?.data },
      });
    }
    if (toastData?.error?.status === 422) {
      toast.error(toastData?.error?.response?.data?.message, {});
      setToastData({});
    }
    if (toastData?.error?.status === 400) {
      toast.error(toastData?.error?.response?.data.errors.error[0], {});
      setToastData({});
    }
    if (toastData?.error?.data?.status === 500) {
      toast.error(toastData?.error?.data?.message, {});
      setToastData({});
    }

    if (isLoading) {
      toast.loading("Loading...", {
        toastId: "loginLoadingToast",
        autoClose: false,
      });
    } else {
      toast.dismiss("loginLoadingToast");
    }
  }, [toastData, isLoading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginFormData = new FormData();
    loginFormData.append("email", pinEmail);
    loginFormData.append("pin_code", pin.join(""));

    const data = await confirmCode(loginFormData);

   
      setToastData(data);
   
  };

  return (
    <div className="w-100 login-container">
      <div className="overlay"> </div>
      <div className="login-wrapper">
        <div className="login-page">
          <div className="login-content">
            <div className="login-header mb">
              <h4 className="modal-title" id="logInModal01Label">
                Code Confirmation
              </h4>
              <p className="modal-title" id="logInModal01Label">
                We sent 6 digits to your email. Please enter it to confirm.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <Row className="justify-content-center">
                <Col xs="auto">
                  <InputGroup>
                    {pin.map((digit, index) => (
                      <Form.Control
                        key={index}
                        id={`pin-input-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleChange(e.target.value, index)
                        }
                        onKeyDown={(e) =>
                          e.key === "Backspace" &&
                          handleBackspace(
                            e.currentTarget.value,
                            index
                          )
                        }
                        onPaste={handlePaste}
                        className="text-center mx-1 mb-4"
                        style={{
                          width: "50px",
                          height: "50px",
                          fontSize: "24px",
                        }}
                      />
                    ))}
                  </InputGroup>
                </Col>
              </Row>

              <div className="col-lg-12">
                <div className="form-agreement form-inner d-flex justify-content-between flex-wrap mb-3">
                  <Link to="/forgetPass" className="forgot-pass">
                    Back?
                  </Link>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-inner">
                  <button className="primary-btn2" type="submit">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinInput;
