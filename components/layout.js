import React from 'react';
import Link from 'next/link'

export default function Layout({ children, home }) {
  return (
    <div className="h-full bg-gray-200">{children}</div>);
}
