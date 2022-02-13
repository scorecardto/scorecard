const updateColorScheme = () => {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const usingDarkTheme = () => {
  return document.documentElement.classList.contains('dark');
};

const listen = () => {
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      console.log('gi');

      updateColorScheme();
    });
};

export { listen, updateColorScheme, usingDarkTheme };
