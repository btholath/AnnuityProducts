// src/setupTests.js
import "@testing-library/jest-dom";

// src/setupTests.js
beforeAll(() => {
  const warn = console.warn;
  console.warn = (...args) => {
    if (args[0]?.includes("React Router Future Flag Warning")) return;
    warn(...args);
  };
});
