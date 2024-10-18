import React from "react";

const MyComponent = () => {
  return (
    <div className="overflow-hidden bg-white rounded shadow-lg">
      <div className="container-fluid col-xxl-8">
        <div className="row flex-lg-nowrap align-items-center g-5">
          <div className="order-lg-1 w-100 col-lg-6 col-xl-5">
            <img
            //   style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 99%, 0% 100%)" }}
              style={{ clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)" }}

              src="favicon.jpeg"
              className="d-block mx-lg-auto img-fluid"
              alt="Photo by Milad Fakurian"
              loading="lazy"
              
              sizes="(max-width: 1080px) 100vw, 1080px"
              width="600"
              height="400"
            />
          </div>
          <div className="col-lg-6 col-xl-5 text-center text-lg-start pt-lg-3 mt-xl-3">
            <div className="lc-block mb-3">
              <h1 className="fw-bold display-3">Techpass</h1>
            </div>

            <div className="lc-block mb-3 bg-white">
              <p className="rfs-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et
                metus id ligula malesuada placerat sit amet quis enim.
              </p>
            </div>

            <div className="lc-block mb-4">
              <a className="btn btn-success px-4 me-md-2 btn-lg" href="#" role="button">
                Get it now
              </a>
            </div>

            <div className="lc-block">
              <p className="fw-bold">Business collaboration based on trust:</p>
            </div>

            <div className="row">
              <div className="lc-block col-3">
                <img
                  className="img-fluid wp-image-975"
                  src="https://lclibrary.b-cdn.net/starters/wp-content/uploads/sites/15/2021/11/motorola.svg"
                  alt="Motorola"
                />
              </div>
              <div className="lc-block col-3">
                <img
                  className="img-fluid wp-image-977"
                  src="https://lclibrary.b-cdn.net/starters/wp-content/uploads/sites/15/2021/11/asus.svg"
                  alt="Asus"
                />
              </div>
              <div className="lc-block col-3">
                <img
                  className="img-fluid wp-image-974"
                  src="https://lclibrary.b-cdn.net/starters/wp-content/uploads/sites/15/2021/11/sony.svg"
                  alt="Sony"
                />
              </div>
              <div className="lc-block col-3">
                <img
                  className="img-fluid wp-image-967"
                  src="https://lclibrary.b-cdn.net/starters/wp-content/uploads/sites/15/2021/11/samsung-282297.svg"
                  alt="Samsung"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
