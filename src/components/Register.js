import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import { registerUser } from '../helper/helper';
import { useState } from 'react';

export default function Register() {
  const [userPassword, userPasswordChange] = useState('password');
    const [userConfirmPassword, userConfirmPasswordChange] = useState('password');

  const togglePassword = () => {
    if (userPassword === 'password') {
      userPasswordChange('text');
      return;
    }
    userPasswordChange('password');
  };

  const toggleConfirmPassword = () => {
    if (userConfirmPassword === 'password') {
      userConfirmPasswordChange('text');
      return;
    }
    userConfirmPasswordChange('password');
  };


  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let registerPromise = registerUser(values);

      toast.promise(registerPromise, {
        loading: (
          <b>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            <span className="sr-only">Creating...</span>
          </b>
        ),
        success: <b>Register Successfully...!</b>,
        error: (
          <b>
            Username or email already exist. <br /> Please enter a unique
            username and email!
          </b>
        ),
      });

      registerPromise.then(function () {
        navigate('/agree');
      });
    },
  });

  return (
    <div className="reg-content">
      <div className="register-container">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="form-card ">
          <div className="form">
            <form onSubmit={formik.handleSubmit}>
              <h1>REGISTER NOW!</h1>
              <div className="input-box">
                <i className="fa fa-user" aria-hidden="true"></i>
                <input
                  {...formik.getFieldProps('firstName')}
                  type="text"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="input-box">
                <i className="fa fa-user" aria-hidden="true"></i>
                <input
                  {...formik.getFieldProps('lastName')}
                  type="text"
                  placeholder="Enter your Last name"
                />
              </div>
              <div className="input-box">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <input
                  {...formik.getFieldProps('email')}
                  type="text"
                  placeholder="Email*"
                />
              </div>
              <div className="input-box">
                <i className="fa fa-user" aria-hidden="true"></i>
                <input
                  {...formik.getFieldProps('username')}
                  type="text"
                  placeholder="@Username*"
                />
              </div>
              <div className="input-box">
                <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                <i className="eye" onClick={togglePassword}>
                  {userPassword === 'password' ? (
                    <i className="fa fa-eye"></i>
                  ) : (
                    <i className="fa fa-eye-slash"></i>
                  )}
                </i>
                <input
                  {...formik.getFieldProps('password')}
                  type={userPassword}
                  placeholder="Password*"
                />
              </div>

              <div className="input-box">
                <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                <i className="eye" onClick={toggleConfirmPassword}>
                  {userConfirmPassword === 'password' ? (
                    <i className="fa fa-eye"></i>
                  ) : (
                    <i className="fa fa-eye-slash"></i>
                  )}
                </i>
                <input
                  {...formik.getFieldProps('confirmPassword')}
                  type={userConfirmPassword}
                  placeholder="confirm Password*"
                  required
                />
              </div>
              <div className="input-box submit-btn">
                <input type="submit" />
              </div>
              <span style={{ marginRight: '16px' }}> Already Registered?</span>
              <Link to="/login">Login Now</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
