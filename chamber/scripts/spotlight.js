// Company spotlights functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mock JSON data for chamber members - this would typically be loaded from an external JSON file
    const chamberMembers = [
        {
            id: 1,
            name: "Sunrise Tech Solutions",
            address: "24 Ademola Adetokunbo Crescent, Wuse II",
            phone: "+234 802 345 6789",
            website: "https://sunrisetech.com",
            image: "images/members/sunrise-tech.webp",
            membershipLevel: "gold"
        },
        {
            id: 2,
            name: "Eagle Bank PLC",
            address: "15 Aguiyi Ironsi Street, Maitama",
            phone: "+234 703 456 7890",
            website: "https://eaglebank.com",
            image: "images/members/eagle-bank.webp",
            membershipLevel: "gold"
        },
        {
            id: 3,
            name: "GlobalHealth Medical Center",
            address: "87 Aminu Kano Crescent, Wuse II",
            phone: "+234 809 567 8901",
            website: "https://globalhealth.org",
            image: "images/members/global-health.webp",
            membershipLevel: "silver"
        },
        {
            id: 4,
            name: "Royal Suites Hotel",
            address: "56 Gana Street, Maitama",
            phone: "+234 812 678 9012",
            website: "https://royalsuites.com",
            image: "images/members/royal-suites.webp",
            membershipLevel: "gold"
        },
        {
            id: 5,
            name: "Unity Insurance Ltd",
            address: "42 Adetokunbo Ademola Crescent, Wuse II",
            phone: "+234 708 789 0123",
            website: "https://unityinsurance.com",
            image: "images/members/unity-insurance.webp",
            membershipLevel: "silver"
        },
        {
            id: 6,
            name: "Green Earth Farms",
            address: "13 Sani Abacha Way, Garki",
            phone: "+234 803 890 1234",
            website: "https://greenearthfarms.com",
            image: "images/members/green-earth.webp",
            membershipLevel: "bronze"
        },
        {
            id: 7,
            name: "Digital Marketing Pro",
            address: "71 Bala Mohammed Road, CBD",
            phone: "+234 705 901 2345",
            website: "https://digitalmarketingpro.com",
            image: "images/members/digital-marketing.webp",
            membershipLevel: "silver"
        }
    ];

    // Function to randomly select members with gold or silver membership
    function getRandomSpotlights(count = 3) {
        // Filter gold and silver members
        const eligibleMembers = chamberMembers.filter(member => 
            member.membershipLevel === "gold" || member.membershipLevel === "silver"
        );
        
        // Shuffle array
        const shuffled = [...eligibleMembers].sort(() => 0.5 - Math.random());
        
        // Get first count items or all if fewer are available
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }

    // Function to display spotlights
    function displaySpotlights() {
        const spotlightContainer = document.getElementById('spotlight-container');
        const spotlights = getRandomSpotlights();
        
        // Clear container
        spotlightContainer.innerHTML = '';
        
        // Add spotlights to container
        spotlights.forEach(member => {
            const spotlight = document.createElement('div');
            spotlight.className = 'spotlight';
            
            // Using a placeholder image if the actual image is not available
            const imageUrl = member.image || 'images/placeholder-logo.webp';
            
            spotlight.innerHTML = `
                <img src="${imageUrl}" alt="${member.name} logo" class="spotlight-logo">
                <h4 class="spotlight-name">${member.name}</h4>
                <div class="spotlight-contact">
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                </div>
                <a href="${member.website}" target="_blank" class="spotlight-website">Visit Website</a>
                <div class="spotlight-membership">${member.membershipLevel.toUpperCase()} Member</div>
            `;
            
            spotlightContainer.appendChild(spotlight);
        });
    }

    // Display spotlights when page loads
    displaySpotlights();
});