import { createContext, useContext, type ReactNode } from "react";

import type { NavItem } from "@/lib/payload/navigation";
import { getDefaultNavigation } from "@/lib/payload/navigation";

const NavContext = createContext<NavItem[]>(getDefaultNavigation());

export function NavProvider({ items, children }: { items: NavItem[]; children: ReactNode }) {
  return <NavContext.Provider value={items}>{children}</NavContext.Provider>;
}

export function useSiteNav(): NavItem[] {
  return useContext(NavContext);
}
