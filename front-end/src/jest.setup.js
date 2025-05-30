// Mock Vite env variables
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_API_BASE_URL: 'http://localhost:3000', // or your mock API
  },
  writable: true,
});
