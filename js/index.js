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
  ]).then(() => {
    initializeDropdowns();
  });
});

function initializeDropdowns() {
  const dropdownToggles = document.querySelectorAll('.nav_dropdown-toggle');
  const dropdownContainer = document.querySelector(
    '.active_dropdown_container'
  );

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      const dropdownType = event.currentTarget.getAttribute('data-dropdown');
      const isActive = event.currentTarget.classList.contains('active');

      dropdownToggles.forEach((t) => t.classList.remove('active'));
      dropdownContainer.style.display = 'none';

      // If the clicked toggle was not active, activate it and show the container
      if (!isActive) {
        event.currentTarget.classList.add('active');
        dropdownContainer.style.display = 'block';

        updateDropdownContent(dropdownType);
      }
    });
  });

  // Close the dropdown when clicking outside
  document.addEventListener('click', (event) => {
    if (
      !event.target.closest('.nav_dropdown') &&
      !event.target.closest('.active_dropdown_container')
    ) {
      dropdownToggles.forEach((t) => t.classList.remove('active'));
      dropdownContainer.style.display = 'none';
    }
  });
}

// Function to update the dropdown content based on the type
function updateDropdownContent(type) {
  const dropdownLinks = document.querySelector('.dropdown_list');
  dropdownLinks.innerHTML = '';

  let content = '';
  switch (type) {
    case 'products':
      content = `
        <a href="#" class="nav_dropdown-link">პროდუქტების მიმოხილვა</a>
        <a href="#" class="nav_dropdown-link">ნაკრები</a>
        <a href="#" class="nav_dropdown-link">პირადი ბანკირი</a>`;
      break;
    case 'offers':
      content = `
        <a href="#" class="nav_dropdown-link">მიმოხილვა</a>
        <a href="#" class="nav_dropdown-link">შეთავაზებები</a>
        <a href="#" class="nav_dropdown-link">ღონისძიებები</a>`;
      break;
    case 'concept':
      content = `
        <a href="#" class="nav_dropdown-link">მიმოხილვა</a>
        <a href="#" class="nav_dropdown-link">კაფე</a>
        <a href="#" class="nav_dropdown-link">ბიბლიოთეკა</a>
        <a href="#" class="nav_dropdown-link">კონცეპტ ფილიალები</a>`;
      break;
    default:
      content = '';
  }

  dropdownLinks.innerHTML = content;
}

function initFooterDropdowns() {
  const dropdownToggles = document.querySelectorAll('.menu_dropdown-toggle');

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const dropdownList = this.nextElementSibling;
      dropdownList.classList.toggle('show');
      this.classList.toggle('active');
    });
  });
}
