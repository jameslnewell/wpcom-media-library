import { SiteItemMap, ItemStatus } from "../types";
import { siteId, imageId, image, notFoundError } from "../__fixtures__";
import { reducer } from "./reducer";
import {
  ERRORED_ACTION,
  ErroredAction,
  LOADING_ACTION,
  LoadingAction,
  LOADED_ACTION,
  LoadedAction,
  RefrenceAction,
  REFERENCE_ACTION,
  DerefrenceAction,
  DEREFERENCE_ACTION
} from "./actions";

const emptyState: SiteItemMap = {};

const loadingState: SiteItemMap = {
  [siteId]: {
    [imageId]: {
      refs: 0,
      status: ItemStatus.LOADING,
      data: image,
      error: undefined
    }
  }
};

const erroredAction: ErroredAction = {
  type: ERRORED_ACTION,
  payload: {
    siteId,
    itemId: imageId,
    error: notFoundError
  }
};

const loadingAction: LoadingAction = {
  type: LOADING_ACTION,
  payload: {
    siteId,
    itemId: imageId
  }
};

const loadedAction: LoadedAction = {
  type: LOADED_ACTION,
  payload: {
    siteId,
    itemId: imageId,
    data: image
  }
};

const referenceAction: RefrenceAction = {
  type: REFERENCE_ACTION,
  payload: {
    siteId,
    itemId: imageId
  }
};

const dereferenceAction: DerefrenceAction = {
  type: DEREFERENCE_ACTION,
  payload: {
    siteId,
    itemId: imageId
  }
};

describe("Provider", () => {
  describe("reducer()", () => {
    test("state does not change for an unsupported action", () => {
      expect(reducer(loadingState, { type: "foobar" } as any)).toBe(
        loadingState
      );
    });

    test("item state should change to errored", () => {
      expect(reducer(loadingState, erroredAction)).toHaveProperty(
        `${siteId}.${imageId}`,
        {
          refs: 0,
          status: ItemStatus.ERRORED,
          data: undefined,
          error: notFoundError
        }
      );
    });

    test("item state should change to loading", () => {
      expect(reducer(emptyState, loadingAction)).toHaveProperty(
        `${siteId}.${imageId}`,
        {
          refs: 0,
          status: ItemStatus.LOADING,
          data: undefined,
          error: undefined
        }
      );
    });

    test("item state should change to loaded", () => {
      expect(reducer(loadingState, loadedAction)).toHaveProperty(
        `${siteId}.${imageId}`,
        {
          refs: 0,
          status: ItemStatus.LOADED,
          data: image,
          error: undefined
        }
      );
    });

    test("increases the reference count", () => {
      expect(
        reducer(reducer(loadingState, referenceAction), referenceAction)
      ).toHaveProperty(
        `${siteId}.${imageId}`,
        expect.objectContaining({
          refs: 2
        })
      );
    });

    test("decreases the reference count and removes the object", () => {
      const initialState = {
        ...loadingState,
        [siteId]: {
          ...loadingState[siteId],
          [imageId]: {
            ...loadingState[siteId][imageId],
            refs: 2
          }
        }
      };
      const interimState = reducer(initialState, dereferenceAction);
      expect(interimState).toHaveProperty(
        `${siteId}.${imageId}`,
        expect.objectContaining({
          refs: 1
        })
      );
      const actualState = reducer(interimState, dereferenceAction);
      expect(actualState).not.toHaveProperty(`${siteId}.${imageId}`);
    });
  });
});
