import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helper/helper";
import { useNavigate} from "react-router-dom";

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP);
      if (OTP) return toast.success("OTP has been send to your email!");
      return toast.error("Problem while generating OTP!");
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("Verify Successfully!");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Wront OTP! Check email again!");
    }
  }

  // handler of resend OTP
  function resendOTP() {
    let sentPromise = generateOTP(username);

    toast.promise(sentPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>,
    });

    sentPromise.then((OTP) => {
      console.log(OTP);
    });
  }

  return (
    <div className="reg-content">
      <div className="register-container">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
<div className="form-card">
  <div className="form">

  <form onSubmit={onSubmit}>
          <h1>Recovery</h1>
          <h4> Enter OTP to recover password.</h4>
          <p> Enter 6 digit OTP sent to your email address.</p>
          <div className="input-box">
          
            {/* <i className="fa fa-user" aria-hidden="true"></i> */}
            <input className="recovery-input"
            onChange={(e) => setOTP(e.target.value)}
        
            type="text"
            placeholder="OTP"
          />
          </div>
          <div className="input-box">
            <button className="form-btn" type="submit">Recover</button>
           
          </div>
          Can't get OTP? <span type="click" className="resend-btn" onClick={resendOTP} >Resend</span>
        </form>
  </div>
</div>
       
      </div>
    </div>


   
  );
}







