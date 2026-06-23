/*
  Import getAllAppointments to fetch appointments from the backend
  Import createPatientRow to generate a table row for each patient appointment


  Get the table body where patient rows will be added
  Initialize selectedDate with today's date in 'YYYY-MM-DD' format
  Get the saved token from localStorage (used for authenticated API calls)
  Initialize patientName to null (used for filtering by name)


  Add an 'input' event listener to the search bar
  On each keystroke:
    - Trim and check the input value
    - If not empty, use it as the patientName for filtering
    - Else, reset patientName to "null" (as expected by backend)
    - Reload the appointments list with the updated filter


  Add a click listener to the "Today" button
  When clicked:
    - Set selectedDate to today's date
    - Update the date picker UI to match
    - Reload the appointments for today


  Add a change event listener to the date picker
  When the date changes:
    - Update selectedDate with the new value
    - Reload the appointments for that specific date


  Function: loadAppointments
  Purpose: Fetch and display appointments based on selected date and optional patient name

  Step 1: Call getAllAppointments with selectedDate, patientName, and token
  Step 2: Clear the table body content before rendering new rows

  Step 3: If no appointments are returned:
    - Display a message row: "No Appointments found for today."

  Step 4: If appointments exist:
    - Loop through each appointment and construct a 'patient' object with id, name, phone, and email
    - Call createPatientRow to generate a table row for the appointment
    - Append each row to the table body

  Step 5: Catch and handle any errors during fetch:
    - Show a message row: "Error loading appointments. Try again later."


  When the page is fully loaded (DOMContentLoaded):
    - Call renderContent() (assumes it sets up the UI layout)
    - Call loadAppointments() to display today's appointments by default
*/
// Import service layer endpoint and table row UI constructor
import { getAllAppointments } from './services/appointmentService.js';
import { createPatientRow } from './patientRow.js';

// --- State Variables Initialization ---
const tableBody = document.getElementById('patientTableBody');
const token = localStorage.getItem('authToken');

// Format today's date as 'YYYY-MM-DD'
let today = new Date();
let selectedDate = today.toISOString().split('T')[0];
let patientName = null; 

// --- Event Listeners & Bootstrapping ---

document.addEventListener('DOMContentLoaded', () => {
    // Optional: Call renderContent() layout constructor if defined globally
    if (typeof renderContent === "function") {
        renderContent();
    }

    // Set initial date picker value to match state
    const datePicker = document.getElementById('datePicker');
    if (datePicker) {
        datePicker.value = selectedDate;
    }

    // 1. Initial Load of Default Day Appointments
    loadAppointments();

    // 2. Search Bar Filter Event Listener
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const searchValue = e.target.value.trim();
            patientName = searchValue !== "" ? searchValue : null;
            loadAppointments(); // Dynamic query reload on keystroke
        });
    }

    // 3. "Today" Button Quick Reset Click Listener
    const todayBtn = document.getElementById('todayBtn');
    if (todayBtn) {
        todayBtn.addEventListener('click', () => {
            selectedDate = new Date().toISOString().split('T')[0];
            if (datePicker) {
                datePicker.value = selectedDate;
            }
            loadAppointments();
        });
    }

    // 4. Date Picker Selection Change Event Listener
    if (datePicker) {
        datePicker.addEventListener('change', (e) => {
            selectedDate = e.target.value;
            loadAppointments();
        });
    }
});

// --- Core Core Operations & Functions ---

/**
 * Function: loadAppointments
 * Purpose: Fetch and render a tabular layout of patient appointments matching criteria
 */
async function loadAppointments() {
    // Fail-fast if administrative security token context is missing
    if (!token) {
        console.error("Authorization context token is missing.");
        displayStatusMessage("Authentication missing. Please log in.");
        return;
    }

    try {
        // Step 1: Request remote filtered state array from service layer
        const appointments = await getAllAppointments(selectedDate, patientName, token);
        
        // Step 2: Clear layout rows for clean redraw sequence
        if (tableBody) {
            tableBody.innerHTML = '';
        } else {
            return; // Exit if DOM layout anchor is missing
        }

        // Step 3: Handle empty data set result boundaries
        if (!appointments || appointments.length === 0) {
            displayStatusMessage("No Appointments found for today.");
            return;
        }

        // Step 4: Iterative mapping construct of model states into visual elements
        appointments.forEach(appointment => {
            // Flatten nested JPA structures gracefully
            const patientData = {
                id: appointment.patient?.id || "N/A",
                name: appointment.patient?.name || "Unknown Patient",
                phone: appointment.patient?.phone || "N/A",
                email: appointment.patient?.email || "N/A",
                appointmentTime: appointment.appointmentTime,
                status: appointment.status
            };

            // Call structural generator module and append row to active document fragment
            const rowElement = createPatientRow(patientData);
            tableBody.appendChild(rowElement);
        });

    } catch (error) {
        // Step 5: Catch runtime connection faults gracefully
        console.error("Critical error during layout update sequence:", error);
        displayStatusMessage("Error loading appointments. Try again later.");
    }
}

/**
 * Helper Function: displayStatusMessage
 * Purpose: Render a clean single-row spanning text feedback message to the client
 * @param {String} message 
 */
function displayStatusMessage(message) {
    if (tableBody) {
        tableBody.innerHTML = `
            <tr class="status-row">
                <td colspan="5" style="text-align: center; padding: 20px; color: #666;">
                    ${message}
                </td>
            </tr>
        `;
    }
}
