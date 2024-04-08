const join = require("path").join;
const { exec } = require("child_process");
const fs = require("fs");
const rimraf = require("rimraf");

// Variables
const latestVersion = require("./package.json").version;
const executableName = require("./forge.config").packagerConfig.executableName;
const setupFilename = `${executableName}-${latestVersion} Setup.exe`;
// const secrets = require("./.env/secrets.json");
const setupPath = `./out/make/squirrel.windows/x64/${setupFilename}`;
const updateDir = "./out/update";

// Prepare Release Files
console.log("Preparing ...");

rimraf.sync(updateDir);
fs.mkdirSync(updateDir, { recursive: true });

const sha256 = require("sha256-file")(setupPath);
fs.writeFileSync(
  join(updateDir, `latest.yml`),
  `version: ${latestVersion}\npath: ${setupFilename}\nsha2: ${sha256}`
);

fs.copyFileSync(setupPath, join(updateDir, `${setupFilename}`));

// Upload to surge
// removing it because we dont use surge anymore
// console.log("Publishing ...");
// exec(
//   join(__dirname, "./node_modules/.bin/surge") +
//     `  ${updateDir} --token ${secrets.surgeToken} --domain ${secrets.surgeDomain}.surge.sh`,
//   (err, stdout, stderr) => {
//     if (err) {
//       console.log("ERROR: ", err);
//       return;
//     }

//     // the *entire* stdout and stderr (buffered)
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
//     console.log(`Version ${latestVersion} has been published successfully.`);
//   }
// );
