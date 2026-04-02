function findMatches(newItem, items) {
  const matches = [];

  items.forEach(item => {
    let score = 0;

    // Match category
    if (item.category && newItem.category && item.category === newItem.category) {
      score += 2;
    }

    // Match location
    if (item.location && newItem.location && item.location === newItem.location) {
      score += 2;
    }

    // Match title keywords
    if (item.title && newItem.title) {
      const words1 = item.title.toLowerCase().split(" ");
      const words2 = newItem.title.toLowerCase().split(" ");

      words1.forEach(word => {
        if (words2.includes(word)) {
          score += 1;
        }
      });
    }

    if (score >= 3) {
      matches.push({ item, score });
    }
  });

  return matches;
}

module.exports = findMatches;