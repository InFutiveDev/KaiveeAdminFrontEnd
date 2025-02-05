import { useState, useContext, Fragment } from "react";
import classnames from "classnames";
import { useSkin } from "@hooks/useSkin";
import useJwt from "@src/auth/jwt/useJwt";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast, Slide, ToastContainer } from "react-toastify";
import { handleLogin } from "@store/actions/auth";
import { AbilityContext } from "@src/utility/context/Can";
import { useHistory } from "react-router-dom";
import InputPasswordToggle from "@components/input-password-toggle";
import { getHomeRouteForLoggedInUser, isObjEmpty } from "@utils";
import { Coffee, AlertCircle } from "react-feather";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  Spinner,
  Button,
} from "reactstrap";
import "@styles/base/pages/page-auth.scss";
import ToastContent from "../../components/toastContent";

import themeConfig from "@configs/themeConfig";
import Source from "../../../assets/images/pages/register-v2.svg";
const Login = (props) => {
  const [skin, setSkin] = useSkin();
  const ability = useContext(AbilityContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector((state) => state?.loading);
  const { globalLoading } = store;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, errors, handleSubmit } = useForm();
  const illustration = skin === "dark" ? "register-v2-dark.svg" : "register-v2.svg";
  // source = `@src/assets/images/pages/${illustration}`;
  // const source = `../../../assets/images/pages/${illustration}`;

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      useJwt
        .login({ email, password })
        .then((res) => {
          const data = {
            ...res.data?.data.userData,
            accessToken: res.data?.data.accessToken,
            refreshToken: res.data?.data.refreshToken,
          };
          dispatch(handleLogin(data));
          ability.update([
            {
              action: "manage",
              subject: "all",
            },
          ]);
          history.push(getHomeRouteForLoggedInUser("admin"));
          toast.success(
            <ToastContent
              type={"success"}
              icon={<Coffee size={12} />}
              text="You have successfully logged in, Now you can start to explore. Enjoy!"
              title="Welcome Back !"
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          );
        })
        .catch((err) => {
          toast.error(
            <ToastContent
              type={"light-danger"}
              icon={<AlertCircle size={12} />}
              text={err.response?.data?.msg || err?.message}
              title={"Error" || err?.message}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          );
        });
    }
  };

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={Source} alt="Login V2" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="font-weight-bold mb-1">
              <div className="d-flex justify-content-center my-4">
                <img
                  style={{ height: "100px" }}
                  src={themeConfig.app.appLogoImage}
                  alt="logo"
                />
              </div>
              <p> Welcome Back!</p>
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account with email and password
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormGroup>
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Input
                  autoFocus
                  type="email"
                  value={email}
                  id="login-email"
                  name="email"
                  placeholder="john@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className={classnames({ "is-invalid": errors["email"] })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== "",
                  })}
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="login-password">
                  Password
                </Label>
                <InputPasswordToggle
                  value={password}
                  id="login-password"
                  name="password"
                  // className='input-group-merge'
                  onChange={(e) => setPassword(e.target.value)}
                  className={classnames({ "is-invalid": errors["password"] })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== "",
                  })}
                />
              </FormGroup>
              <Button.Ripple
                type="submit"
                color="primary"
                disabled={globalLoading}
                block
              >
                {globalLoading ? (
                  <Fragment>
                    <Spinner size="sm" />
                    <span className="ml-50">Loading...</span>
                  </Fragment>
                ) : (
                  <span>Sign in</span>
                )}
              </Button.Ripple>
            </Form>
          </Col>
        </Col>
      </Row>
      <ToastContainer newestOnTop />
    </div>
  );
};

export default Login;
