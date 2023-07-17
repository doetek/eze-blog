import { Link } from "react-router-dom";


import Person from "../assets/icon/person-outline.svg";
import Edit from "../assets/icon/create-outline.svg";
import Logout from "../assets/icon/log-out-outline.svg";
import Inbox from "../assets/icon/chatbubble-outline.svg";
import Settings from "../assets/icon/settings-outline.svg";
import Help from "../assets/icon/help-circle-outline.svg";
import userLogout from "../components/Profile";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import avatar from "../assets/profile.png";

export default function LoginLink() {
  const { username } = useAuthStore((state) => state.auth);
  const [{ apiData }] = useFetch(`/user/${username}`);

  // dropdown menu function
  function menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
  }

  return (
    <>
      <ul className="signin-link">
        <Link
          to="/create"
          style={{
            padding: "10px",
            background: "#f1356d",
            color: "white",
            borderRadius: "10px",
          }}
        >
          Upload{" "}
        </Link>

        {/* <Link to="/" >
        
        </Link> */}
        <a href="/" onClick={userLogout}>  Logout</a>


        {/*profile dropdown menu button */}

        <div className="action">
          <div className="profile">
            <img onClick={menuToggle} src={apiData?.profile || avatar} alt="" />
          </div>
          <div className="menu">
            <h3>
            @{apiData?.firstName || apiData?.username}
            </h3>
            <ul>
              <li>
                <img src={Person} alt="" />
                <Link to="/profile/:id">My Profile</Link>
              </li>
              <li>
                <img src={Edit} alt="" />
                <Link to="/edit-profile">Edit Profile</Link>
              </li>
              <li>
                <img src={Inbox} alt="" />
                <Link to="/inbox">Inbox</Link>
              </li>
              <li>
                <img src={Settings} alt="" />
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <img src={Help} alt="" />
                <Link to="/help">Help</Link>
              </li>
              <li>
                <img src={Logout} alt="" />
                <Link to="/">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </ul>
    </>
  );
}







