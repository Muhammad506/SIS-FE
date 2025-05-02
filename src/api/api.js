import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getLatestData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/iot/fetch`);
    return response.data.data.feeds.slice(-1)[0]; // Latest entry
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

export const updateRelayFlag = async (field, value) => {
  try {
    await axios.post(`${BASE_URL}/iot/update-relay`, { field, value });
  } catch (error) {
    console.error("Error updating relay", error);
  }
};
