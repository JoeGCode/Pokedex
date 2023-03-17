import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="text-white bg-bgSecondary shadow-lg p-4 flex items-center justify-center w-full my-0 mx-auto">
      <Link to="/">
        <h1 className="text-6xl font-bold cursor-pointer">Pokédex</h1>
      </Link>
    </div>
  );
};

export default Navbar;
