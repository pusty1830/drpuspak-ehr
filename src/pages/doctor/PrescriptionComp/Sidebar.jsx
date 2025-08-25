import React from 'react'
import { useLocation } from "react-router-dom";


function Sidebar() {
    const location = useLocation();
  const { prescription } = location.state || {};
  return (
    <aside className="w-48 border-r p-5 hidden md:block">
          <h2 className="text-lg font-semibold mb-4">Advice</h2>
          <ul className="space-y-3">
            {prescription.advice.map((ad, idx) => (
          <li key={idx}>{ad}</li>
        ))}
          </ul>
        </aside>
  )
}

export default Sidebar
