export const graphOptions = {
  autoResize: true,
  interaction: {
    hover: false,
  },
  edges: {
    arrows: {
      middle: {
        scaleFactor: 0.6,
        enabled: true,
        type: "arrow",
      },
    },
    color: {
      color: "#3730a3",
      highlight: "#10b981",
      hover: "#4ade80",
    },
  },
  nodes: {
    borderWidth: 1.5,

    physics: false,
    color: {
      border: "#a5b4fc",
      background: "#3730a3",
      highlight: {
        background: "#1e1b4b",
        border: "#10b981",
      },
    },
    font: {
      face: "sans-serif",
      color: "#eef2ff",
      bold: {
        color: "#eef2ff",
      },
    },

    shape: "circle",
  },
  width: "100%",
  height: "100%",
};
