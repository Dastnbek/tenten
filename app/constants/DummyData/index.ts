import SUV_IMAGE from "../../assets/images/suv.png";
import UNIVERSITY_IMAGE from "../../assets/images/univer.png";
import COFFEE_IMAGE from "../../assets/images/coffee.png";
import FOOD_IMAGE from "../../assets/images/food.png";
import INSURANCE_IMAGE from "../../assets/images/insurance.png";
import { title } from "process";

export const DUMMY_DATA = [
  {
    id: 1,
    title: "Top 10 SUVs in 2024",
    img: SUV_IMAGE.src,
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits",
    },
    date: "12 June 2024",
    likes: 10,
    comments: 5,
  },
  {
    id: 2,
    title: "Top 10 Universities in 2024",
    img: UNIVERSITY_IMAGE.src,
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits",
    },
    date: "12 June 2024",
    likes: 250,
    comments: 100,
  },
  {
    id: 3,
    title: "Top 10 cheapest coffee shops in 2024",
    img: COFFEE_IMAGE.src,
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits",
    },
    date: "12 June 2024",
    likes: 25,
    comments: 5,
  },
  {
    id: 4,
    title: "Top 10 Chinese restaurants in 2024",
    img: FOOD_IMAGE.src,
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits",
    },
    date: "12 June 2024",
    likes: 10,
    comments: 5,
  },
  {
    id: 5,
    title: "Top 10 insurance companies in 2024",
    img: INSURANCE_IMAGE.src,
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits",
    },
    date: "17 June 2024",
    likes: 10,
    comments: 5,
  },
];

export const SINGLE_POST = [
  {
    id: 1,
    title: "Dell Inspiron 14 Plus",
    description:
      "The Dell Inspiron 14 Plus is one of the most well-rounded laptops money can buy. It offers strong performance, exceptional battery life, and a vibrant display. The best part is that it costs about $1,000, which is a reasonable price point considering the price to performance ratio. In fact, it performed exceptionally in PCMark 10’s benchmark, according to our review. With a PCMark 10 score of 7,061, it beat out the Acer Swift Go 14, which has similar specs to the Dell, and the more expensive Lenovo ThinkPad X1 Carbon. The Inspiron 14 Plus also lasted an impressive 17 hours on a single charge, which is definitely more than a full workday or school day. You don’t have to worry about finding a wall outlet to charge up.",
  },
  {
    id: 2,
    title: "Asus Zenbook 14 OLED – Best overall runner-up",
    description:
      "The Asus Zenbook 14 OLED wowed us with its zippy CPU performance, phenomenal battery life, and attractive OLED touchscreen display. According to our review, “movies and games look realistic and vibrant” on the 1200p OLED touchscreen, although it can be difficult to use in bright environments due to the reflective surface. It also lasted 16 hours on a single charge, which is absolutely wild! That result really trumps otherwise excellent competitors like the Lenovo Slim 7 14 Gen 9 and the HP Pavilion Plus Laptop 14. As for performance, the Asus Zenbook 14 OLED absolutely crushed the PCMark 10 benchmark with an impressive score of 6,772. That means it’s very fast and responsive during real-world tasks like web browsing, video conferencing, and so on.",
  },
  {
    id: 3,
    title: "Acer Aspire 3",
    description:
      "The Acer Aspire 3 is a budget-friendly laptop that offers solid performance and a comfortable keyboard. It’s a great option for students or anyone who needs a reliable laptop for everyday tasks. The Aspire 3 is powered by an AMD Ryzen 5 3500U processor and 8GB of RAM, which is more than enough for web browsing, word processing, and other basic tasks. It also has a 256GB SSD for fast boot times and snappy performance. The 15.6-inch display is bright and clear, making it easy to read text and watch videos. The keyboard is comfortable to type on, with good key travel and a responsive feel. The touchpad is also responsive and accurate, making it easy to navigate the screen. Overall, the Acer Aspire 3 is a solid budget laptop that offers good performance and a comfortable typing experience.",
  },
  {
    id: 4,
    title: "Microsoft Surface Laptop 7",
    description:
      "The Microsoft Surface Laptop 7 is a premium laptop that offers excellent performance, a beautiful display, and a sleek design. It’s a great option for professionals, students, or anyone who needs a powerful laptop for work or play. The Surface Laptop 7 is powered by an Intel Core i5 processor and 8GB of RAM, which is more than enough for demanding tasks like video editing, graphic design, and gaming. It also has a 256GB SSD for fast boot times and snappy performance. The 13.5-inch PixelSense display is bright and clear, with vibrant colors and sharp details. The keyboard is comfortable to type on, with good key travel and a responsive feel. The touchpad is also responsive and accurate, making it easy to navigate the screen. Overall, the Microsoft Surface Laptop 7 is a premium laptop that offers excellent performance and a beautiful design.",
  },
  {
    id: 5,
    title: "Dell Inspiron Plus 16",
    description:
      "The Dell Inspiron Plus 16 is a powerful laptop that offers excellent performance, a beautiful display, and a sleek design. It’s a great option for professionals, students, or anyone who needs a powerful laptop for work or play. The Inspiron Plus 16 is powered by an Intel Core i7 processor and 16GB of RAM, which is more than enough for demanding tasks like video editing, graphic design, and gaming. It also has a 512GB SSD for fast boot times and snappy performance. The 16-inch display is bright and clear, with vibrant colors and sharp details. The keyboard is comfortable to type on, with good key travel and a responsive feel. The touchpad is also responsive and accurate, making it easy to navigate the screen. Overall, the Dell Inspiron Plus 16 is a powerful laptop that offers excellent performance and a beautiful design.",
  },
];

export const SINGLE_POST_SOURCES = [
  {
    id: 1,
    title: "Laptops 2024",
    source: "techradar.com",
  },
  {
    id: 2,
    title: "The best laptop 2024: top portable picks for all budgets",
    source: "techradar.com",
  },
  {
    id: 3,
    title: "Best laptop 2024: 10 best laptops tested and rated",
    source: "laptopmag.com",
  },
  {
    id: 4,
    title: "The best laptop you can buy in 2024",
    source: "engadget.com",
  },
  {
    id: 5,
    title: "Best laptops 2024 tested — July top picks",
    source: "tomsguide.com",
  },
];
