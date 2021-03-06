import { ClientItemResponse } from "../Client";

/**
 * Maps the raw API response to the consistent ClientItemResponse
 *
 * Handles the following APIs:
 * - get()
 * - update()
 * - delete()
 */
export function toClientItemResponse(res: any): ClientItemResponse {
  console.log("toClientItemResponse()", res);
  return {
    id: res.id,

    url: res.link || undefined,
    name: res.file,
    mime: res.mime_type,
    extension: res.extension,

    title: res.title,
    caption: res.caption,
    description: res.description
  };
}
