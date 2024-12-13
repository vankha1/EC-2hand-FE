import { ArrowRight } from "@phosphor-icons/react";
import {
  Typography,
  Card,
  Button,
  Input,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Breadcrumbs,
} from "@material-tailwind/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";
import { login, register } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const BreadcrumbsLogin = () => {
  return (
    <Breadcrumbs className="bg-white ml-36">
      <a href="#" className="opacity-60 flex gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        Trang chủ
      </a>
      <a href="#" className="opacity-60">
        <span>Người dùng</span>
      </a>
      <a href="#" style={{ color: "#2DA5F3" }}>
        Đăng ký
      </a>
    </Breadcrumbs>
  );
};

const RegisterPage = () => {
  const [activeTab, setActiveTab] = React.useState("register");
  const [stateValue, setStateValue] = React.useState({});
  const [loginForm, setLoginForm] = React.useState({});
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      fullname: stateValue.fullname,
      email: stateValue.email,
      password: stateValue.password,
    };
    try {
      await register(data);
      toast.success("Đăng ký thành công");
    } catch (error) {
      toast.error("Đăng ký thất bại");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await login(loginForm);
      const accessToken = response.data.access_token;
      localStorage.setItem("accessToken", accessToken);
      toast.success("Đăng nhập thành công");
      navigate('/')
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập thất bại");
    }
  };

  const tabContent = [
    {
      label: "Đăng ký",
      value: "register",
      desc: (
        <Card color="transparent" shadow={false} className="items-center">
          <form className="mt-4 mb-2 w-80 max-w-screen-lg">
            <div className="mb-1 flex flex-col gap-4">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Tên người dùng
              </Typography>
              <Input
                id="name"
                value={stateValue.fullname}
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) =>
                  setStateValue({ ...stateValue, fullname: e.target.value })
                }
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input
                id="email"
                value={stateValue.email}
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) =>
                  setStateValue({ ...stateValue, email: e.target.value })
                }
              />
              <div className="flex justify-between items-center">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Mật khẩu
                </Typography>
              </div>
              <Input
                id="password"
                type="password"
                value={stateValue.password}
                onChange={(e) =>
                  setStateValue({ ...stateValue, password: e.target.value })
                }
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                placeholder="8+ ký tự"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="flex justify-between items-center">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Xác nhận mật khẩu
                </Typography>
              </div>
              <Input
                type="password"
                value={stateValue.confirmPassword}
                onChange={(e) =>
                  setStateValue({
                    ...stateValue,
                    confirmPassword: e.target.value,
                  })
                }
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Button
              className="mt-10 flex items-center justify-center gap-3 bg-[#FA8232]"
              fullWidth
              onClick={handleRegister}
            >
              Đăng ký
              <ArrowRight size={17} />
            </Button>
          </form>
        </Card>
      ),
    },
    {
      label: "Đăng nhập",
      value: "login",
      desc: (
        <Card color="transparent" shadow={false} className="items-center">
          <form className="mt-4 mb-2 w-80 max-w-screen-lg">
            <div className="mb-1 flex flex-col gap-10">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email đăng nhập
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={loginForm.email}
                onChange={(e) => {
                  setLoginForm({ ...loginForm, email: e.target.value });
                }}
              />
              <div className="flex justify-between items-center">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Mật khẩu
                </Typography>
                <Typography variant="h6" color="blue" className="-mb-3 text-sm">
                  Quên mật khẩu?
                </Typography>
              </div>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={loginForm.password}
                onChange={(e) => {
                  setLoginForm({ ...loginForm, password: e.target.value });
                }}
              />
            </div>

            <Button
              className="mt-10 flex items-center justify-center gap-3 bg-[#FA8232]"
              fullWidth
              onClick={handleLogin}
            >
              Đăng nhập
              <ArrowRight size={17} />
            </Button>
          </form>
        </Card>
      ),
    },
  ];

  return (
    <>
      <Header />
      <BreadcrumbsLogin />
      <div className="font-sans bg-white h-[550px] flex  flex-col items-center ">
        <Tabs value={activeTab} className="w-[350px]">
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
            }}
          >
            {tabContent.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={activeTab === value ? "text-gray-900" : ""}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {tabContent.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
