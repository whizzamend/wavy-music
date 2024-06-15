"use client";

import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUsers";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import toast from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";
import Link from "next/link";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  const [showModal, setShowModal] = useState(false);
  const player = usePlayer();
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    setShowModal(false);
    const { error } = await supabaseClient.auth.signOut();

    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out");
    }
  };

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={twMerge("h-fit bg-gradient-to-b from-blue-800 p-6", className)}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => {
              router.back();
            }}
            className="rounded-full bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={30} className="text-black"></RxCaretLeft>
          </button>
          <button
            onClick={() => {
              router.forward();
            }}
            className="rounded-full bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={30} className="text-black"></RxCaretRight>
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <Link href="/">
            <Button className="bg-white">
              <HiHome className="text-black" />
            </Button>
          </Link>
          <Link href="/search">
            <Button className="bg-white">
              <BiSearch className="text-black" />
            </Button>
          </Link>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              {windowWidth < 768 ? (
                <Button onClick={handleLogout} className="bg-white">
                  <FaSignOutAlt />
                </Button>
              ) : (
                <div>
                  <Button onClick={handleLogout} className="bg-white px-6 py-2">
                    Logout
                  </Button>
                </div>
              )}
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-white px-6 py-2 font-medium"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
