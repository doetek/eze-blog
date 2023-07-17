
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../helper/validate";
import { resetPassword } from "../helper/helper";
import { useAuthStore } from "../store/store";
import { useNavigate, Navigate } from "react-router-dom";
import useFetch from "../hooks/fetch.hook";



export default function Reset() {
  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, status, serverError }] = useFetch("createResetSession");

  const formik = useFormik({
    initialValues: {
      password: "admin@123",
      confirm_pwd: "admin@123",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({ username, password: values.password });

      toast.promise(resetPromise, {
        loading: "Updating...",
        success: <b>Reset Successfully...!</b>,
        error: <b>Could not Reset!</b>,
      });

      resetPromise.then(function () {
        navigate("/password");
      });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  if (status && status !== 201)
    return <Navigate to={"/password"} replace={true}></Navigate>;

  return (
    <div className="reg-content">
      <div className="register-container">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <form onSubmit={formik.handleSubmit}>
          <h1>Reset</h1>
          <h4>Explore more by connecting with us.</h4>
          <div className="input-box">
            <i className="fa fa-user" aria-hidden="true"></i>
            <input
              {...formik.getFieldProps("password")}
              type="text"
              placeholder="New Password*"
            />
          </div>
          <div className="input-box">
            <i className="fa fa-user" aria-hidden="true"></i>
            <input
              {...formik.getFieldProps("confirm_pwd")}
              type="text"
              placeholder="Password*"
            />
          </div>
          <div className="input-box">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
