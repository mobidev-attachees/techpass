import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          TechPass - Your Tech Hub
        </p>
        <div>
          <Link href="/login">
            Login
          </Link>
          <Link href="/register">
            Register
          </Link>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <Image
          className={styles.banner}
          src="/220.jpg"
          alt="banner image"
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.textOverlay}>
          <h2>TechPass</h2>
          <p>Some additional text can go here.</p>
        </div>
      </div>

      <div className={styles.grid}>        
        <div className={styles.card}>
            <Link href="/event">
            <Image
              src="/Capture.JPG"
              alt="event 1"
              width={100}
              height={100}
            />
            </Link>
            <div>
              <h2>Event 1</h2>
              <p>Date:</p>
            </div>
          </div>
        


        <div className={styles.card}>
          <Image
            src="/Capture.JPG"
            alt="event 1"
            width={100}
            height={100}
          />
          <div>
            <h2>Event 1</h2>
            <p>Date:</p>
          </div>
        </div>
        <div className={styles.card}>
          <Image
            src="/Capture.JPG"
            alt="event 1"
            width={100}
            height={100}
          />
          <div>
            <h2>Event 1</h2>
            <p>Date:</p>
          </div>
        </div>
        <div className={styles.card}>
          <Image
            src="/Capture.JPG"
            alt="event 1"
            width={100}
            height={100}
          />
          <div>
            <h2>Event 1</h2>
            <p>Date:</p>
          </div>
        </div>
      </div>
      
    </main>
  );
}
