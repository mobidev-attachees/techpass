"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const Register = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/login");
  };

  return (
    <main className={styles.main}>
  <div className={styles.container}>
    <h1>Register</h1>
    <form>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <br />
      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </form>
  </div>
</main>

  );
};

export default Register;
