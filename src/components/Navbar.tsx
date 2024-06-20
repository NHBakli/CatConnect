"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/Auth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="pt-5">
      <header className="bg-navbarBg w-4/5 mx-auto rounded-2xl">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link
                className="block hover:bg-hoverNavbarBg rounded-xl p-1"
                href="/"
              >
                <Image src="/favicon.ico" width={40} height={40} alt="logo" />
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link className="text-white hover:text-white/75" href="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white hover:text-white/75"
                      href="/breeds"
                    >
                      Breeds
                    </Link>
                  </li>
                  {user && (
                    <>
                      <li>
                        <Link
                          className="text-white hover:text-white/75"
                          href="/favorite"
                        >
                          Favorite
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-white hover:text-white/75"
                          href="/votes"
                        >
                          Votes
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {user ? (
                  <>
                    <Link
                      className="rounded-md bg-customIndigo px-5 py-2.5 text-sm font-medium text-white hover:bg-hoverCustomIndigo"
                      href="/profile"
                    >
                      Profile
                    </Link>
                    <Link
                      className="rounded-md bg-customBlue px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-hoverCustomBlue"
                      href="/logout"
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      className="rounded-md bg-customBlue px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-hoverCustomBlue"
                      href="/login"
                    >
                      Sign-in
                    </Link>
                    <div className="hidden sm:flex">
                      <Link
                        className="rounded-md bg-customIndigo px-5 py-2.5 text-sm font-medium text-white hover:bg-hoverCustomIndigo"
                        href="/signup"
                      >
                        Sign-up
                      </Link>
                    </div>
                  </>
                )}
              </div>

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
