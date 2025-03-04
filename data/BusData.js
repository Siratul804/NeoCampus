
export const busRoutes = [
     {
       id: 1,
       roadNumber: "B12",
       startLocation: "Main Gate",
       endLocation: "Library",
       stops: ["Science Block", "Arts Building", "Sports Complex"],
       departureTime: "08:30 AM",
       currentLocation: "Science Block",
       delayInfo: "On time",
       // Dummy coordinates (latitude, longitude)
       coords: [40.7128, -74.0060]
     },
     {
       id: 2,
       roadNumber: "C5",
       startLocation: "North Dorm",
       endLocation: "Engineering Dept",
       stops: ["Central Plaza", "Cafeteria"],
       departureTime: "09:00 AM",
       currentLocation: "Central Plaza",
       delayInfo: "Delayed by 5 mins",
       coords: [40.7138, -74.0050]
     },
     {
       id: 3,
       roadNumber: "A3",
       startLocation: "South Gate",
       endLocation: "Administration",
       stops: ["Health Center", "Auditorium"],
       departureTime: "09:15 AM",
       currentLocation: "On route",
       delayInfo: "On time",
       coords: [40.7148, -74.0040]
     }
   ];
   