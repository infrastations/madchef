export interface MenuItem {
  food_name: string;
  description: string;
  price: string;
}

export interface MenuGroup {
  menu_group: string;
  note?: string;
  items: MenuItem[];
}

export const menuData: MenuGroup[] = [
  {
    menu_group: "Teasers",
    items: [
      { food_name: "Fries", description: "Salt & pepper / spicy cajun", price: "139-199" },
      { food_name: "Onion rings", description: "Crispy golden onion rings", price: "149" },
      { food_name: "Chicken cheese bombs", description: "Explosive cheesy goodness", price: "299" },
      { food_name: "Spicy garlic mushrooms", description: "Garlic-infused perfection", price: "269" },
      { food_name: "Paneer sticks", description: "Crispy paneer delight", price: "399" },
    ],
  },
  {
    menu_group: "Crispy Chicken",
    items: [
      { food_name: "The Original", description: "Bangkok style crispy chicken - Wings or Drumsticks", price: "399" },
      { food_name: "Buffalo", description: "Classic buffalo sauce glazed", price: "399" },
      { food_name: "Naga-tastic", description: "Fiery naga chili flavor", price: "399" },
      { food_name: "Honey Garlic", description: "Sweet & savory combination", price: "399" },
    ],
  },
  {
    menu_group: "Classic Burgers",
    note: "Pick your bun: Potato brioche or Garlic crusted brioche",
    items: [
      { food_name: "Signature Chicken", description: "Classic garlic mayo, naga blast, or smokewood bbq", price: "269" },
      { food_name: "Signature Beef", description: "Premium beef patty with choice of sauce", price: "299" },
      { food_name: "Madchef's Fav", description: "Garlic mayo & naga blast with crispy pepperoni", price: "379" },
      { food_name: "Mushroom Melt", description: "Beef cheese burger with mushroom gravy", price: "379" },
      { food_name: "The Big Rob", description: "Beef cheese burger with fried chicken sausage", price: "379" },
    ],
  },
  {
    menu_group: "Gourmet Burgers",
    items: [
      { food_name: "The Cuban", description: "Smoked chicken base with beef patty & cheese", price: "419" },
      { food_name: "Smokin' Chic", description: "BBQ chicken, beef bacon, smoked chicken & cheese", price: "419" },
      { food_name: "Madame Lucy", description: "Beef patty, sausage gravy, beef bacon, cheese", price: "499" },
      { food_name: "The ঢাকাইয়া", description: "Beef patty, paneer, cheese, green chilli mint sauce", price: "449" },
      { food_name: "Mighty Spicy Chic", description: "Double chicken patty, beef bacon, naga blast", price: "499" },
      { food_name: "The Hawk", description: "Double beef patties with crispy pepperoni & bacon", price: "619" },
    ],
  },
  {
    menu_group: "Poutines",
    items: [
      { food_name: "Roast Chicken", description: "Fries with brown gravy, roast chicken & cheddar", price: "329" },
      { food_name: "'Shah' Poutine", description: "The ultimate loaded poutine with egg", price: "379" },
      { food_name: "Gyro Chicken Over Cajun", description: "Cajun fries with gyro chicken & mint yogurt", price: "379" },
      { food_name: "Crispy Chicken & Bacon", description: "Katsu chicken, beef bacon & melted cheese", price: "439" },
    ],
  },
  {
    menu_group: "Rice Meals",
    note: "Rice choices: Classic fried / Garlic butter / Achari garlic / Achari naga",
    items: [
      { food_name: "Achari Rice", description: "Achari fried rice with katsu chicken", price: "299" },
      { food_name: "Spicy Basil Chicken", description: "Rice with spicy basil infused chicken", price: "349" },
      { food_name: "Gyro Chicken Over Rice", description: "Rice with gyro chicken & mint yogurt", price: "399" },
      { food_name: "Creamy Mushroom Stuffed", description: "Stuffed chicken breast with mushroom & cheese", price: "499" },
    ],
  },
  {
    menu_group: "Platters",
    items: [
      { food_name: "Chicken Steak Meal", description: "With spicy garlic mushrooms & fries", price: "419" },
      { food_name: "Mango Habanero Grilled", description: "With choice of 2 sides", price: "649-949" },
      { food_name: "Mad Monster", description: "Burger + poutine + chicken steak combo", price: "649" },
      { food_name: "Creamcheez Stuffed", description: "With potato velvet mash & mushroom gravy", price: "699" },
    ],
  },
  {
    menu_group: "Shakes & Drinks",
    items: [
      { food_name: "Just Milo", description: "Classic milo shake", price: "299" },
      { food_name: "French Vanilla Latte", description: "Creamy vanilla goodness", price: "299" },
      { food_name: "Cookies n' Cream", description: "Oreo lovers' delight", price: "299" },
      { food_name: "Nutella Madness", description: "Rich nutella shake", price: "349" },
      { food_name: "Lime Refreshment", description: "Fresh lime mocktail", price: "219" },
      { food_name: "Honey Limeade", description: "Sweet honey lime blend", price: "249" },
    ],
  },
  {
    menu_group: "Dessert",
    items: [
      { food_name: "Brownie with Ice Cream", description: "Warm brownie with cold ice cream", price: "249" },
    ],
  },
];

// Food category images mapping
export const categoryImages: Record<string, string> = {
  "Teasers": "https://images.unsplash.com/photo-1630384060421-cb20aab675db?w=400",
  "Crispy Chicken": "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400",
  "Classic Burgers": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
  "Gourmet Burgers": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400",
  "Poutines": "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400",
  "Rice Meals": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
  "Platters": "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400",
  "Shakes & Drinks": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
  "Dessert": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
};
