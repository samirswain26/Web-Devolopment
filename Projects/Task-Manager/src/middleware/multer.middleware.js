import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb){
      return  cb(null, "./public/images")
    },
    filename: function (req, file, cb){
        const ext = path.extname(file.originalname); // e.g., '.png' 
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        return cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
}) 


export const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1 * 1000 * 1000 
    }
})








// // middleware/upload.js
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const uploadDir = path.join("public", "images");

// // Ensure directory exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, uniqueName);
//   },
// });

// export const upload = multer({ storage });
// // export default upload;
