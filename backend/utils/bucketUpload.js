const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const storage = require('../config/firebase');

module.exports = async (req, res, next) => {
  const file = req.files['file'] ? req.files['file'][0] : null;
  const image = req.files['image'] ? req.files['image'][0] : null;

  // Check if file is uploaded
  if (!file && !image) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Perform file upload to Firebase Storage
    const fileStorageRef = ref(storage, `books/${file.originalname}`);
    const fileUploadResult = await uploadBytes(fileStorageRef, file.buffer);
    const fileDownloadURL = await getDownloadURL(fileUploadResult.ref);


    const imageStorageRef = ref(storage, `books/images/${image.originalname}`);
    const imageUploadResult = await uploadBytes(imageStorageRef, image.buffer);
    const imageDownloadURL = await getDownloadURL(imageUploadResult.ref);

    // Attach the file URL to the request object
    req.fileUrl = fileDownloadURL;
    req.imageUrl = imageDownloadURL;

    // Move to the next middleware (createBook)
    next();
  } catch (error) {
    // Handle any errors during the upload process
    console.error('Error during file upload:', error);
    return res.status(500).json({ message: 'Error during file upload', error });
  }
};