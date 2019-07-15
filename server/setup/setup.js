var fs = require('fs');
fs.createReadStream('setup/.dev-env')
  .pipe(fs.createWriteStream('.env'));