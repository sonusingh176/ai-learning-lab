export const createChunks = (
    text,
    chunkSize = 1000,
    overlap = 200
  ) => {
    if (!text || !text.trim()) {
      return [];
    }
  
    if (overlap >= chunkSize) {
      throw new Error(
        "Overlap must be smaller than chunk size"
      );
    }
  
    const chunks = [];
  
    let start = 0;
  
    while (start < text.length) {
      const end = Math.min(
        start + chunkSize,
        text.length
      );
  
      const chunk = text.slice(start, end).trim();
  
      if (chunk) {
        chunks.push(chunk);
      }
  
      if (end === text.length) {
        break;
      }
  
      start = end - overlap;
    }
  
    return chunks;
  };

  /**
   * 
   * Code kaise work karta hai?
   * 
    Suppose extracted text 2,500 characters ka hai.
    Original text: 2500 characters

    Chunk 1: 0 - 1000
    Chunk 2: 800 - 1800
    Chunk 3: 1600 - 2500


    Yahan chunkSize = 1000 aur overlap = 200 hai.

    Overlap ka matlab hai ki consecutive chunks mein 200 characters common honge. Isse chunk ke beech mein context completely lose nahi hota.
   
    * 
   */