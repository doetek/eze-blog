import "./home.css"

export default function Home() {
  return (
    <div className="home-container">

      <div className="form-cont">
      <form >
       <h2>Microsoft</h2>
        <h1>Sign in </h1>

        <div >
          <input
          className="input-holder"
           type="text"
          placeholder="Email, phone or skype" />
        </div>
       </form>
       <p>No account? <span><a href="#"> Create one</a></span> </p> 
       <p>Can't access your account?</p>
       <div className="btn">
       <button className="back">Back</button>
       <button className="next">Next</button>

       </div>
     
      </div>
      <div className="opt">
        <p>Sign-in options</p>

      </div>
        
    

    </div>
  );
}
