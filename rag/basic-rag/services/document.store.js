const documents = new Map();


export const saveDocument = (documentId, data) => {
  documents.set(documentId, data);
};

export const getDocument = (documentId) => {
  return documents.get(documentId);
};

console.log(documents)
/**
 * Yahan JavaScript ka Map use kiya hai.

    Map ek data structure hai jo key-value pairs store karta hai.

    Example:
    documentId -> PDF information + chunks


    Har uploaded PDF ko ek unique ID milegi. Chat API isi ID ki help se correct document ke chunks retrieve karegi.

    Important: Ye temporary storage hai. Server restart hone par stored documents delete ho jayenge. Abhi hum database persistence implement nahi kar rahe hain.
 */