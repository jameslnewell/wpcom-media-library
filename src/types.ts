export enum ItemStatus {
  LOADING,
  LOADED,
  DELETED,
  ERRORED
}

export interface ItemData {
  id: string;

  url?: string;
  name?: string;
  mime?: string;
  extension?: string;
  width?: number;
  height?: number;

  createdAt?: string;

  title: string;
  alt?: string;
  caption?: string;
  description?: string;
}

export type ItemError = any;

export interface Item {
  refs: number;
  status: ItemStatus;
  data: ItemData | undefined;
  error: ItemError | undefined;
}

export interface ItemMap {
  [itemId: string]: Item;
}

export interface SiteItemMap {
  [siteId: string]: ItemMap;
}
