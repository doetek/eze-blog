import { Link } from "react-router-dom";
  
  
const Agreement = () => {
return (
  <>
    <div className="agreement-cont">
      <h2> AGREEMENT</h2>
      <p>
        Active and valid talent Scouting experience, by taking a step forward,
        you agree to the :
      </p>
      <ul>
        <li>Terms and condition</li>
        <li>Privacy, Policy and limitation of the app</li>
      </ul>
      <div>
        <Link to="/login"><button>CONTINUE</button></Link> 
      </div>
    </div>
  </>
);
};

export default Agreement;
