import { css } from "@emotion/core";

import MacabreRegularWoff from '../fonts/Macabre/Macabrev0.2-Regular.woff';
import MacabreRegularWoffTwo from '../fonts/Macabre/Macabrev0.2-Regular.woff2';

import BruphyTextLightWoff from '../fonts/BruphyText/BruphyText-Light.woff';
import BruphyTextLightWoffTwo from '../fonts/BruphyText/BruphyText-Light.woff2';
import BruphyTextRegularWoff from '../fonts/BruphyText/BruphyText-Regular.woff';
import BruphyTextRegularWoffTwo from '../fonts/BruphyText/BruphyText-Regular.woff2';
import BruphyTextSemiBoldWoff from '../fonts/BruphyText/BruphyText-SemiBold.woff';
import BruphyTextSemiBoldWoffTwo from '../fonts/BruphyText/BruphyText-SemiBold.woff2';
import BruphyTextBoldWoff from '../fonts/BruphyText/BruphyText-Bold.woff';
import BruphyTextBoldWoffTwo from '../fonts/BruphyText/BruphyText-Bold.woff2';
import BruphyTextBlackWoff from '../fonts/BruphyText/BruphyText-Black.woff';
import BruphyTextBlackWoffTwo from '../fonts/BruphyText/BruphyText-Black.woff2';

export const globalStyles = css`
  /**
   * Thanks to Benjamin De Cock
   * https://gist.github.com/bendc/ac03faac0bf2aee25b49e5fd260a727d
   */
  :root {
    --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
    --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
    --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
    --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
    --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);

    --font-title: "Macabre";
    --font-body-light: "BruphyLight";
    --font-body-regular: "BruphyRegular";
    --font-body-semibold: "BruphySemiBold";
    --font-body-bold: "BruphyBold";
    --font-body-black: "BruphyBlack";
    --monospace-font: "menlo"; /* TODO: pick a monospace font */
    --system-font: "system-ui";

    --font-light: 200;
    --font-regular: 400;
    --font-semibold: 600;
    --font-bold: 700;
    --font-black: 800;

    --accent-color: "#6166DC";
    --accent-color-dark: "#E9DAAC";
    --success-color: "#46B17B";
    --success-color-dark: "#46B17B";
  }

  /* TODO: remove unused fonts to speed things up */
  @font-face {
    font-family: var(--system-font);
    font-weight: var(--system-font-normal);
    font-style: normal;
  }

  @font-face {
    font-family: 'Macabre';
    src: url('${MacabreRegularWoffTwo}') format('woff2'),
         url('${MacabreRegularWoff}') format('woff');
    font-weight: var(--font-regular);
    font-style: normal;
  }

  @font-face {
    font-family: 'BruphyLight';
    src: url('${BruphyTextLightWoffTwo}') format('woff2'),
         url('${BruphyTextLightWoff}') format('woff');
    font-weight: var(--font-light);
    font-style: normal;
  }

  @font-face {
    font-family: 'BruphyRegular';
    src: url('${BruphyTextRegularWoffTwo}') format('woff2'),
         url('${BruphyTextRegularWoff}') format('woff');
    font-weight: var(--font-regular);
    font-style: normal;
  }

  @font-face {
    font-family: 'BruphySemiBold';
    src: url('${BruphyTextSemiBoldWoffTwo}') format('woff2'),
         url('${BruphyTextSemiBoldWoff}') format('woff');
    font-weight: var(--font-semibold);
    font-style: normal;
  }

  @font-face {
    font-family: 'BruphyBold';
    src: url('${BruphyTextBoldWoffTwo}') format('woff2'),
         url('${BruphyTextBoldWoff}') format('woff');
    font-weight: var(--font-bold);
    font-style: normal;
  }

  @font-face {
    font-family: 'BruphyBlack';
    src: url('${BruphyTextBlackWoffTwo}') format('woff2'),
         url('${BruphyTextBlackWoff}') format('woff');
    font-weight: var(--font-black);
    font-style: normal;
  }


  *,
  *:before,
  *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-display: block;
  }

  :root {
    -ms-overflow-style: -ms-autohiding-scrollbar;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    cursor: default;
    font-size: 0.625rem;
    line-height: 1.4;
  }

  body {
    font-family: var(--font-body);
    font-size: 1.6rem;
    line-height: 2rem;
    margin: 0;
    font-weight: var(--font-regular);
    height: 100%;
  }

  article {
    word-break: break-word;
  }

  button,
  a {
    text-decoration: none;
    cursor: pointer;
  }

  a:focus {
    outline: none;
  }

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
    align-self: center;
  }

  input,
  textarea,
  select,
  button {
    font-family: var(--font-body);
  }

  .underline {
    text-decoration: underline;
  }

  button,
  input,
  select,
  textarea {
    color: inherit;
    font-family: inherit;
    font-style: inherit;
    font-weight: inherit;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: var(--monospace-font);
    font-weight: var(--font-regular);
  }

  fieldset,
  button {
    appearance: none;
    border: none;
    outline: none;
    background: transparent;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
  }

  audio:not([controls]) {
    display: none;
  }

  details {
    display: block;
  }

  input {
    &:focus,
    &:active {
      outline: none;
    }

    &[type="number"] {
      width: auto;
    }
  }

  img.Image__Zoom ~ div {
    background: transparent !important;
  }
`;
