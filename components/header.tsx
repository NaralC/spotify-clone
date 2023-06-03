"use client";

import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { ReactNode } from "react";
import Button from "./button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

// import useAuthModal from "@/hooks/useAuthModal";
// import { useUser } from "@/hooks/useUser";
// import usePlayer from "@/hooks/usePlayer";

// import Button from "./Button";

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  //   const player = usePlayer();
  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    //     player.reset();
    router.refresh();
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={twMerge(
        "h-fit p-6 bg-gradient-to-b from-emerald-800",
        className
      )}
    >
      <div className="flex items-center justify-between w-full mb-4">
        <div className="items-center hidden md:flex gap-x-2">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center transition bg-black rounded-full cursor-pointer hover:opacity-75"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="flex items-center justify-center transition bg-black rounded-full cursor-pointer hover:opacity-75"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>

        {/* Only shows up on mobile */}
        <div className="flex items-center md:hidden gap-x-2">
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center p-2 transition bg-white rounded-full cursor-pointer hover:opacity-75"
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            onClick={() => router.push("/search")}
            className="flex items-center justify-center p-2 transition bg-white rounded-full cursor-pointer hover:opacity-75"
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-4">
              <Button className="px-6 py-2 bg-white" onClick={handleLogout}>Logout</Button>
              <Button className="bg-white" onClick={() => { router.push('/account') }}><FaUserAlt /></Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="font-medium bg-transparent text-neutral-300"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="px-6 py-2 font-medium bg-white"
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
