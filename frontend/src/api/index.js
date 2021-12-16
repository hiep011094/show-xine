import axios from "axios";

const URL = "http://localhost:4000";

export const fetchMenus = () => axios.get(`${URL}/api/v1/menus`);
export const fetchMainvisual = () => axios.get(`${URL}/api/v1/mainvisual`);
export const fetchSocials = () => axios.get(`${URL}/api/v1/socials`);
export const fetchSlideHeros = () => axios.get(`${URL}/api/v1/slider-heros`);
