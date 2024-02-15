import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import api from "../../api/api";
import { Form, Input, Tooltip, message } from "antd";
// import { login } from "../../redux/auth/authSlice";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import GMCLogo from "../../assets/GMCLogo.svg";
import Button from "../../components/common/Button";
import { loginAsync } from "../../redux/reducers/authReducer";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("ppppppppppp");
  const loginHandler = async (values) => {
    // Dispatch loginAsync action with values
    dispatch(loginAsync(values))
      .then((action) => {
        if (loginAsync.fulfilled.match(action)) {
          message.success("Login successful!", 2);

          // setUserLogin({ email: "", password: "" });
          form.resetFields(); // Reset the login form
        } else if (loginAsync.rejected.match(action)) {
          // Handle registration error here
          const errorPayload = action.payload;
          if (
            errorPayload === "A custom error message that indicates conflict"
          ) {
            // Handle conflict, e.g., show an error message.
            message.error("Invalid credentials.", 3);
          } else {
            // Handle other registration errors as needed.
            message.error("Invalid credentials.", 3);
          }
        }
      })
      .catch((error) => {
        // Handle any additional error cases here
        message.error("Login failed.", 3);
      });
  };
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex flex-col h-screen justify-center items-center relative">
      <Form
        className="p-8"
        name="Login form"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={loginHandler}
        form={form}>
        <h1 className="text-3xl font-bold text-center pb-10">Login</h1>
        <div className="flex justify-center">
          <p> Not registered yet ?</p>
          <p className="text-right underline text-blue-600 pb-4 hover:cursor-pointer">
            Click here
          </p>
        </div>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please enter username",
            },
            {
              min: 1,
              message: "Please enter valid input",
            },
          ]}>
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              min: 1,
              message: "Minimum password length is 8",
            },
            {
              required: true,
              message: "Please enter password",
            },
          ]}>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            type="password"
          />
        </Form.Item>
        <p className="text-right underline text-blue-600 pb-4 hover:cursor-pointer">
          Forgot Password?
        </p>
        <Form.Item className="">
          <Button
            style="bg-[#6495ED] rounded w-full px-4 py-2 text-white"
            text={
              <>
                {isLoading ? (
                  <ClipLoader
                    color="#FFFFF"
                    loading={isLoading}
                    //  cssOverride={override}
                    className=" rounded-full"
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <p>Submit</p>
                )}
              </>
            }
            type="submit"
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginPage;
