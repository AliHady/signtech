/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './apps/signtech/src/**/*.{html,ts,scss}',
      './libs/**/*.{html,ts,scss}',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
    important: true, // This ensures Tailwind styles take precedence
    corePlugins: {
      preflight: false, // This is important for Angular
    },
  };
  