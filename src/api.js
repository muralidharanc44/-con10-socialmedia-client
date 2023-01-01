import axios from "axios";
const formData = require("form-data");

export const addPost = async (postData) => {
  try {
    const { data } = await axios.post("/api/posts", postData);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};


export const addImage = async (postData) => {
  console.log(postData)
  const myForm = new formData();
  myForm.append("file", postData.file);
  try {
    const { data } = await axios.post("/api/posts/imageupload", { body: myForm });
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};


export const addComment = async (commentData) => {
  try {
    const { data } = await axios.post(
      "/api/comments/" + commentData.id,
      commentData
    );
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const likeOrDislikePost = async (postData) => {
  try {
    const { data } = await axios.post("/api/posts/likes", postData);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const deletePost = async (postData) => {
  try {
    const { data } = await axios.delete(`/api/posts/${postData.id}`);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const followAccount = async (follow) => {
  try {
    const { data } = await axios.post("/api/followers", follow);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const followingAccount = async (follow) => {
  try {
    const { data } = await axios.post("/api/followings", follow);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const unfollowAccount = async (follow) => {
  try {
    const { data } = await axios.delete(
      "/api/followers/" + follow.id + "?userId=" + follow.userId
    );
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const unfollowingAccount = async (follow) => {
  try {
    const { data } = await axios.delete(
      "/api/followings?followingId=" + follow.id + "&userId=" + follow.userId
    );
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};
