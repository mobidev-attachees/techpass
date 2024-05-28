// pages/protected.js
"use client";
import { useSession, signIn } from 'next-auth/react'

export default function ProtectedPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return (
      <div>
        <h1>You are not signed in</h1>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {session.user.name}</p>
    </div>
  )
}
