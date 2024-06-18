// BannerCarousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './BannerCarousel.module.css'; // Your CSS module

const images = [
  '/220.jpg',
  '/226.jpg',
  '/223.jpg',
];

const BannerCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: dots => (
      <div style={{ bottom: '20px' }}>
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className={styles.dot}>
        <img src={images[i]} alt={`Dot ${i}`} />
      </div>
    )
  };

  return (
    <section className={`${styles.hero} bsb-hero-5 px-3 bsb-overlay`}>
      <div className="container">
        <div className="row justify-content-md-center align-items-center">
        <div className="">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index} className={styles.slide}>
                  <img src={image} alt={`Slide ${index}`} />
                  <div className={`${styles.content} text-white`}>
                    <div className={styles.text}>
                      <h6 className="fw-bold mb-4">Techpass</h6>
                      <p className="lead mb-5">
                        All your events in one place
                      </p>
                      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        {/* <button type="button" className="btn bsb-btn-2xl btn-outline-light">Free Consultation</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerCarousel;