async function loadDocument(): Promise<void> {
  return new Promise((resolve) => {
    window.onload = () => {
      resolve();
    };
  });
}
export { loadDocument };
