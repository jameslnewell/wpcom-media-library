/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * Internal dependencies
 */
// import { neutral10 } from '../../ui/colors';
import { Spacing } from "../../ui/spacing";

export const Wrapper = styled.form`
  flex-grow: 1;
  padding-left: ${Spacing[4]};
  padding-right: ${Spacing[4]};

  /* TODO: fix in @wordpress/components */
  & input,
  & textarea {
    box-sizing: border-box;
  }
`;

export const FieldValue = styled.span`
  display: block;
`;
