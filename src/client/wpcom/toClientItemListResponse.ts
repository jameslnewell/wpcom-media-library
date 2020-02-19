import { ClientItemListResponse } from "../Client";

/**
 * Maps the raw API response from to the consistent ClientItemListResponse
 *
 * Handles the following APIs:
 * - list()
 * - create*()
 */
export function toClientItemListResponse(res: any): ClientItemListResponse {
  console.log("toClientItemListResponse()", res);
  return {
    media: res.media.map((media: any) => ({
      id: media.id,

      url: media.link || undefined,
      name: media.file,
      mime: media.mime_type,
      extension: media.extension,

      title: media.title,
      caption: media.caption,
      description: media.description
    })),
    errors: res.errors
  };
}
