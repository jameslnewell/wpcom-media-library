/**
 * External dependencies
 */
import "@wordpress/components/build-style/style.css";
import React from "react";
import { format } from "date-fns";
import {
  BaseControl,
  TextControl,
  TextareaControl
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { Wrapper, FieldValue } from "./index.styles";
import { ItemData } from "../../types";

export interface FormProps {
  item: ItemData;
  onChange: (fields: {}) => void;
}

export const Form: React.FC<FormProps> = ({ item, onChange }) => {
  const [fields, setFields] = React.useState({
    title: item.title,
    caption: item.caption,
    alt: item.alt,
    description: item.description
  });

  const handleFieldChange = (fieldName: string) => (fieldValue: string) => {
    setFields(s => ({
      ...s,
      [fieldName]: fieldValue
    }));
    onChange(fields);
  };

  return (
    <Wrapper>
      <TextControl
        label={__("Title")}
        value={fields.title}
        onChange={handleFieldChange("title")}
      />

      <TextareaControl
        label={__("Caption")}
        value={fields.caption || ""}
        onChange={handleFieldChange("caption")}
      />

      <TextControl
        label="Alt text"
        value={fields.alt || ""}
        onChange={handleFieldChange("alt")}
      />

      <TextareaControl
        label={__("Description")}
        value={fields.description || ""}
        onChange={handleFieldChange("description")}
      />

      <TextControl
        label={__("URL")}
        value={item.url || ""}
        onChange={() => {
          /* do nothing */
        }}
      />

      <BaseControl id="" label={__("File name")}>
        <FieldValue title={item.name}>{item.name}</FieldValue>
      </BaseControl>

      <BaseControl id="" label={__("File type")}>
        <FieldValue>
          {item.extension && item.extension.toUpperCase()}
        </FieldValue>
      </BaseControl>

      {item.width && item.height && (
        <BaseControl id="" label={__("Dimensions")}>
          <FieldValue>
            <abbr title={__("Width in pixels")}>{item.width}</abbr>
            {" ✕ "}
            <abbr title={__("Height in pixels")}>{item.height}</abbr>
          </FieldValue>
        </BaseControl>
      )}

      {/* TODO: Not sure how to get .length cause video press doesn't add it */}
      {/* {item.duration  && (
				<BaseControl id="" label={__('Duration')}>
					<FieldValue>
					{ item.duration }
					</FieldValue>
				</BaseControl>
			)} */}

      <BaseControl id="" label={__("Upload date")}>
        <FieldValue>
          {item.createdAt && format(new Date(item.createdAt), "d MMMM yyyy")}
        </FieldValue>
      </BaseControl>
    </Wrapper>
  );
};
