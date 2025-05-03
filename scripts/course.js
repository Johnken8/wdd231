// Course information and dynamic display
document.addEventListener('DOMContentLoaded', () => {
    // Course data array
    const courses = [
        {
            code: "CSE 110",
            name: "Introduction to Programming",
            description: "Learn basic programming concepts and structures",
            credits: 3,
            completed: true,
            subject: "CSE"
        },
        {
            code: "CSE 111",
            name: "Programming with Functions",
            description: "Learn programming functions, parameters, and return values",
            credits: 3,
            completed: true,
            subject: "CSE"
        },
        {
            code: "CSE 121b",
            name: "JavaScript Language",
            description: "Learn JavaScript programming with simple applications",
            credits: 3,
            completed: false,
            subject: "CSE"
        },
        {
            code: "CSE 210",
            name: "Programming with Classes",
            description: "Learn object-oriented programming principles",
            credits: 3,
            completed: true,
            subject: "CSE"
        },
        {
            code: "WDD 130",
            name: "Web Fundamentals",
            description: "Learn web design and development fundamentals",
            credits: 3,
            completed: true,
            subject: "WDD"
        },
        {
            code: "WDD 131",
            name: "Web Design I",
            description: "Learn CSS and page layout techniques",
            credits: 3,
            completed: true,
            subject: "WDD"
        },
        {
            code: "WDD 230",
            name: "Web Frontend Development I",
            description: "Learn frontend development techniques and frameworks",
            credits: 3,
            completed: false,
            subject: "WDD"
        },
        {
            code: "WDD 231",
            name: "Web Frontend Development II",
            description: "Advanced frontend development with modern frameworks",
            credits: 3,
            completed: true,
            subject: "WDD"
        }
    ];

    // Get DOM elements
    const coursesContainer = document.getElementById('courses-container');
    const totalCreditsSpan = document.getElementById('total-credits');
    const allBtn = document.getElementById('all-btn');
    const wddBtn = document.getElementById('wdd-btn');
    const cseBtn = document.getElementById('cse-btn');

    // Track current filter
    let currentFilter = 'all';

    // Display courses function
    const displayCourses = (filterType) => {
        // Filter courses based on selection
        let filteredCourses;
        
        if (filterType === 'all') {
            filteredCourses = courses;
        } else {
            filteredCourses = courses.filter(course => course.subject === filterType);
        }

        // Clear current courses
        coursesContainer.innerHTML = '';

        // Add filtered courses to the container
        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = course.completed ? 'course-card completed' : 'course-card';
            
            courseCard.innerHTML = `
                <span class="course-code">${course.code}</span>
                <h3>${course.name}</h3>
                <p>${course.description}</p>
                <span class="credits">${course.credits} Credits</span>
                ${course.completed ? '<span class="completed-badge">Completed</span>' : ''}
            `;
            
            coursesContainer.appendChild(courseCard);
        });

        // Calculate and display total credits using reduce
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsSpan.textContent = totalCredits;

        // Update active button
        updateActiveButton(filterType);
    };

    // Update active button
    const updateActiveButton = (filter) => {
        // Remove active class from all buttons
        allBtn.classList.remove('active');
        wddBtn.classList.remove('active');
        cseBtn.classList.remove('active');
        
        // Add active class to selected button
        if (filter === 'all') {
            allBtn.classList.add('active');
        } else if (filter === 'WDD') {
            wddBtn.classList.add('active');
        } else if (filter === 'CSE') {
            cseBtn.classList.add('active');
        }
    };

    // Event listeners for filter buttons
    allBtn.addEventListener('click', () => {
        currentFilter = 'all';
        displayCourses(currentFilter);
    });
    
    wddBtn.addEventListener('click', () => {
        currentFilter = 'WDD';
        displayCourses(currentFilter);
    });
    
    cseBtn.addEventListener('click', () => {
        currentFilter = 'CSE';
        displayCourses(currentFilter);
    });

    // Initial display - show all courses
    displayCourses('all');
});