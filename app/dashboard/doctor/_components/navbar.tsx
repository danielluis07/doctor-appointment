"use client";

import { IoIosMenu } from "react-icons/io";
import { IoMoonOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import placeholder from "@/public/placeholder-logo.jpg";
import { useOpenSidebar } from "@/hooks/use-open-sidebar";
import { useSession } from "next-auth/react";
import { Notifications } from "./notifications";
import { User } from "next-auth";

type NavbarProps = {
  user: User;
};

export const Navbar = ({ user }: NavbarProps) => {
  const { isOpen, onOpen, onClose } = useOpenSidebar();
  const isDarkMode = false;
  const toggleSidebar = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <button
        className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
        onClick={toggleSidebar}>
        <IoIosMenu className="w-4 h-4" />
      </button>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div className="h-6">
            <button onClick={() => {}}>
              {isDarkMode ? (
                <IoSunnyOutline
                  className="cursor-pointer text-gray-500"
                  size={24}
                />
              ) : (
                <IoMoonOutline
                  className="cursor-pointer text-gray-500"
                  size={24}
                />
              )}
            </button>
          </div>
          <Notifications />
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="relative size-10">
              <Image
                src={user?.image || placeholder}
                alt="Profile"
                fill
                sizes="200px"
                className="rounded-full h-full object-cover"
              />
            </div>
            <span className="font-semibold">{user?.name}</span>
          </div>
        </div>
        <Link href="/settings">
          <IoSettingsOutline
            className="cursor-pointer text-gray-500"
            size={24}
          />
        </Link>
      </div>
    </div>
  );
};
