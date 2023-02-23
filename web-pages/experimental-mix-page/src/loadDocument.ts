async function loadDocument(): Promise<void> {
  return new Promise((resolve) => {
    window.onload = () => {
      resolve();
    };
    if (window.document.readyState === 'complete') resolve();
    resolve();
  });
}
export { loadDocument };
