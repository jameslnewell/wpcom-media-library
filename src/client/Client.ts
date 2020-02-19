/**
 * Internal dependencies
 */
import { ItemData } from "../types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClientItemResponse extends ItemData {}

export interface ClientItemListResponse {
  media: ItemData[];
  errors: string[];
}

export interface Client {
  list(siteId: string): Promise<ClientItemListResponse>;
  createFromFile(siteId: string, file: File): Promise<ClientItemListResponse>;
  createFromURL(siteId: string, url: string): Promise<ClientItemListResponse>;
  get(siteId: string, mediaId: string): Promise<ClientItemResponse>;
  update(
    siteId: string,
    mediaId: string,
    data: Partial<ItemData>
  ): Promise<ClientItemResponse>;
  delete(siteId: string, mediaId: string): Promise<ClientItemResponse>;
}
