const getPlaceholder = (selectedPlatform) => {
  const placeholderMap = {
    github: "https://www.github.com/johnappleseed",
    twitter: "https://twitter.com/johnappleseed",
    linkedin: "https://www.linkedin.com/in/johnappleseed",
    youtube: "https://www.youtube.com/user/johnappleseed",
    facebook: "https://www.facebook.com/johnappleseed",
    twitch: "https://www.twitch.tv/johnappleseed",
    codewars: "https://www.codewars.com/users/johnappleseed",
    codepen: "https://codepen.io/johnappleseed",
    freecodecamp: "https://www.freecodecamp.org/johnappleseed",
    gitlab: "https://gitlab.com/johnappleseed",
    hashnode: "https://hashnode.com/@johnappleseed",
    stackoverflow: "https://stackoverflow.com/users/johnappleseed",
  };

  return placeholderMap[selectedPlatform?.value] || "Enter platform url";
};

export default getPlaceholder;
