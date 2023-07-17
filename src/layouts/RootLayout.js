import {  Outlet } from "react-router-dom";

import NavMenu from "./NavMenu";
import Footer from "../footers/footer";



export default function RootLayout() {
  return (
    <div className="main-container">
      <div className="main-header">
      <NavMenu />
      
      </div>

      <div className="">
        
        <Outlet />
      </div>

      <footer>
        {/* <Footer/> */}
      </footer>
    </div>
  );
}
