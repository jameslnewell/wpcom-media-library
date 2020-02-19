/**
 * External dependencies
 */
import React from "react";
import { debounce } from "lodash";

/**
 * Internal dependencies
 */
import { ItemStatus } from "../types";
import { useItem } from "../useItem";
import { Form } from "./Form";
import { Preview } from "./Preview";
import { Wrapper, PreviewWrapper, DetailWrapper } from "./index.styles";

export interface DetailProps {
  siteId: string;
  itemId: string;
  canUpload?: boolean;
}

export const Detail: React.FC<DetailProps> = ({ siteId, itemId }) => {
  const [status, item] = useItem(siteId, itemId);

  const handleChange = debounce(
    fields => {
      console.log("CHANGED", fields);
    },
    400,
    { leading: false, trailing: true }
  );

  if (status === ItemStatus.ERRORED) {
    return <>TODO:</>;
  }

  return (
    <Wrapper>
      <PreviewWrapper>
        <Preview status={status} item={item} />
      </PreviewWrapper>
      <DetailWrapper>
        {item && <Form item={item} onChange={handleChange} />}
      </DetailWrapper>
    </Wrapper>
  );
};
