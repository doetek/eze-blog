
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';

export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username);
      navigate('/password');
    },
  });

  return (
    <div className="reg-content">
      <div className="register-container">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="form-card ">
          <div className="form">
            <form onSubmit={formik.handleSubmit}>
              <h2>HELLO AGAIN!</h2>
              <h4>Explore more by connecting with us.</h4>
              <div className="input-box">
                <i className="fa fa-user" aria-hidden="true"></i>
                <input
                  {...formik.getFieldProps('username')}
                  type="text"
                  placeholder="@Username*"
                />
              </div>
              <div className="input-box">
                <input type="submit" />
              </div>
              <span style={{ marginRight: '16px' }}> Not a member?</span>
              <Link to="/register">Register Now</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
