"use client"

import { UserContext } from "@/providers/user-provider";
import { useContext, useEffect, useState } from "react";

export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('useUser is out of its providers bound')
    }

    return context;
}
