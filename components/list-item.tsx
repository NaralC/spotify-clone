"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

// import useAuthModal from "@/hooks/useAuthModal";
// import { useUser } from "@/hooks/useUser";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({
  image,
  name,
  href,
}) => {
  const router = useRouter();
//   const authModal = useAuthModal();
//   const { user } = useUser();
  
  const onClick = () => {
    // if (!user) {
    //   return authModal.onOpen();
    // }

    router.push(href);
  };

  return ( 
    <button
      onClick={onClick}
      className="relative flex items-center pr-4 overflow-hidden transition rounded-md cursor-pointer group gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image
          className="object-cover"
          src={image}
          fill
          alt="Image"
        />
      </div>
      <p className="py-5 font-medium truncate">
        {name}
      </p>
      <div 
        className="absolute flex items-center justify-center p-4 transition bg-green-500 rounded-full opacity-0 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110"
      >
        <FaPlay className="text-black" />
      </div>
    </button>
   );
}
 
export default ListItem;