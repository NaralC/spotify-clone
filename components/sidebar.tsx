"use client";

import React, { FC, ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Snackbar,
  TextField,
} from "@mui/material";
import Box from "./box";
import SidebarItem from "./sidebar-item";
import Library from "./library";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "Search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "Search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full">
      <div
        className="
        hidden 
        md:flex
        flex-col
        gap-y-2
        bg-black
        h-full
        w-[300px]
        p2
      "
      >
        <Box>
          <div className="flex flex-col px-5 py-4 gap-y-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library songs={[]} />
        </Box>
      </div>
      <main className="flex-1 h-full p-2 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Sidebar;
