import { Link, NavLink, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';

export default function NavMenu() {
  const [{ apiData }] = useFetch();

  const navigate = useNavigate();

  // logout handler function
  const userLogout = function userLogout() {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-dark  fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h1>Eze_blog</h1>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
            style={{ border: '2px solid white' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                {apiData?.username}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li
                  className="nav-item"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    {' '}
                    <i
                      class="fa fa-home"
                      style={{ marginRight: '10px' }}
                      aria-hidden="true"
                    ></i>
                    Home
                  </NavLink>
                </li>
                {/* show profile or login */}

                {apiData ? (
                  <>
                    <li
                      className="nav-item"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    >
                      <NavLink className="nav-link" to="/profilepage">
                        <i
                          class="fa fa-user"
                          style={{ marginRight: '10px' }}
                          aria-hidden="true"
                        ></i>
                        Profile
                      </NavLink>
                    </li>
                    <li
                      className="nav-item"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    >
                      <i
                        class="fa fa-sign-out"
                        style={{ marginRight: '10px' }}
                        aria-hidden="true"
                      ></i>
                      <a
                        href="/"
                        onClick={userLogout}
                        style={{ textDecoration: 'none', color: 'white' }}
                      >
                        Logout
                      </a>
                    </li>
                  </>
                ) : (
                  <li
                    className="nav-item"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    <NavLink className="nav-link" to="/register">
                      <i
                        class="fa fa-sign-in"
                        style={{ marginRight: '10px' }}
                        aria-hidden="true"
                      ></i>
                      Sign up ||
                      <NavLink
                        className="nav-linkk"
                        to="/login"
                        style={{ marginRight: '50px' }}
                      >
                        Login
                      </NavLink>
                    </NavLink>
                  </li>
                )}
              </ul>
              <form className="d-flex mt-3" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Enter keyword"
                  aria-label="Search"
                />
                <button className="btn btn-success" type="submit">
                  Search
                </button>
              </form>

              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li
                  className="nav-item"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <h2>Social Links</h2>
                </li>

                <li
                  className="nav-item"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <NavLink className="nav-link" to="#">
                    <i
                      class="fa fa-twitter"
                      style={{ marginRight: '10px' }}
                      aria-hidden="true"
                    ></i>
                    Twitter
                  </NavLink>
                </li>
                <li
                  className="nav-item"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <NavLink className="nav-link" to="#">
                    <i
                      class="fa fa-facebook"
                      style={{ marginRight: '14px' }}
                      aria-hidden="true"
                    ></i>
                    Facebook
                  </NavLink>
                </li>
                <li
                  className="nav-item"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <NavLink className="nav-link" to="#">
                    <i
                      class="fa fa-instagram"
                      style={{ marginRight: '10px' }}
                      aria-hidden="true"
                    ></i>
                    Instagram
                  </NavLink>
                </li>
                <li
                  className="nav-item"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <NavLink className="nav-link" to="#">
                    <i
                      class="fa fa-whatsapp"
                      style={{ marginRight: '10px' }}
                      aria-hidden="true"
                    ></i>
                    WhatsApp
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
