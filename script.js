// Upload form submit handler
const uploadForm = document.getElementById('upload-form');

uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get form data
  const videoFile = uploadForm.video-file.files[0]; 
  const title = uploadForm.title.value;
  
  // upload video
  uploadVideo(videoFile, title); 
})

// Display uploaded videos
function displayVideo(title, filePath) {
  const video = document.createElement('div');
  video.className = 'video';
  
  const vid = document.createElement('video');
  vid.src = filePath;
  vid.controls = true;
  
  video.appendChild(vid);
  document.getElementById('video-container').appendChild(video);
}

// Upload video logic  
async function uploadVideo(video, title) {
  // API call to upload video and get file path
  const filePath = await uploadFile(video); 
  
  displayVideo(title, filePath);
}

async function uploadFile(video) {

    const formData = new FormData();
    formData.append('video', video);
  
    const response = await fetch('/upload-video', {
      method: 'POST',
      body: formData  
    });
  
    return response.json();
  }

  app.post('/upload-video', async (req, res) => {

    const video = req.files.video;
    
    // Upload video to cloud storage
    const url = await uploadToS3(video); 
    
    // Return the URL to the client
    res.json({url});
  
  });
  
  function uploadToS3(video) {
    // logic to upload video to S3  
    // and return the public URL
  }

  // After uploading, save video metadata
const {title, url} = req.body;

await Videos.create({
  title,
  url
});

// Client
const response = await fetch('/videos');
const videos = await response.json();

// Display videos
videos.forEach(video => {
  displayVideo(video.title, video.url); 
});