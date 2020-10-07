import {
  files
} from "./constant/fileMapping";
import {
  getImagePath
} from "./utils";
import fs from "fs";

Object.keys(files).forEach((aFile) => {
  let {
    creationIsJson,
    creation,
    curator,
    name
  } = files[aFile];
  let creationJson = null;
  if (creationIsJson) {
    creationJson = require(`./assets/exhibition_${name}/creation.json`).Creation;
  }
  files[aFile].creationList = creation.map((aCreation, index) => {
    let file = creationIsJson ?
      creationJson[index] : Array.isArray(aCreation) ?
      require(`./assets${aCreation[0]}`).default : require(`./assets${aCreation}`).default;
    let imageObj = creationIsJson ? creationJson[index] : null;
    let imageList = Array.isArray(aCreation) ? aCreation : [aCreation];
    return {
      ...file,
      imgPath: imageList.map(aImage => getImagePath(imageObj, aImage))
    }
  });

  files[aFile].artistDescription = require(`./assets/exhibition_${name}/artist`).default;
  files[aFile].teamDescription = curator ? require(`./assets${curator}`).default : [];
  if (!Array.isArray(files[aFile].teamDescription)) files[aFile].teamDescription = [files[aFile].teamDescription]

  delete files[aFile].creation;
  delete files[aFile].creationIsJson;
  delete files[aFile].curator;
});

fs.writeFileSync("./exhibition.json", JSON.stringify(files));
console.log("Done.");