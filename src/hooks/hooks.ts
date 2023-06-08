import axios from "axios";

const BASE_URL = "https://dev.codeleap.co.uk/careers/";

export const getPosts = async (limit: number, offset: number) => {
  try {
    const response = await axios.get(
      BASE_URL + `?limit=${limit}` + `&offset=${offset}&`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createPost = async (data: {
  username: string;
  title: string;
  content: string;
}) => {
  try {
    1;
    const response = await axios.post(BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updatePost = async (objectId: number, data) => {
  try {
    const response = await axios.patch(BASE_URL + objectId, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deletePost = async (objectId: number) => {
  console.log(objectId);
  try {
    await axios.delete(BASE_URL + objectId + "/");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
