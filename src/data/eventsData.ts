export interface MadchefEvent {
  date: string;
  event_title: string;
  location: string;
  type: string;
}

export const events: MadchefEvent[] = [
  {
    date: "2025-11-01",
    event_title: "Madchef Khilgaon Launch - FIRST 50 EAT FOR FREE",
    location: "Khilgaon, Dhaka",
    type: "Branch Launch",
  },
  {
    date: "2025-09-16",
    event_title: "100 FREE PIZZAS & BURGERS!",
    location: "Banasree (Delivery Launch)",
    type: "Promotion",
  },
  {
    date: "2025-01-20",
    event_title: "Madchef Bashundhara Launch - FIRST 50 EAT FOR FREE",
    location: "Bashundhara, Dhaka",
    type: "Branch Launch",
  },
  {
    date: "2022-11-23",
    event_title: "Football Frenzy: World Cup 20% OFF on MadDelivery",
    location: "All Outlets",
    type: "Campaign",
  },
  {
    date: "2022-12-18",
    event_title: "PLAY & WIN A PS5: Football Frenzy!",
    location: "Cheez Outlets",
    type: "Competition",
  },
  {
    date: "2022-04-01",
    event_title: "CHEEZ! & Madchef Wari Launch | FREE FOOD TASTING",
    location: "Tipu Sultan Road, Wari, Dhaka",
    type: "Branch Launch",
  },
  {
    date: "2021-12-23",
    event_title: "Man vs Burger",
    location: "All Outlets",
    type: "Eating Competition",
  },
  {
    date: "2021-02-15",
    event_title: "CHEEZ! & Madchef Bailey Road Launch",
    location: "Bangladesh Mohila Samity, Bailey Road",
    type: "Branch Launch",
  },
  {
    date: "2018-11-01",
    event_title: "Madchef Opening at Banani 11",
    location: "Navana Rowshan Sayed Plaza, Banani",
    type: "Branch Launch",
  },
  {
    date: "2017-06-01",
    event_title: "Grand Opening of Madchef Mirpur!",
    location: "Mirpur, Dhaka",
    type: "Branch Launch",
  },
  {
    date: "2016-08-13",
    event_title: "EPL Live Screening GameWeek 1",
    location: "Dhanmondi, Banani and Uttara",
    type: "Screening",
  },
  {
    date: "2015-12-20",
    event_title: "Madchef BANANI Soft-launch",
    location: "Banani, Dhaka",
    type: "Branch Launch",
  },
  {
    date: "2015-03-05",
    event_title: "Madchef Grand Launch",
    location: "Dhanmondi, Dhaka",
    type: "Brand Milestone",
  },
  {
    date: "2014-06-14",
    event_title: "Launching MADCHEF - Gourmet Burgers and Grilled Cheese",
    location: "Original Concept Launch",
    type: "Brand Milestone",
  },
];

export const eventTypeColors: Record<string, string> = {
  "Branch Launch": "from-green-500 to-emerald-600",
  "Promotion": "from-blue-500 to-cyan-600",
  "Campaign": "from-purple-500 to-pink-600",
  "Competition": "from-yellow-500 to-orange-600",
  "Eating Competition": "from-red-500 to-pink-600",
  "Screening": "from-indigo-500 to-purple-600",
  "Brand Milestone": "from-orange-500 to-red-600",
  "Seasonal": "from-teal-500 to-green-600",
};
