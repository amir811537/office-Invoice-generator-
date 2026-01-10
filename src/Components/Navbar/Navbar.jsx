/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/bg removed.png";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const navlinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-lg font-medium px-3 py-2 rounded-md transition ${
              isActive ? "text-primary font-semibold" : "hover:text-primary"
            }`
          }
        >
          Invoice Generator
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dailyReport"
          className={({ isActive }) =>
            `text-lg font-medium px-3 py-2 rounded-md transition ${
              isActive ? "text-primary font-semibold" : "hover:text-primary"
            }`
          }
        >
          Daily Report
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/AddCustomer"
          className={({ isActive }) =>
            `text-lg font-medium px-3 py-2 rounded-md transition ${
              isActive ? "text-primary font-semibold" : "hover:text-primary"
            }`
          }
        >
Add Customers </NavLink>
      </li>
      <li>
        <NavLink
          to="/selling"
          className={({ isActive }) =>
            `text-lg font-medium px-3 py-2 rounded-md transition ${
              isActive ? "text-primary font-semibold" : "hover:text-primary"
            }`
          }
        >
          Add Selling 
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/details"
          className={({ isActive }) =>
            `text-lg font-medium px-3 py-2 rounded-md transition ${
              isActive ? "text-primary font-semibold" : "hover:text-primary"
            }`
          }
        >
          Details  
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      {/* Overlay */}
      {isDrawerOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <nav className="w-full bg-white shadow-md px-4 md:px-8">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDrawer}
              className="lg:hidden text-2xl text-gray-700"
            >
              {isDrawerOpen ? <RiCloseLine /> : <RiMenu3Line />}
            </button>

            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-6 text-black">
            {navlinks}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <button onClick={toggleDrawer} className="text-2xl">
            <RiCloseLine />
          </button>
        </div>

        <ul className="menu p-4 space-y-2 text-black">{navlinks}</ul>
      </div>
    </>
  );
};

export default Navbar;
