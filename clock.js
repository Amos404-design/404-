// Time zone data - stores UTC offsets
const timeZones = {
    'ny-time': { name: 'America/New_York' },
    'london-time': { name: 'Europe/London' },
    'paris-time': { name: 'Europe/Paris' },
    'tokyo-time': { name: 'Asia/Tokyo' },
    'sydney-time': { name: 'Australia/Sydney' },
    'dubai-time': { name: 'Asia/Dubai' },
    'singapore-time': { name: 'Asia/Singapore' },
    'hongkong-time': { name: 'Asia/Hong_Kong' },
    'la-time': { name: 'America/Los_Angeles' },
    'toronto-time': { name: 'America/Toronto' },
    'mexico-time': { name: 'America/Mexico_City' },
    'brazil-time': { name: 'America/Sao_Paulo' }
};

function getTimeInTimeZone(timeZoneName) {
    try {
        // Create a date formatter for the specific timezone
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timeZoneName,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const parts = formatter.formatToParts(new Date());
        const timeObj = {};

        parts.forEach(part => {
            timeObj[part.type] = part.value;
        });

        return `${timeObj.hour}:${timeObj.minute}:${timeObj.second}`;
    } catch (error) {
        console.error(`Error getting time for ${timeZoneName}:`, error);
        return '--:--:--';
    }
}

function updateClocks() {
    // Update all timezone clocks
    Object.keys(timeZones).forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            const timeZoneName = timeZones[elementId].name;
            element.textContent = getTimeInTimeZone(timeZoneName);
        }
    });

    // Update local time and date
    const now = new Date();
    
    // Format local time
    const localTimeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const localTimeElement = document.getElementById('local-time');
    if (localTimeElement) {
        localTimeElement.textContent = localTimeFormatter.format(now);
    }

    // Format local date
    const localDateFormatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const localDateElement = document.getElementById('local-date');
    if (localDateElement) {
        localDateElement.textContent = localDateFormatter.format(now);
    }
}

// Initial update
updateClocks();

// Update every 1000 milliseconds (1 second)
setInterval(updateClocks, 1000);

// Optional: Log when page loads to confirm script is running
console.log('Digital Clock loaded successfully!');