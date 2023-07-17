import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <div>
        <div className="footer-container">
          <div className="footer-content">

          <ul className="footer-link">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About us</Link>
            <Link to="/help">Help</Link>
            <Link to="/service">Terms of Service</Link>
          </ul>
          <p>Copyright &#169; 2023</p>

          </div>
         
        </div>
    </div>
  )
}
