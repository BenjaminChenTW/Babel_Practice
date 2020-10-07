export const getImagePath = (creationObj, creation) => {
  if (creationObj && !creationObj.name) {
    return "default_img";
  }
  return `https://media.artogo.tw${creation}.jpg`;
};