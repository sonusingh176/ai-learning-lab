import { PDFParse } from "pdf-parse";

export const uploadDocument =async(req,res)=>{
    let parser;

    try {
        //check if file exists
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"please upload a PDF file",
            });
        }

        //get PDF buffer
        const pdfBuffer = req.file.buffer;

        //create PDF parser
        parser= new PDFParse({
            data:pdfBuffer,
        });

        //Extract text
        let result = await parser.getText();

        const extractedText = result.text.trim();

        if(!extractedText){
            return res.status(400).json({
                success:false,
                message:"No readble text found in PDF"
            });
        }

        return res.status(200).json({
            success:true,
            message:"PDF text extracted successfully",
            data:{
                filename: req.file.originalname,
                totalPages: result.total,
                textLength: extractedText.length,
                extractedText,
            },
        });

        
    } catch (error) {
        console.log("PDF extraction error", error);

        return res.status(500).json({
            success:false,
            message:"Failed to extract PDF text",
            error:error.message,
        });
    }finally{
        if(parser){
            await parser.destroy();
        }
    }
}

/**
 * Important concepts:
 * 
    Code	         Meaning
    req.file	     Uploaded file information
    req.file.buffer	 PDF file data stored in memory
    PDFParse	     PDF parser class
    getText()	    Extracts text from the PDF
    result.text	    Extracted text
    result.total	Total number of pages
    parser.destroy()	Releases parser resources
 */