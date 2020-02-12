/**
 * Internal dependencies
 */
import { SiteItemMap, Item, ItemStatus } from "../types";
import {
  Action,
  ERRORED_ACTION,
  LOADING_ACTION,
  LOADED_ACTION,
  REFERENCE_ACTION,
  DEREFERENCE_ACTION
} from "./actions";

const initialItemState = {
  refs: 0,
  status: ItemStatus.LOADING,
  error: undefined,
  data: undefined
};

const setItemState = (
  state: SiteItemMap,
  siteId: string,
  itemId: string,
  nextItemState:
    | Partial<Item>
    | ((s: Item) => Partial<Item> | undefined)
    | undefined
): SiteItemMap => {
  const currentItemState = state[siteId]?.[itemId] ?? initialItemState;
  const nextItemStateValue =
    typeof nextItemState === "function"
      ? nextItemState(currentItemState)
      : nextItemState;

  if (nextItemStateValue === undefined) {
    return {
      ...state,
      // TODO: consider a more efficient method
      [siteId]: Object.keys(state[siteId])
        .filter(iId => iId !== itemId)
        .reduce(
          (otherItems, iId) => ({
            ...otherItems,
            [iId]: state[siteId][iId]
          }),
          {}
        )
    };
  }

  return {
    ...state,
    [siteId]: {
      ...state[siteId],
      [itemId]: {
        ...initialItemState,
        ...currentItemState,
        ...nextItemStateValue
      }
    }
  };
};

export const reducer = (state: SiteItemMap, action: Action): SiteItemMap => {
  switch (action.type) {
    case ERRORED_ACTION: {
      const { siteId, itemId, error } = action.payload;
      return setItemState(state, siteId, itemId, {
        status: ItemStatus.ERRORED,
        error: error,
        data: undefined
      });
    }

    case LOADING_ACTION: {
      const { siteId, itemId } = action.payload;
      return setItemState(state, siteId, itemId, {
        status: ItemStatus.LOADING,
        error: undefined,
        data: undefined
      });
    }

    case LOADED_ACTION: {
      const { siteId, itemId, data } = action.payload;
      return setItemState(state, siteId, itemId, {
        status: ItemStatus.LOADED,
        error: undefined,
        data: data
      });
    }

    case REFERENCE_ACTION: {
      const { siteId, itemId } = action.payload;
      return setItemState(state, siteId, itemId, s => ({
        refs: s.refs + 1
      }));
    }

    case DEREFERENCE_ACTION: {
      const { siteId, itemId } = action.payload;
      return setItemState(state, siteId, itemId, s => {
        if (s.refs === 1) {
          return undefined;
        }
        return {
          refs: s.refs - 1
        };
      });
    }

    default:
      return state;
  }
};
