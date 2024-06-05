// import "bootstrap/dist/css/bootstrap.min.css";
"use client";
import React from "react";

const Profile = () => {
  return (
    <div className="container">
      <div className="card overflow-hidden">
        <div className="card-body p-0">
          <img
            src="https://www.bootdey.com/image/1352x300/FF00FF/000000"
            alt=""
            className="img-fluid"
          />
          <div className="row align-items-center">
            <div className="col-lg-4 order-lg-1 order-2">
              <div className="d-flex align-items-center justify-content-around m-4">
                <div className="text-center">
                  <i className="fa fa-file fs-6 d-block mb-2"></i>
                  <h4 className="mb-0 fw-semibold lh-1">938</h4>
                  <p className="mb-0 fs-4">Posts</p>
                </div>
                <div className="text-center">
                  <i className="fa fa-user fs-6 d-block mb-2"></i>
                  <h4 className="mb-0 fw-semibold lh-1">3,586</h4>
                  <p className="mb-0 fs-4">Followers</p>
                </div>
                <div className="text-center">
                  <i className="fa fa-check fs-6 d-block mb-2"></i>
                  <h4 className="mb-0 fw-semibold lh-1">2,659</h4>
                  <p className="mb-0 fs-4">Following</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-n3 order-lg-2 order-1">
              <div className="mt-n5">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <div
                    className="linear-gradient d-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: "110px", height: "110px" }}
                  >
                    <div
                      className="border border-4 border-white d-flex align-items-center justify-content-center rounded-circle overflow-hidden"
                      style={{ width: "100px", height: "100px" }}
                    >
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt=""
                        className="w-100 h-100"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h5 className="fs-5 mb-0 fw-semibold">Mathew Anderson</h5>
                  <p className="mb-0 fs-4">Designer</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 order-last">
              <ul className="list-unstyled d-flex align-items-center justify-content-center justify-content-lg-start my-3 gap-3">
                <li className="position-relative">
                  <a
                    className="text-white d-flex align-items-center justify-content-center bg-primary p-2 fs-4 rounded-circle"
                    href="#"
                    width="30"
                    height="30"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li className="position-relative">
                  <a
                    className="text-white bg-secondary d-flex align-items-center justify-content-center p-2 fs-4 rounded-circle "
                    href="#"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li className="position-relative">
                  <a
                    className="text-white bg-secondary d-flex align-items-center justify-content-center p-2 fs-4 rounded-circle "
                    href="#"
                  >
                    <i className="fa fa-dribbble"></i>
                  </a>
                </li>
                <li className="position-relative">
                  <a
                    className="text-white bg-danger d-flex align-items-center justify-content-center p-2 fs-4 rounded-circle "
                    href="#"
                  >
                    <i className="fa fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <button className="btn btn-primary">Add To Story</button>
                </li>
              </ul>
            </div>
          </div>
          <ul
            className="nav nav-pills user-profile-tab justify-content-end mt-2 bg-light-info rounded-2"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="true"
              >
                <i className="fa fa-user me-2 fs-6"></i>
                <span className="d-none d-md-block">Profile</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
                id="pills-followers-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-followers"
                type="button"
                role="tab"
                aria-controls="pills-followers"
                aria-selected="false"
                tabIndex="-1"
              >
                <i className="fa fa-heart me-2 fs-6"></i>
                <span className="d-none d-md-block">Followers</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
                id="pills-friends-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-friends"
                type="button"
                role="tab"
                aria-controls="pills-friends"
                aria-selected="false"
                tabIndex="-1"
              >
                <i className="fa fa-users me-2 fs-6"></i>
                <span className="d-none d-md-block">Friends</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
                id="pills-gallery-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-gallery"
                type="button"
                role="tab"
                aria-controls="pills-gallery"
                aria-selected="false"
                tabIndex="-1"
              >
                <i className="fa fa-photo me-2 fs-6"></i>
                <span className="d-none d-md-block">Gallery</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-followers"
          role="tabpanel"
          aria-labelledby="pills-followers-tab"
          tabIndex="0"
        >
          <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
            <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">
              Followers
              <span className="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">
                20
              </span>
            </h3>
            <form className="position-relative">
              <input
                type="text"
                className="form-control search-chat py-2 ps-5"
                id="text-srh"
                placeholder="Search Followers"
              />
              <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3"></i>
            </form>
          </div>
          <div className="row">
            <div className="col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body p-4 d-flex align-items-center gap-3">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt=""
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                  <div>
                    <h5 className="fw-semibold mb-0">Betty Adams</h5>
                    <span className="fs-2 d-flex align-items-center">
                      <i className="ti ti-map-pin text-dark fs-3 me-1"></i>Sint
                      Maarten
                    </span>
                  </div>
                  <button className="btn btn-outline-primary py-1 px-2 ms-auto">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
