import {
  files
} from "./constant/fileMapping";
import fs from "fs";

fs.writeFileSync("./exhibition.json", JSON.stringify(files));
console.log("Done.");