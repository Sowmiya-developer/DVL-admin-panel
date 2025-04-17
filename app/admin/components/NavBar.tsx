import * as React from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/admin" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Login", href: "/auth" },
  { name: "2FA", href: "/auth/twofactorauth" },
];

const NavBar = () => {
  return (
    <>
      <nav className="flex items-center justify-end p-5 sticky top-0">
        <div className="flex space-x-5 items-center justify-center font-semibold">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:text-blue-500 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
