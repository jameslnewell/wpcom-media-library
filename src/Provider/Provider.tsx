/**
 * External dependencies
 */
import React from "react";

/**
 * Internal dependencies
 */
import { Client } from "../client";
import { Context } from "../Context";
import { createActions } from "./actions";
import { reducer } from "./reducer";

// TODO: consider using a FIFO cache to avoid hitting the network for items we've fetched recently

const initialState = {};

export interface ProviderProps {
  client: Client;
}

export const Provider: React.FC<ProviderProps> = ({ client, children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const actions = React.useMemo(() => createActions(client, dispatch), [
    client,
    dispatch
  ]);
  return (
    <Context.Provider value={{ items: state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
