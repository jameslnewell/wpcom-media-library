/**
 * External dependencies
 */
import React from "react";
import ImageLoader from "react-render-image";

/**
 * Internal dependencies
 */
import { ItemStatus, ItemData } from "../../../types";
import { Image } from "./index.styles";

export interface ImagePreviewProps {
  status: ItemStatus;
  item: ItemData;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ item }) => {
  return (
    <>
      {item && item.url && (
        /** TODO: figure out what to show when loading the image errors */
        <ImageLoader src={item.url} errored="❌">
          {() => (
            <Image
              src={item.url}
              alt={item.alt}
              width={item.width}
              height={item.height}
            />
          )}
        </ImageLoader>
      )}
    </>
  );
};
