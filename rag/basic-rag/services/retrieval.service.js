const stopWords = new Set([
    "the",
    "is",
    "a",
    "an",
    "and",
    "or",
    "of",
    "to",
    "in",
    "for",
    "on",
    "with",
    "what",
    "who",
    "how",
    "when",
    "where",
    "my",
    "me",
    "i",
    "am",
    "are",
    "was",
    "were",
    "do",
    "does",
    "did",
    "about",
    "tell",
    "please"
  ]);
  
  const tokenize = (text) => {
    return text
      .toLowerCase()
      .match(/[a-z0-9]+/g) || [];
  };
  
  export const retrieveChunks = (
    question,
    chunks,
    topK = 4
  ) => {
    const questionWords = [
      ...new Set(
        tokenize(question).filter(
          (word) => !stopWords.has(word)
        )
      )
    ];
  
    if (questionWords.length === 0) {
      return [];
    }
  
    const results = chunks.map((chunk, index) => {
      const chunkWords = new Set(tokenize(chunk));
  
      const matchedWords = questionWords.filter(
        (word) => chunkWords.has(word)
      );
  
      return {
        chunk,
        index,
        score: matchedWords.length,
        matchedWords
      };
    });
  
    return results
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  };