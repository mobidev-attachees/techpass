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
          <p>The best platform for online meetings</p>
        </div>
      </div>

      <div className={styles.grid}>        
        <div className={styles.card}>
            <Link href="/event">
            <Image
              src="/223.jpg"
              alt="event 1"
              width={200}
              height={200}
            />
            </Link>
            <div>
              <h2>Event 1</h2>
              <p>Date:</p>
            </div>
          </div>
        


          <div className={styles.card}>
            <Link href="/event">
            <Image
              src="/226.jpg"
              alt="event 2"
              width={200}
              height={200}
            />
            </Link>
            <div>
              <h2>Event 2</h2>
              <p>Date:</p>
            </div>
          </div>
          <div className={styles.card}>
            <Link href="/event">
            <Image
              src="/223.jpg"
              alt="event 1"
              width={200}
              height={200}
            />
            </Link>
            <div>
              <h2>Event 1</h2>
              <p>Date:</p>
            </div>
          </div>
          <div className={styles.card}>
            <Link href="/event">
            <Image
              src="/223.jpg"
              alt="event 1"
              width={200}
              height={200}
            />
            </Link>
            <div>
              <h2>Event 1</h2>
              <p>Date:</p>
            </div>
          </div>
      </div>
      
    </main>
  );
}
