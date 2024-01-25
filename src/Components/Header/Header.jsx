import React, { useState, useEffect, useRef } from 'react';
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleMenuItemClick = (item) => {
    // Handle item click logic here
    navigate(item.slug);
    closeMobileMenu();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <header className="py-3 shadow bg-gray-800 relative z-50">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4">
            <Link to="/">
            <Logo width="10" />
            </Link>
          </div>
          <div className="lg:hidden relative" ref={mobileMenuRef}>
            <button
              className="text-white focus:outline-none absolute right-0"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            {isMobileMenuOpen && (
              <div className="lg:hidden absolute top-full right-0 bg-gray-700 p-4 rounded-md z-50">
                <ul>
                  {navItems.map(
                    (item) =>
                      item.active && (
                        <li key={item.name} className="mb-2">
                          <button
                            onClick={() => handleMenuItemClick(item)}
                            className="px-3 py-2 rounded-full text-white hover:bg-blue-100 hover:text-gray-800 block w-full"
                          >
                            {item.name}
                          </button>
                        </li>
                      )
                  )}
                  {authStatus && (
                    <li className="mb-2">
                      <LogoutBtn />
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className="hidden lg:flex items-center">
            {/* Larger Screen Navigation */}
            <ul className="flex ml-auto">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name} className="mr-4">
                      <button
                        onClick={() => navigate(item.slug)}
                        className="px-3 py-2 rounded-full text-white hover:bg-blue-100 hover:text-gray-800"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header