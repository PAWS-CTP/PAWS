import React from 'react'

type Props = { className?: string }

export default function GoogleIcon({ className = '' }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <path fill="#4285F4" d="M24 9.5c3.5 0 6.3 1.2 8.2 2.2l6-5.8C35.9 4 30.5 2 24 2 14 2 5.6 7.7 2.1 16.1l7.5 5.8C11.9 15 17.3 9.5 24 9.5z" />
      <path fill="#34A853" d="M46.5 24.5c0-1.5-.1-2.7-.3-3.8H24v7.3h12.9c-.6 3.2-2.4 5.9-5.2 7.7v6h8.4c4.9-4.5 7.7-11 7.7-17.2z" />
      <path fill="#FBBC05" d="M9.6 31.9C8.7 29.4 8.2 26.6 8.2 23.5s.5-5.9 1.3-8.4L2.1 9.3C.8 12.4 0 15.9 0 19.5s.8 7.1 2.1 10.2l7.5-4.8z" />
      <path fill="#EA4335" d="M24 46c6.5 0 12-2.1 16-5.7l-8.4-6.4c-2.3 1.5-5.2 2.6-7.6 2.6-6.7 0-12.1-5.5-13.1-12.8L2.1 34.6C5.6 42.9 14 48.6 24 48.6z" />
    </svg>
  )
}
