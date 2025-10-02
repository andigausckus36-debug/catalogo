// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 flex justify-center items-center bg-white shadow-md z-50">
      <Link to="/">
        <img
          src="https://i.postimg.cc/vZwcpZB4/Logo-Centro-Hol-stico-Minimalista-Beige-y-Caf-20250606-132545-0000.png"
          alt="Logo"
          className="h-16"
        />
      </Link>
    </nav>
  );
};

export default Navbar;