"use client";

import { navLinks } from "@/constants";
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import UserButton from "./UserButton";
import { Skeleton } from "../ui/skeleton";
export interface IClientSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    isPreferencesDone: boolean;
    creditBalance: number;
    planId: number;

    // if null casues type issue, remove it
    // name: string;
    // email: string;
    // isPreferencesDone: boolean;
  };
}
const Sidebar = () => {
  const pathname = usePathname();
  const { data: session, status, update } = useSession();
  const clientSession = session as IClientSession | null;
  const loading = status === "loading";
  const isAuthenticated = status === "authenticated";

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        <nav className="sidebar-nav">
          {loading && (
            <div className="w-full flex flex-col h-full justify-start items-stretch">
              {Array.from({ length: 7 }).map((_, idx) => {
                return (
                  <Skeleton
                    key={idx}
                    className="h-10 w-full min-w-[200px] bg-gray-200 my-4"
                  />
                );
              })}
            </div>
          )}
          {!loading && isAuthenticated && (
            <>
              <ul className="sidebar-nav_elements">
                {navLinks.slice(0, 6).map((link) => {
                  const isActive = link.route === pathname;

                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group ${
                        isActive
                          ? "bg-purple-gradient text-white"
                          : "text-gray-700"
                      }`}
                    >
                      <Link className="sidebar-link" href={link.route}>
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive && "brightness-200"}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <ul className="sidebar-nav_elements">
                {navLinks.slice(6).map((link) => {
                  const isActive = link.route === pathname;

                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group ${
                        isActive
                          ? "bg-purple-gradient text-white"
                          : "text-gray-700"
                      }`}
                    >
                      <Link className="sidebar-link" href={link.route}>
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive && "brightness-200"}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}

                <li className="flex-center w-full cursor-pointer gap-2 p-4">
                  <UserButton
                    clientSession={clientSession}
                    afterSignOutUrl="/"
                    showName
                  />
                </li>
              </ul>
            </>
          )}

          {!loading && !isAuthenticated && (
            <>
              <Button asChild className="button bg-purple-gradient bg-cover">
                <Link href="/sign-in">Login</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
