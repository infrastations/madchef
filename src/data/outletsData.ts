export interface Outlet {
  branch_name: string;
  google_maps_location: string;
  address: string;
  opening_hours: string;
  phone_number: string;
  coordinates: [number, number]; // [lng, lat]
  facebook_url?: string;
}

export const outlets: Outlet[] = [
  {
    branch_name: "Madchef Banani",
    google_maps_location: "https://maps.app.goo.gl/uaM5pY885KUEDGJD8",
    address: "5th Floor, Plot 47, Block H Road No. 11, Dhaka 1213",
    opening_hours: "11 AM - 11 PM",
    phone_number: "+8809638050505",
    coordinates: [90.4022, 23.7937],
    facebook_url: "https://www.facebook.com/profile.php?id=100089510358930",
  },
  {
    branch_name: "Madchef Mirpur",
    google_maps_location: "https://maps.app.goo.gl/oG3R4jeGxck2fy1d9",
    address: "2nd Floor, Senpara Porbota, Plot 13 Rd No 1, Dhaka 1216",
    opening_hours: "11 AM - 11 PM",
    phone_number: "+8809638050505",
    coordinates: [90.3654, 23.8041],
    facebook_url: "https://www.facebook.com/profile.php?id=100090016715258",
  },
  {
    branch_name: "Madchef Bashundhara",
    google_maps_location: "https://maps.app.goo.gl/z8F7w8pERDWs8Y399",
    address: "1st floor, Jabbar Molla tower, Evercare Hospital Rd, Dhaka 1212",
    opening_hours: "11 AM - 11 PM",
    phone_number: "+8801997902383",
    coordinates: [90.4247, 23.8159],
  },
  {
    branch_name: "Madchef & Cheez! Gulshan 1",
    google_maps_location: "https://maps.app.goo.gl/SC9x2m78uwJPM4SSA",
    address: "QCG9+627, Rd 137, Dhaka 1212",
    opening_hours: "11 AM - 11 PM",
    phone_number: "+8809638050505",
    coordinates: [90.4152, 23.7808],
  },
  {
    branch_name: "Madchef Khilgaon",
    google_maps_location: "https://maps.app.goo.gl/rWSbYXuYfUYTu12i8",
    address: "385, 960/B Shahid Baki Rd, Dhaka 1219",
    opening_hours: "11 AM - 11 PM",
    phone_number: "+8801334931438",
    coordinates: [90.4342, 23.7475],
  },
  {
    branch_name: "Madchef & Cheez ~ Bailey Road",
    google_maps_location: "https://maps.app.goo.gl/E2eStchrtnU7unkD8",
    address: "Near mohila shomiti, 4 Bailey Rd, Dhaka 1000",
    opening_hours: "11 AM - 11 PM",
    phone_number: "+8809638050505",
    coordinates: [90.3974, 23.7397],
    facebook_url: "https://www.facebook.com/MadchefBaily",
  },
  {
    branch_name: "Madchef Dhanmondi",
    google_maps_location: "https://maps.app.goo.gl/oMNFs3uUMDZ5dvLUA",
    address: "House 49/A, Rangs KB Square, 4th Floor, Satmasjid Road, Dhaka 1209",
    opening_hours: "11 AM - 11 PM",
    phone_number: "+8809638050505",
    coordinates: [90.3758, 23.7461],
    facebook_url: "https://www.facebook.com/profile.php?id=100090069726279",
  },
  {
    branch_name: "Madchef Banasree",
    google_maps_location: "https://maps.app.goo.gl/Yr4m9ary3tQxTajh7",
    address: "House - 9, Agora Building, Block - A, Main Road, Dhaka 1219",
    opening_hours: "11 AM - 11 PM",
    phone_number: "+8809638050505",
    coordinates: [90.4412, 23.7625],
  },
  {
    branch_name: "Madchef Uttara",
    google_maps_location: "https://maps.app.goo.gl/K6wM5PJ679Cj1JMMA",
    address: "House No, 4th Floor, Jewel Tower, 34 Gareeb-e-Newaz Ave, Dhaka 1230",
    opening_hours: "11 AM - 11 PM",
    phone_number: "+8809638050505",
    coordinates: [90.3987, 23.8693],
    facebook_url: "https://www.facebook.com/profile.php?id=100089481919701",
  },
  {
    branch_name: "Madchef Wari",
    google_maps_location: "https://maps.app.goo.gl/wariLocation",
    address: "Tipu Sultan Road, Wari, Dhaka",
    opening_hours: "11 AM - 11 PM",
    phone_number: "+8809638050505",
    coordinates: [90.4150, 23.7150],
    facebook_url: "https://www.facebook.com/profile.php?id=100089802410540",
  },
];
