/**
 * External dependencies
 */
import React from "react";

/**
 * Internal dependencies
 */
import { SiteItemMap } from "./types";

export interface ContextProps {
  items: SiteItemMap;
  load: (siteId: string, itemId: string) => Promise<void>;
  update: (siteId: string, itemId: string, data: {}) => Promise<void>;
  reference: (siteId: string, itemId: string) => void;
  dereference: (siteId: string, itemId: string) => void;
}

export const Context = React.createContext<ContextProps | undefined>(undefined);
