const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const storage = require('../config/firebase');

module.exports = async (req, res, next) => {
  const file = req.files['file'] ? req.files['file'][0] : null; 


  // Check if file is uploaded
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Perform file upload to Firebase Storage
    const storageRef = ref(storage, `books/${file.originalname}`);
    const uploadResult = await uploadBytes(storageRef, file.buffer);

    // Get the download URL after uploading
    const downloadURL = await getDownloadURL(uploadResult.ref);
    console.log('File available at:', downloadURL);

    // Attach the file URL to the request object
    req.fileUrl = downloadURL;

    // Move to the next middleware (createBook)
    next();
  } catch (error) {
    // Handle any errors during the upload process
    console.error('Error during file upload:', error);
    return res.status(500).json({ message: 'Error during file upload', error });
  }
};