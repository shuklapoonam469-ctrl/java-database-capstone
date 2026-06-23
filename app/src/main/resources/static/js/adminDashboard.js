/*
  This script handles the admin dashboard functionality for managing doctors:
  - Loads all doctor cards
  - Filters doctors by name, time, or specialty
  - Adds a new doctor via modal form


  Attach a click listener to the "Add Doctor" button
  When clicked, it opens a modal form using openModal('addDoctor')


  When the DOM is fully loaded:
    - Call loadDoctorCards() to fetch and display all doctors


  Function: loadDoctorCards
  Purpose: Fetch all doctors and display them as cards

    Call getDoctors() from the service layer
    Clear the current content area
    For each doctor returned:
    - Create a doctor card using createDoctorCard()
    - Append it to the content div

    Handle any fetch errors by logging them


  Attach 'input' and 'change' event listeners to the search bar and filter dropdowns
  On any input change, call filterDoctorsOnChange()


  Function: filterDoctorsOnChange
  Purpose: Filter doctors based on name, available time, and specialty

    Read values from the search bar and filters
    Normalize empty values to null
    Call filterDoctors(name, time, specialty) from the service

    If doctors are found:
    - Render them using createDoctorCard()
    If no doctors match the filter:
    - Show a message: "No doctors found with the given filters."

    Catch and display any errors with an alert


  Function: renderDoctorCards
  Purpose: A helper function to render a list of doctors passed to it

    Clear the content area
    Loop through the doctors and append each card to the content area


  Function: adminAddDoctor
  Purpose: Collect form data and add a new doctor to the system

    Collect input values from the modal form
    - Includes name, email, phone, password, specialty, and available times

    Retrieve the authentication token from localStorage
    - If no token is found, show an alert and stop execution

    Build a doctor object with the form values

    Call saveDoctor(doctor, token) from the service

    If save is successful:
    - Show a success message
    - Close the modal and reload the page

    If saving fails, show an error message
*/
// Import service layers and UI card generators
import { getDoctors, filterDoctors, saveDoctor } from './services/doctorService.js';
import { createDoctorCard } from './doctorCard.js';
import { openModal, closeModal } from './util.js';

// --- Event Listeners Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Page Load Fetching
    loadDoctorCards();

    // 2. Attach Listeners to Search and Filter Elements
    const searchBar = document.getElementById('searchBar');
    const timeFilter = document.getElementById('timeFilter');
    const specialtyFilter = document.getElementById('specialtyFilter');

    if (searchBar) searchBar.addEventListener('input', filterDoctorsOnChange);
    if (timeFilter) timeFilter.addEventListener('change', filterDoctorsOnChange);
    if (specialtyFilter) specialtyFilter.addEventListener('change', filterDoctorsOnChange);

    // 3. Attach click listener to "Add Doctor" button if it exists on the layout
    const addDoctorBtn = document.getElementById('addDoctorBtn');
    if (addDoctorBtn) {
        addDoctorBtn.addEventListener('click', () => openModal('addDoctor'));
    }
    
    // Attach form submit handler if the modal form exists
    const addDoctorForm = document.getElementById('addDoctorForm');
    if (addDoctorForm) {
        addDoctorForm.addEventListener('submit', adminAddDoctor);
    }
});

// --- Core Core Operations & Functions ---

/**
 * Function: loadDoctorCards
 * Purpose: Fetch all doctors from the server and display them as cards
 */
async function loadDoctorCards() {
    try {
        const doctors = await getDoctors();
        renderDoctorCards(doctors);
    } catch (error) {
        console.error("Error loading doctor cards:", error);
    }
}

/**
 * Function: filterDoctorsOnChange
 * Purpose: Track values from the filters on modification and render the subset matching data
 */
async function filterDoctorsOnChange() {
    try {
        // Read input values
        const searchBarValue = document.getElementById('searchBar')?.value.trim();
        const timeFilterValue = document.getElementById('timeFilter')?.value;
        const specialtyFilterValue = document.getElementById('specialtyFilter')?.value;

        // Normalize empty values to null
        const name = searchBarValue || null;
        const time = timeFilterValue || null;
        const specialty = specialtyFilterValue || null;

        // Call filtered fetch from service layer
        const filteredDoctors = await filterDoctors(name, time, specialty);
        const contentDiv = document.getElementById('content');

        if (filteredDoctors && filteredDoctors.length > 0) {
            renderDoctorCards(filteredDoctors);
        } else {
            contentDiv.innerHTML = `<div class="no-results">No doctors found with the given filters.</div>`;
        }
    } catch (error) {
        alert("Failed to filter doctors: " + error.message);
    }
}

/**
 * Function: renderDoctorCards
 * Purpose: Helper utility to clear content workspace and mount individual doctor cards
 * @param {Array} doctorsList 
 */
function renderDoctorCards(doctorsList) {
    const contentDiv = document.getElementById('content');
    if (!contentDiv) return;
    
    contentDiv.innerHTML = ''; // Clear current display workspace
    
    doctorsList.forEach(doctor => {
        const cardElement = createDoctorCard(doctor);
        contentDiv.appendChild(cardElement);
    });
}

/**
 * Function: adminAddDoctor
 * Purpose: Handle intercept submission events, compile body data, extract state configurations, and commit additions
 * @param {Event} event 
 */
async function adminAddDoctor(event) {
    event.preventDefault(); // Stop standard page navigation layout reloads

    // Collect Input Element references inside Modal
    const name = document.getElementById('modalDocName')?.value;
    const email = document.getElementById('modalDocEmail')?.value;
    const phone = document.getElementById('modalDocPhone')?.value;
    const password = document.getElementById('modalDocPassword')?.value;
    const specialty = document.getElementById('modalDocSpecialty')?.value;
    
    // Parse times checking strings from multi select or comma separated elements
    const rawTimes = document.getElementById('modalDocTimes')?.value;
    const availableTimes = rawTimes ? rawTimes.split(',').map(t => t.trim()) : [];

    // Verify Authorization state tracking from localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Action Denied. Admin authentication token missing. Please log in again.");
        return;
    }

    // Build Payload Object Structure matching your Spring Boot Doctor entity fields
    const doctorPayload = {
        name,
        email,
        phone,
        password,
        specialty,
        availableTimes
    };

    try {
        const response = await saveDoctor(doctorPayload, token);
        
        if (response) {
            alert("Doctor profile added successfully!");
            closeModal('addDoctor');
            window.location.reload(); // Reload context structure to map updates
        }
    } catch (error) {
        alert("Failed to save doctor: " + error.message);
    }
}
