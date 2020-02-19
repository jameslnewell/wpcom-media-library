/**
 * Internal dependencies
 */
import { ItemData } from "../../../types";
import {
  Client,
  ClientItemResponse,
  ClientItemListResponse
} from "../../Client";
import { toClientItemResponse } from "../toClientItemResponse";
import { toClientItemListResponse } from "../toClientItemListResponse";
import { fetch } from "./fetch";

export class WPCOMBrowserClient implements Client {
  public async list(siteId: string): Promise<ClientItemListResponse> {
    // TODO: support criteria e.g. mime_type
    const res = await fetch("GET", `/sites/${siteId}/media`);
    // TODO: transform response to be a consistent data structure (same as .get())
    return toClientItemListResponse(res);
  }

  public async createFromFile(
    siteId: string,
    file: File
  ): Promise<ClientItemListResponse> {
    const res = await fetch("POST", `/sites/${siteId}/media/new`, [
      ["media[]", file]
    ]);
    return toClientItemListResponse(res);
  }

  public async createFromURL(
    siteId: string,
    url: string
  ): Promise<ClientItemListResponse> {
    const res = await fetch("POST", `/sites/${siteId}/media/new`, [
      ["media_urls[]", url]
    ]);
    return toClientItemListResponse(res);
  }

  public async get(
    siteId: string,
    mediaId: string
  ): Promise<ClientItemResponse> {
    const res = await fetch("GET", `/sites/${siteId}/media/${mediaId}`);
    return toClientItemResponse(res);
  }

  public async update(
    siteId: string,
    mediaId: string,
    data: Partial<ItemData>
  ): Promise<ClientItemResponse> {
    const keys: Array<keyof ItemData> = Object.keys(data) as any;
    const res = await fetch("POST", `/sites/${siteId}/media/${mediaId}`, [
      ["ID", mediaId],
      ...keys.map(key => [key, data[key]])
    ]);
    return toClientItemResponse(res);
  }

  public async delete(
    siteId: string,
    mediaId: string
  ): Promise<ClientItemResponse> {
    const res = await fetch("POST", `/sites/${siteId}/media/${mediaId}/delete`);
    return toClientItemResponse(res);
  }
}
