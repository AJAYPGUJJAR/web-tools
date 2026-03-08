import React from 'react';
import "../styles/GeneralCustomHeader.css";

export default function GeneralCustomHeader() {
  return (
    <div>
        <div className="header">
            <div className="company-name">My Company</div>
            <nav className="nav-links">
                <a href="/">Home</a>
                <a href="/">About</a>
                <a href="/">Contact</a>
            </nav>
        </div>
    </div>
  )
}
