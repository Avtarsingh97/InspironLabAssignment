import React, { useState } from "react";
import { Dropdown } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../helper";
import useUserStore from "../stores/user";

const NavBar = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   // Handle logout logic
  const onLogoutBtnClick = () => {
    removeToken();
    setUser(null);
    navigate("/");
  };

  // Dropdown items for logged-in user
  const items = [
    {
      key: "1",
      label: (
        <NavLink to='/dashboard'>
          <p className='py-2 bg-indigo-600 rounded-md text-white px-5 text-md font-semibold'>Dashboard</p>
        </NavLink>
      ),
    },
    {
      key: "2",
      label: (
        <button
          onClick={onLogoutBtnClick}
          className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md w-full text-md'
        >
          Logout
        </button>
      ),
    },
  ];

  return (
    <header className='bg-gray-900 text-white shadow-md sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
        {/* Logo */}
        <div>
          <NavLink
            to='/'
            className='text-2xl font-bold text-indigo-300 hover:text-indigo-200 transition-all duration-500'
          >
            NoteX
          </NavLink>
        </div>

        {/* Desktop Menu - hidden on mobile */}
        <div className='hidden md:flex items-center gap-6'>
          {!user ? (
            <>
              <NavLink
                to='/signin'
                className='px-6 py-2 rounded-md border border-indigo-500 text-indigo-400 hover:bg-indigo-600 hover:text-white transition duration-300'
              >
                Sign In
              </NavLink>
              <NavLink
                to='/signup'
                className='px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-300'
              >
                Get Started
              </NavLink>
            </>
          ) : (
            // If logged in, show user initial with dropdown menu
            <Dropdown
              menu={{ items }}
              placement='bottomRight'
              arrow
            >
              <button className='bg-indigo-500 px-4 py-2 rounded-full hover:bg-indigo-600 text-xl font-semibold'>
                {user.name.charAt(0).toUpperCase()}
              </button>
            </Dropdown>
          )}
        </div>

        {/* Mobile Toggle Button - visible only on small screens */}
        <div className='md:hidden'>
          {!user ? (
            <>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='text-white text-3xl focus:outline-none'
              >
                ☰
              </button>
            </>
          ) : (
            // Logged-in user dropdown on mobile
            <Dropdown
              menu={{ items }}
              placement='bottomRight'
              arrow
            >
              <button className='bg-indigo-500 px-4 py-2 rounded-full hover:bg-indigo-600 text-xl font-semibold'>
                {user.name.charAt(0).toUpperCase()}
              </button>
            </Dropdown>
          )}
        </div>
      </div>

      {/* Mobile Menu - only for unauthenticated users */}
      {isMobileMenuOpen && !user && (
        <div className='absolute top-[65px] w-full md:hidden bg-gray-800/96 px-6 pb-4 h-screen flex flex-col justify-center'>
          <NavLink
            to='/signin'
            className='block w-full text-center text-indigo-400 border border-indigo-500 rounded-md py-2 mt-2 hover:bg-indigo-600 hover:text-white transition duration-300'
          >
            Sign In
          </NavLink>
          <NavLink
            to='/signup'
            className='block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-2 mt-2 transition duration-300'
          >
            Get Started
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default NavBar;
