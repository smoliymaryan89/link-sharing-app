const checkLinksIndex = (reorderList, links) => {
  if (reorderList.length !== links.length) {
    return false;
  }

  for (let i = 0; i < reorderList.length; i++) {
    if (reorderList[i] !== links[i]) {
      return true;
    }
  }

  return false;
};

export default checkLinksIndex;
