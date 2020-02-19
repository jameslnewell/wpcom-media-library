/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * Internal dependencies
 */

export const Image = styled.img`
  width: auto;
  height: auto;
  transition: opacity 200ms ease-in-out;

  position: absolute;
  top: 50%;
  left: 50%;
  max-height: 100%;
  max-width: 100%;
  transform: translate(-50%, -50%);
`;
