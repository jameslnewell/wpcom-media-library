/**
 * External dependencies
 */
import React from "react";
import { Spinner } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { ItemData, ItemStatus } from "../../types";
import { ImagePreview } from "./ImagePreview";

const getMimeType = (mime: string | undefined): string | undefined => {
  if (!mime) {
    return undefined;
  }
  const match = mime.match(/^([^/]+)\//);
  console.log(match);
  if (!match) {
    return undefined;
  }
  return match[1];
};

export interface PreviewProps {
  status: ItemStatus;
  item?: ItemData;
}

export const Preview: React.FC<PreviewProps> = ({ status, item }) => {
  if (!item) {
    // TODO: handle loading and error better
    return <Spinner />;
  }
  console.log(getMimeType(item.mime));
  switch (getMimeType(item.mime)) {
    case "image":
      return <ImagePreview status={status} item={item} />;
    case "audio":
      return null;
    case "video":
      return null;
    default:
      // document
      return null;
  }
};
