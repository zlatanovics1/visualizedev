// tailwind.plugins.js

const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addUtilities }: { addUtilities: any }) {
  const newUtilities = {
    ".popover-content-width-same-as-its-trigger": {
      width: "var(--radix-popover-trigger-width)",
      maxHeight: "var(--radix-popover-content-available-height)",
    },
  };

  addUtilities(newUtilities, ["responsive", "hover"]);
});
