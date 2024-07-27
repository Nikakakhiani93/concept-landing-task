// Function to load a component and execute a callback
function loadComponent(url, placeholderId, callback) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById(placeholderId).innerHTML = data;
      if (callback) {
        callback();
      }
    })
    .catch((error) => console.error('Error loading component:', error));
}

// Document ready function
document.addEventListener('DOMContentLoaded', function () {
  Promise.all([
    new Promise((resolve) => {
      loadComponent('components/main/main.html', 'main', function () {
        resolve();
      });
    }),
    new Promise((resolve) => {
      loadComponent('components/nav/nav.html', 'nav', function () {
        resolve();
      });
    }),
    new Promise((resolve) => {
      loadComponent('components/footer/footer.html', 'footer', function () {
        initFooterDropdowns();
        resolve();
      });
    }),
  ]).then(() => {});
});
