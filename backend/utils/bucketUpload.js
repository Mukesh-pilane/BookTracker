const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const storage = require('../config/firebase');
const client = require('../config/redis');
const jwt = require('jsonwebtoken');

// Dummy async function simulating Firebase upload
const simulateFileUpload = (file) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (file) {
        const dummyUrl = `https://dummyurl.com/${file.originalname}`;
        resolve(dummyUrl);
      } else {
        reject('No file uploaded');
      }
    }, 2000); // Simulate a delay of 2 seconds
  });
};

module.exports = async (req, res, next) => {
  const file = req.files['file'] ? req.files['file'][0] : null; // Access the file
  const { categoryId } = req.body; // Access other fields like categoryId

  let token = req.headers.authorization;
  if (!token) {
    return response.unauthorized(res);
  }
  token = token.split(' ')[1];
  //if token is present in the database now decode the token
  const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
  if (!decoded.userid) {
    return response.unauthorized(res);
  }
  const redisToken = await client.get(token);
  console.log("redisToken",redisToken)

  console.log('Received File:', file);
  console.log('Received categoryId:', categoryId);

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Wait for the simulated file upload to complete (using async/await)

    const fileUrl = await simulateFileUpload(file);  // Firebase upload simulation

    console.log('File uploaded successfully. URL:', fileUrl);
    req.fileUrl = fileUrl;  // Attach file URL to the request object
    console.log('File URL set:', req.fileUrl);

    // After the async task finishes, call next() to proceed to createBook
    next();
  } catch (error) {
    console.error('Error during file upload:', error);
    return res.status(500).json({ message: 'Error during file upload', error });
  }
};



// const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
// const storage = require('../config/firebase');

// exports.bucketUpload = async (req, res, next) => {
//   // Access the uploaded file
//   const file = req.files['file'] ? req.files['file'][0] : null; 
//   const { categoryId } = req.body; // Get other fields from the body

//   // Log received data for debugging
//   console.log('Received File:', file);
//   console.log('Received categoryId:', categoryId);

//   // Check if file is uploaded
//   if (!file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }

//   try {
//     // Perform file upload to Firebase Storage
//     const storageRef = ref(storage, `books/${file.originalname}`);
//     const uploadResult = await uploadBytes(storageRef, file.buffer);

//     // Log the upload result to check the details
//     console.log('File uploaded successfully:', uploadResult);

//     // Get the download URL after uploading
//     const downloadURL = await getDownloadURL(uploadResult.ref);
//     console.log('File available at:', downloadURL);

//     // Attach the file URL to the request object
//     req.fileUrl = downloadURL;
//     console.log('File URL set:', req.fileUrl);

//     // Move to the next middleware (createBook)
//     next();
//   } catch (error) {
//     // Handle any errors during the upload process
//     console.error('Error during file upload:', error);
//     return res.status(500).json({ message: 'Error during file upload', error });
//   }
// };
