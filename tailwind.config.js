import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  daisyui: {
    themes: [
      {
        nord: {
          ...require("daisyui/src/theming/themes")["nord"],
          "--animation-btn": "0s", // duration of animation when you click on button
          "--animation-input": "0s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "1",
        },
      },
    ],
  },
  plugins: [daisyui],
};
