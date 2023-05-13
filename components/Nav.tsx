"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  interface Provide {
    name: string;
    id: string;
  }
  type Provider = Provide | null;

  const isUserLoggedIn: boolean = true;
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const [providers, setProviders] = useState<Provider>(null);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      // setProviders(response);
    };
  }, []);

  return (
    <div className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Our logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text"> GPT-prompter</p>
      </Link>
      {/* 
        {Desktop Navigation} */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>
            <button
              type="submit"
              onClick={() => signOut}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                alt="Profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: Provide) => (
                <button
                  type="submit"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                ></button>
              ))}
          </>
        )}
      </div>
      {/* {Mobile navigation} */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              alt="Profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: Provide) => (
                <button
                  type="submit"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                ></button>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
