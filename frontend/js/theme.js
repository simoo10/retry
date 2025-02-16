
export function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    // if(newTheme ==='light'){
    //     console.log('===================================light');
    //     document.getElementById('logo2').src = '../images/logo3.png';
    // }
    // else{
    //     console.log('===================================dark');
    //     document.getElementById('logo2').src = '../images/logo1.png';
    // }
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}
// window.toggleTheme = toggleTheme;

// export function applySavedTheme() {
//     const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light theme
//     document.documentElement.setAttribute('data-theme', savedTheme);
// }

// // Ensure the theme is applied on page load
// applySavedTheme();