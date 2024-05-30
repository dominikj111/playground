
// Check local storage
let localS = localStorage.getItem('theme'),
    themeToSet = localS

// If local storage is not set, we check the OS preference
if (!localS) {
    themeToSet = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Set the correct theme
document.documentElement.setAttribute('data-theme', themeToSet)
