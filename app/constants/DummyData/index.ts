import SUV_IMAGE from "../../assets/images/suv.png";
import UNIVERSITY_IMAGE from "../../assets/images/univer.png";
import COFFEE_IMAGE from "../../assets/images/coffee.png";
import FOOD_IMAGE from "../../assets/images/food.png";
import INSURANCE_IMAGE from "../../assets/images/insurance.png";

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
