(() => {
    "use strict";
    const eventsStore = [ {
        title: "INFJ Personality Type - Coffee Shop Meet & Greet",
        description: "Being an INFJ",
        date: new Date(2024, 2, 23, 15),
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto= format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w ",
        type: "offline",
        attendees: 99,
        category: "Hobbies and Passions",
        distance: 50
    }, {
        title: "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
        description: "New York AI Users",
        date: new Date(2024, 2, 23, 11, 30),
        image: "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
        type: "offline",
        attendees: 43,
        category: "Technology",
        distance: 25
    }, {
        title: "Book 40+ Appointments Per Month Using AI and Automation",
        description: "New Jersey Business Network",
        date: new Date(2024, 2, 16, 14),
        image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        category: "Technology",
        distance: 10
    }, {
        title: "Dump writing group weekly meetup",
        description: "Dump writing group",
        date: new Date(2024, 2, 13, 11),
        image: "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        attendees: 77,
        category: "Business",
        distance: 100
    }, {
        title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
        description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
        date: new Date(2024, 2, 14, 11),
        image: "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        category: "Social Activities",
        distance: 74
    }, {
        title: "All Nations - Manhattan Missions Church Bible Study",
        description: "Manhattan Bible Study Meetup Group",
        date: new Date(2024, 2, 14, 11),
        image: "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "offline",
        category: "Health and Wellbeing",
        distance: 15
    } ];

    window.onload = function() {
        const container = document.getElementById("events-container");
        if (container) showEvents(eventsStore);
    };
    

    function applyFilters() {
        const container = document.getElementById("events-container");
        if (!container) return;
        const filters = {
            type: document.getElementById("type-select").value,
            category: document.getElementById("category-select").value,
            distance: document.getElementById("distance-select").value,
            date: document.getElementById("date-select").value
        };
        const filteredEvents = eventsStore.filter((event => applyTypeFilter(event, filters.type) && applyCategoryFilter(event, filters.category) && applyDistanceFilter(event, filters.distance) && applyDateFilter(event, filters.date)));
        showEvents(filteredEvents);
    }
    function applyTypeFilter(event, type) {
        return type === "" || event.type === type;
    }
    function applyCategoryFilter(event, category) {
        return category === "" || event.category === category;
    }
    function applyDistanceFilter(event, distance) {
        return distance === "" || event.distance <= parseInt(distance);
    }
    function applyDateFilter(event, selectedDate) {
        if (selectedDate === "") return true;
        const eventDate = new Date(event.date).toISOString().split("T")[0];
        return eventDate === selectedDate;
    }
    function showEvents(events) {
        const container = document.getElementById("events-container");
        if (!container) return;
        container.innerHTML = "";
        if (events.length === 0) {
            container.innerHTML = "<p>No events found.</p>";
            return;
        }
        events.forEach((event => {
            const attendeesHTML = event.attendees ? `<span>${event.attendees} attendees</span>` : "";
            const typeBlockHTML = event.type === "online" ? `\n        <div class='events-page__type-block'>\n          <img src='img/icons/camera.svg' alt='icon: camera'>\n          <span>Online event</span>\n        </div>\n      ` : "";
            const eventHTML = `\n      <div class="events-page__item">\n        <a href="#" class="events-page__image">\n          <img src="${event.image}" alt="image">\n\t\t\t\t${typeBlockHTML}\n        </a>\n        <div class="events-page__content">\n          <div class="events-page__data">${formatEventDate(event.date)}</div>\n          <div class="events-page__header">${event.title}</div>\n          <div class="events-page__type">${event.category} (${event.distance} km)</div>\n         <div class="events-page__footer">\n            ${attendeesHTML}\n          </div>\n        </div>\n      </div>\n    `;
            container.insertAdjacentHTML("beforeend", eventHTML);
        }));
    }
    function formatEventDate(date) {
        const options = {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZoneName: "short"
        };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    }
    document.getElementById("type-select").addEventListener("change", applyFilters);
    document.getElementById("category-select").addEventListener("change", applyFilters);
    document.getElementById("distance-select").addEventListener("change", applyFilters);
    document.getElementById("date-select").addEventListener("change", applyFilters);
})();


