const findMatchingLink = (previewLinks, links) => {
  return previewLinks.find((previewLink) =>
    links.some((link) => link.id === previewLink.id)
  );
};

export default findMatchingLink;
