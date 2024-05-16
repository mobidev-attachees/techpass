// app/login/page.js
"use client";
import React from "react";
import { useRouter } from "next/navigation";


export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/event");
  };

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="main-container form" style={{ maxWidth: '600px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)' }}>
        <div className="form-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1>Login</h1>
          <form style={{ width: 'auto' }}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" className="form-control" id="email" />
            </div>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" className="form-control" id="password" />
            </div>
            <button type="button" onClick={handleLogin} className="btn btn-primary" style={{ width: 'auto' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
