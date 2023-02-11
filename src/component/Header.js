import React from "react";
import Connect from "./Connect";

export default function Header() {
  return (
    <React.Fragment>
      <header id="header">
        <nav
          id="PPNavbar"
          className="navbar navbar-expand-md navbar-light bg-white"
        >
          <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <img
                src={require("../images/logo.png").default}
                height="27"
                alt="BSCPad"
                className="me-2"
              />
              BSCPad
            </a>
            <div
              className="d-flex align-items-center"
              style={{ flexWrap: "nowrap" }}
            >
              <div className="dropdown d-block d-md-none">
                <button
                  className="btn btn-lang btn-sm btn-outline-primary dropdown-toggle text-uppercase mw-72"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  en
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-language dropdown-menu-end"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item active" href="#">
                      <img
                        className="me-2"
                        src={
                          require("../images/united-states-of-america.png")
                            .default
                        }
                        width="20"
                      />
                      <span>English</span>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <img
                        className="me-2"
                        src={require("../images/china.png").default}
                        width="20"
                      />
                      <span>Chinese</span>
                    </a>
                  </li>
                </ul>
              </div>
              <button
                className="navbar-toggler collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div
              className="navbar-collapse collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                <li className="nav-item me-2">
                  <Connect />
                </li>
                <li className="nav-item me-2">
                  <a
                    className="btn btn-outline-primary btn-sm btn-projects"
                    aria-current="page"
                    href="#"
                  >
                    <i className="mdi mdi-fire me-1"></i>
                    <span>Projects</span>
                  </a>
                </li>
                <li className="nav-item me-2">
                  <a
                    className="btn btn-outline-primary btn-sm btn-staking"
                    aria-current="page"
                    href="#"
                  >
                    <i className="mdi mdi-blender-software me-1"></i>
                    <span>Staking</span>
                  </a>
                </li>
                <li className="nav-item me-2">
                  <a
                    className="nav-link btn btn-sm btn-outline-primary btn-circle"
                    href="#"
                  >
                    <i className="mdi mdi-calendar-range-outline"></i>
                  </a>
                </li>
                <li className="nav-item me-2">
                  <button
                    className="nav-link btn btn-sm btn-outline-primary btn-circle"
                    type="button"
                  >
                    <i className="mdi mdi-lightbulb-on"></i>
                  </button>
                </li>
                <li className="nav-item d-md-block d-none">
                  <div className="dropdown">
                    <button
                      className="btn btn-lang btn-sm btn-outline-primary dropdown-toggle text-uppercase mw-72"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      en
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-language dropdown-menu-end"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a className="dropdown-item active" href="#">
                          <img
                            className="me-2"
                            src={
                              require("../images/united-states-of-america.png")
                                .default
                            }
                            width="20"
                          />
                          <span>English</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <img
                            className="me-2"
                            src={require("../images/china.png").default}
                            width="20"
                          />
                          <span>Chinese</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
}
