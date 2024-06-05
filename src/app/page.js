import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-white color-white">
        <div className="container-fluid justify-content-between">
          <a className="navbar-brand" href="/">TechPass</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style={{ "--bs-scroll-height": "100px" }}>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Image src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" alt=""></Image>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                  <li><a className="dropdown-item" href="#">Dashboard</a></li>
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li></li>
                  <li><a className="dropdown-item" href="/login">Logout</a></li>
                </ul>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>

     
      <main className={styles.main}>
       {/* Search Bar */}
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', maxWidth: '600px', width: '100%', marginLeft:'30%', marginTop: '30px'}}>
          <input type="text" placeholder="Search..." style={{ flex: '1', padding: '10px', borderRadius: '4px', marginRight: '0px', border: '1px solid #ccc', maxWidth: '70%' }} />
          <select name="cities" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', maxWidth: '28%' }}>
            <option value="newyork">New York</option>
            <option value="losangeles">Los Angeles</option>
            <option value="chicago">Chicago</option>
            <option value="houston">Houston</option>
            <option value="phoenix">Phoenix</option>
          </select>
        </div>
        <div className={styles.imageContainer}>
          <Image
            className={styles.banner}
            src="/220.jpg"
            alt="banner image"
            width={200}
            height={200}
            layout="responsive"
          />
          <div className={styles.textOverlay}>
            <h2 style={{ margin: 0, fontSize: '2em', color:'white' }}>TechPass</h2>
            <p style={{ margin: 0, fontSize: '1em', color:'white' }}>The best platform for online meetings</p>
          </div>
        </div>
        {/* Explore Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '20px', maxWidth: '600px', width: '100%',margin:'20px 30%', marginRight:'20%' }}>
          <h4>Explore Categories</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <select name="categories" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px', flex: '1' }}>
              <option value="last30days">Last 30 Days</option>
              <option value="last7days">Last 7 Days</option>
              <option value="alltime">All Time</option>
              <option value="last3days">Last 3 Days</option>
            </select>
            <select name="exploreCities" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px', flex: '1' }}>
              <option value="newyork">New York</option>
              <option value="losangeles">Los Angeles</option>
              <option value="chicago">Chicago</option>
              <option value="houston">Houston</option>
              <option value="phoenix">Phoenix</option>
            </select>
            <select name="topics" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flex: '1' }}>
              <option value="ai">AI</option>
              <option value="filming">Filming</option>
              <option value="technology">Technology</option>
              <option value="music">Music</option>
            </select>
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <Link href="/event">
              <div>
                <Image
                  src="/223.jpg"
                  alt="event 1"
                  width={200}
                  height={200}
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <div className={styles.cardColumnSmall}>
                    <p>Date</p>
                  </div>
                  <div className={styles.cardColumnLarge}>
                    <p>Topic:</p>
                    <p>Location or venue:</p>
                    <p>Time:</p>
                    <p>Ticket:</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className={styles.card}>
            <Link href="/event">
              <div>
                <Image
                  src="/223.jpg"
                  alt="event 1"
                  width={200}
                  height={200}
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <div className={styles.cardColumnSmall}>
                    <p>Date</p>
                  </div>
                  <div className={styles.cardColumnLarge}>
                    <p>Topic:</p>
                    <p>Location or venue:</p>
                    <p>Time:</p>
                    <p>Ticket:</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className={styles.card}>
            <Link href="/event">
              <div>
                <Image
                  src="/223.jpg"
                  alt="event 1"
                  width={200}
                  height={200}
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <div className={styles.cardColumnSmall}>
                    <p>Date</p>
                  </div>
                  <div className={styles.cardColumnLarge}>
                    <p>Topic:</p>
                    <p>Location or venue:</p>
                    <p>Time:</p>
                    <p>Ticket:</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className={styles.card}>
            <Link href="/event">
              <div>
                <Image
                  src="/223.jpg"
                  alt="event 1"
                  width={200}
                  height={200}
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <div className={styles.cardColumnSmall}>
                    <p>Date</p>
                  </div>
                  <div className={styles.cardColumnLarge}>
                    <p>Topic:</p>
                    <p>Location or venue:</p>
                    <p>Time:</p>
                    <p>Ticket:</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
       </div>
      </main>
    </div>
  );
}
