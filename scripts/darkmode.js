// load dark mode preference from local storage
let darkmode = localStorage.getItem('darkmode')
// Find the checkbox element darkmode-active
const themeToggle = document.getElementById('darkmode-active');

const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
  document.body.classList.toggle('dark-mode');
}

const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', null);
  document.body.classList.toggle('dark-mode');
}

if (darkmode === 'active') {
  enableDarkMode()
}
// Add a check to be extra safe
if (themeToggle) {
  themeToggle.addEventListener('change', function() {
    console.log("toggle dark mode")
    darkmode = localStorage.getItem('darkmode')
    darkmode !== 'active' ? enableDarkMode() : disableDarkMode()
    });
  }