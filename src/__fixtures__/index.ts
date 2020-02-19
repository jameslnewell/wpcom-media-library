/**
 * Internal dependencies
 */
import { ItemData } from "../types";
import { MockClient } from "../client";

export const siteId = "160146488";

export const imageId = "image-123";
export const imageData: ItemData = {
  id: imageId,
  url:
    "https://test790749266.files.wordpress.com/2020/02/e68ecb675ad7c0561595ed4265420a1a.jpg",
  name: "e68ecb675ad7c0561595ed4265420a1a.jpg",
  extension: "jpg",
  mime: "image/jpeg",
  createdAt: "2020-02-02T23:43:20+00:00",
  width: 1016,
  height: 675,
  title: "Its fine!"
};

export const notFoundError = "Media not found ☹️";

export const loadingClient = new MockClient({
  get: () =>
    new Promise(() => {
      /* do nothing */
    })
});

export const loadedClient = new MockClient({
  get: () => Promise.resolve(imageData)
});

export const erroredClient = new MockClient({
  get: () => Promise.reject(notFoundError)
});
