import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { verifyPassword } from '../helper/helper';
import { useState } from 'react';

export default function Password() {
  const [passwordType, setPasswordType] = useState('password');

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, serverError }] = useFetch(`/user/${username}`);

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({
        username,
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

  if (isLoading)
    return (
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '100px',
        }}
      >
        <i class="fa fa-spinner  fa-3x fa-fw"></i>
        <span class="sr-only">isLoading...</span>
      </h1>
    );
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="reg-content">
      <div className="register-container">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="form-card">
          <div className="form">
            <form onSubmit={formik.handleSubmit}>
              <h1>SIGN IN</h1>
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
  );
}
