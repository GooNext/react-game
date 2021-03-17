import styled, { css } from "styled-components";

const thumbCSS = css`
  background-color: #fff;
  border: none;
  border-radius: 0;
  width: 20px;
  height: 20px;
  box-shadow: 2px 0 6px #0000001c;
`;

const Slider = styled.input.attrs({
  type: "range",
})`
  background-color: #87ebd9;
  outline: none;
  width: 100%;
  height: 20px;
  -webkit-appearance: none;
  &::-webkit-slider-thumb {
    ${thumbCSS};
    -webkit-appearance: none;
  }
  &::-moz-range-thumb {
    ${thumbCSS};
  }
  &::-ms-thumb {
    ${thumbCSS};
  }
`;

export default Slider;
