async function loadGameFonts() {
  const fonts = [
    {
      family: 'DisplayBoldFont',
      src: "url('../assets/fonts/NotoSansDisplay-Black.ttf')",
    },
    {
      family: 'DisplayFont',
      src: "url('../assets/fonts/NotoSansDisplay-SemiBold.ttf')",
    },
    {
      family: 'SansBoldFont',
      src: "url('../assets/fonts/NotoSans-Black.ttf')",
    },
    {
      family: 'SansFont',
      src: "url('../assets/fonts/NotoSans-SemiBold.ttf')",
    },
    {
      family: 'SerifBoldFont',
      src: "url('../assets/fonts/NotoSerif-Black.ttf')",
    },
    {
      family: 'SerifFont',
      src: "url('../assets/fonts/NotoSerif-SemiBold.ttf')",
    },
    {
      family: 'MonoFont',
      src: "url('../assets/fonts/NotoMono-Regular.ttf')",
    },
  ];

  return Promise.all(
    fonts.map((fontData) => {
      const font = new FontFace(fontData.family, fontData.src);
      return font.load();
    })
  );
}
export { loadGameFonts };
