import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="container">
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 shadow-sm  rounded bg-dark">
        <div className="col mb-3">
          <a className="navbar-brand text-white" href="/"><Image src="/favicon.jpeg" width="30" height="30" alt="profile image" className='rounded-circle'></Image>TechPass</a>
          <hr className="text-white"></hr>
          <p className="text-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-c-circle" viewBox="0 0 16 16">
              <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512"/>
            </svg> 2024 All rights reserved
          </p>
        </div>

        <div className="col mb-3"></div>

        <div className="col mb-3">
          <h5></h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-white">About</a>
            </li>
          </ul>
        </div>

        <div className="col mb-3">
          <h5></h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-white">FAQ</a>
            </li>
          </ul>
        </div>

        <div className="col mb-3">
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="/events" className="nav-link p-0 text-white">Events</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
