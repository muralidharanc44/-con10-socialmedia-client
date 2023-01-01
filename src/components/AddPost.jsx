import { Button, Grid, Input } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost, addImage } from "../api";
import { getPosts } from "../redux/postSlice";
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import ImageUploader from 'react-images-upload';

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { Upload } from "upload-js";
const upload = Upload({ apiKey: "public_12a1xunABLssK8ZLoodDH6qdvGJQ" }); // Your real API key.
var moment = require('moment'); // require

export default function AddPost() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [postText, setPostText] = useState("");
  const [picture, setpicture] = useState();
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  let [showImage, setshowImage] = useState(true);
  let image = ''
  const handleAddPost = async () => {
    console.log("selectedFile", picture)
    // moment(new Date()).format("YYYY")
    let path = picture
    const data = await addPost({ text: postText, imageUrl: picture });
    if (data) {
      setshowImage(false);
      picture = ""
      dispatch(getPosts());
      setPostText("");
    }
  };



	const onDrop = (event) => {
		setSelectedFile(event);
		setIsFilePicked(true);
    handleSubmission(event)
	};

	const handleSubmission = async (file) => {
    console.log({ onAdd: file[0] });
    const myFile = file[0]
    const { fileUrl } = await upload.uploadFile(myFile, { onProgress });
    image = fileUrl
    setpicture(fileUrl)
	};
 
  const onProgress = ({ progress }) => {
    console.log(`File uploading: ${progress}% complete.`)
  }
  
  return (
    <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
      <Grid container>
        <Grid item sx={{ paddingRight: "1rem" }}>
          <img src="/logo.png" alt="lgogo" width="50px" />
        </Grid>
        <Grid item flexGrow="1">
          <Box padding=".5rem 0">
            <Input
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              multiline
              rows="2"
              disableUnderline
              type="text"
              placeholder="What's happening?"
              sx={{ width: "100%" }}
            />
            {/* <img src={"https://upcdn.io/12a1xun/raw/uploads/2022/12/30/istockphoto-931587220-612x612-nDxi.jpg"} /> */}

            {/* <ImagesUploader
              url="http://localhost:3000/notmultiple"
              optimisticPreviews
              multiple={false}
              onLoadEnd={(err) => {
                if (err) {
                  console.error(err);
                }
              }}
              label="Upload a picture"
            /> */}

            <ImageUploader
              withIcon={true}
              withPreview={showImage}
              buttonText='Choose images'
              onChange={onDrop}
              singleImage={true}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              
            />
          </Box>

          <Box
            textAlign="right"
            paddingBottom=".5rem"
            paddingTop=".5rem"
            borderTop="1px solid #ccc"
          >
            <Button
              onClick={handleAddPost}
              disabled={postText.trimStart().length === 0}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: theme.shape.borderRadius,
                fontSize: "12px",
              }}
            >
              Post
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
