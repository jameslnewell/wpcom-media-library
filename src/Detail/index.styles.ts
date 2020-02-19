/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * Internal dependencies
 */
import { neutral0 } from "../ui/colors";
// import {Spacing} from '../ui/spacing';

export const Wrapper = styled.div`
  display: flex;
`;

export const PreviewWrapper = styled.div`
  flex-grow: 2;
  background-color: ${neutral0};
  position: relative;
`;

export const DetailWrapper = styled.div`
  flex-grow: 1;
`;
