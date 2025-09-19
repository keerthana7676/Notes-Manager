import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="app-logo-link">
        <img src={logo} alt="Notes Manager Logo" className="app-logo" />
        <h1 className="app-name">Notes Manager</h1>
      </Link>
    </header>
  );
}