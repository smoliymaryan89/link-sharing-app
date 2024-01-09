const mergeItems = (item, matchingPreviewLink) => {
  if (matchingPreviewLink) {
    return {
      id: item.id,
      platform: matchingPreviewLink.platform || item.platform,
      url: matchingPreviewLink.url || item.url,
    };
  } else {
    return item;
  }
};

export default mergeItems;
