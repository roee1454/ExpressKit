import express from 'express';
import { upload } from '../modules/multer';
import { handleDeleteFile, handleGetAllUploads, handleGetFile, handleUpdateFile, handleUploadFile } from '../controllers/fileController';
import { handleVerifyAuthorization } from '../controllers/authController';

//Global variables
const uploadName = process.env.FILE_FORM_NAME

const router: express.Router = express.Router();
//Get list of all files in storage..
router.get("/files", handleVerifyAuthorization ,handleGetAllUploads);
//Get file buffer..
router.get("/file/:id", handleVerifyAuthorization ,handleGetFile);
//Upload a new file.. (Change 'uploadName' as you like)
router.post("/file", handleVerifyAuthorization ,upload.single(uploadName), handleUploadFile);
//Updating an existing file..
router.put("/file/:id", handleVerifyAuthorization ,upload.single(uploadName), handleUpdateFile);
//Deleting an existing file..
router.delete("/file/:id", handleVerifyAuthorization ,handleDeleteFile);

export default router;