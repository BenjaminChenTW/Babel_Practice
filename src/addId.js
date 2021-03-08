import fs from "fs";
import crypto from "crypto";

function genID() {
  const buffer = crypto.randomBytes(6);
  const token = buffer.toString("hex");
  return token;
}

const filePath = "./tmp/linkageeffect.json";
const exhibition = JSON.parse(fs.readFileSync(filePath));

exhibition.creation = exhibition.creation.map((aCreation) => ({
  ...aCreation,
  id: genID(),
}));

fs.writeFileSync(filePath, JSON.stringify(exhibition));
