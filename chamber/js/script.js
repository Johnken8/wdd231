// Variables
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');
const directoryContainer = document.getElementById('directory-container');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');

// Functions
// Toggle navigation menu for mobile
function toggleNav() {
    nav.classList.toggle('open');
}

// Change view between grid and list
function setGridView() {
    directoryContainer.className = 'grid-view';
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    // Save preference in localStorage
    localStorage.setItem('directoryView', 'grid');
}

function setListView() {
    directoryContainer.className = 'list-view';
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    // Save preference in localStorage
    localStorage.setItem('directoryView', 'list');
}

// Fetch members data from JSON file
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Could not fetch members data:', error);
        directoryContainer.innerHTML = '<p class="error">Error loading members data. Please try again later.</p>';
    }
}

// Display members based on current view
function displayMembers(members) {
    directoryContainer.innerHTML = '';

    if (!members || members.length === 0) {
        directoryContainer.innerHTML = '<p class="no-results">No members found.</p>';
        return;
    }

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        
        // Determine membership level text
        let levelText;
        let levelClass;
        
        switch(member.membershipLevel) {
            case 3:
                levelText = 'Gold Member';
                levelClass = 'level-3';
                break;
            case 2:
                levelText = 'Silver Member';
                levelClass = 'level-2';
                break;
            default:
                levelText = 'Member';
                levelClass = 'level-1';
        }
        
        memberCard.innerHTML = `
            <img src="images/members/${member.image}" alt="${member.name}" class="member-image">
            <div class="member-info">
                <h3 class="member-name">${member.name}</h3>
                <span class="member-level ${levelClass}">${levelText}</span>
                <p class="member-address">${member.address}</p>
                <p class="member-phone">${member.phone}</p>
                <a href="${member.website}" class="member-website" target="_blank">Visit Website</a>
            </div>
        `;
        
        directoryContainer.appendChild(memberCard);
    });
}

// Set the year in the footer's copyright
function setYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// Set the last modified date in the footer
function setLastModified() {
    const lastModifiedElement = document.getElementById('last-modified');
    if (lastModifiedElement) {
        const lastModified = document.lastModified;
        lastModifiedElement.textContent = lastModified;
    }
}

// Event Listeners
if (gridBtn) {
    gridBtn.addEventListener('click', setGridView);
}

if (listBtn) {
    listBtn.addEventListener('click', setListView);
}

if (navToggle) {
    navToggle.addEventListener('click', toggleNav);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set year and last modified date
    setYear();
    setLastModified();
    
    // Load members data
    fetchMembers();
    
    // Set view based on saved preference or default to grid
    const savedView = localStorage.getItem('directoryView');
    if (savedView === 'list') {
        setListView();
    } else {
        setGridView();
    }
});