"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  interface Provider {
    name: string;
    id: string;
  }

  interface Provide {
    providers: Provider;
    setProviders: React.Dispatch<React.SetStateAction<Provider>>;
  }

  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const [providers, setProviders] = useState<Provide | null>(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      // @ts-ignore
      setProviders(response);
    };
    setUpProviders();
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
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>
            <button
              type="submit"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image!}
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
              Object.values(providers).map((provider: Provider) => (
                <button
                  type="submit"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* {Mobile navigation} */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image!}
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
              Object.values(providers).map((provider: Provider) => (
                <button
                  type="submit"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  {" "}
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
