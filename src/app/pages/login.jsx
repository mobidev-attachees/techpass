import React from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/events");
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
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
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}
