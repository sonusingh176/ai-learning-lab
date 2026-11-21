import multer from "multer";

const storage = multer.memoryStorage();
//memoryStorage(): Keeps the uploaded PDF in memory instead of saving it to disk.

//fileFilter: Allows only PDF files.
const fileFilter=(req,file,cb)=>{
    if(file.mimetype === "application/pdf"){
        cb(null,true)
    }else{
        cb(new Error("Only PDF files are allowed"),false);
    }
}

const upload=multer({
    storage,
    fileFilter,
    limits:{
        fileSize:5 * 1024 *1024 
    },
});

export default upload;

// Why memory storage?

// Because we only need to extract text from the PDF. We don't need to save the original file on our server.