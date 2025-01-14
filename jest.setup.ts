import "@testing-library/jest-dom";

// Mock matchMedia if it's not available in jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Add TextEncoder and TextDecoder for Node.js environment
Object.assign(global, {
  TextEncoder:
    global.TextEncoder ||
    function TextEncoder() {
      return {
        encode: function encode(str: string) {
          const arr = new Uint8Array(str.length);
          for (let i = 0; i < str.length; i++) {
            arr[i] = str.charCodeAt(i);
          }
          return arr;
        },
      };
    },
  TextDecoder:
    global.TextDecoder ||
    function TextDecoder() {
      return {
        decode: function decode(arr: Uint8Array) {
          return String.fromCharCode.apply(null, Array.from(arr));
        },
      };
    },
});
