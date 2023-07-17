import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate, usernameValidate } from '../helper/validate';
import { verifyPassword } from '../helper/helper';
import { useState } from 'react';

function Login() {
    const [passwordType, setPasswordType] = useState('password');

    const togglePassword = () => {
      if (passwordType === 'password') {
        setPasswordType('text');
        return;
      }
      setPasswordType('password');
    };
  
    const navigate = useNavigate();
  
    const formik = useFormik({
      initialValues: {
        password: '',
        username: '',
      },
      validate: passwordValidate,
      usernameValidate,
      validateOnBlur: false,
      validateOnChange: false,
  
      onSubmit: async (values) => {
        let loginPromise = verifyPassword({
          username: values.username,
          password: values.password,
        });
        toast.promise(loginPromise, {
          loading: (
            <b>
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
              <span className="sr-only">Checking...</span>
            </b>
          ),
          success: <b>Login Successfully...!</b>,
          error: <b>Password Not Match!</b>,
        });
  
        loginPromise.then((res) => {
          let { token } = res.data;
          localStorage.setItem('token', token);
          navigate('/');
        });
      },
    });
  
  return (
    <div>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
    <div className="register-container">

      <div className="form-card">
        <div className="form">
          <form onSubmit={formik.handleSubmit}>
            <h1>LOGIN</h1>
            <div className="input-box">
              <i className="fa fa-user" aria-hidden="true"></i>
              <input
                {...formik.getFieldProps('username')}
                type="text"
                placeholder="@Username*"
              />
            </div>
            <div className="input-box">
              <i className="fa fa-user" aria-hidden="true"></i>
              <i className="eye" onClick={togglePassword}>
                {passwordType === 'password' ? (
                  <i className="fa fa-eye"></i>
                ) : (
                  <i className="fa fa-eye-slash"></i>
                )}
              </i>
              <input
                {...formik.getFieldProps('password')}
                type={passwordType}
                placeholder="Password*"
              />
            </div>
            <div className="input-box">
              <input type="submit" />
            </div>
            <span style={{ marginRight: '16px' }}> Forgot password?</span>{' '}
            <Link to="/recovery">Recover Now</Link>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login