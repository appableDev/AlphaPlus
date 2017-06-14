/**
 * Created by zenymax on 3/14/17.
 */

import fs from 'fs';
import mkdirp from 'mkdirp';

const writeFile = (file, contents) => new Promise((resolve, reject) => {
  fs.writeFile(file, contents, 'utf8', err => err ? reject(err) : resolve());
});

const readFile = (file) => new Promise((resolve, reject) => {
  fs.readFile(file, function(err, content){
    err => err ? reject(err) : resolve();
    return content;
  });
});

const makeDir = (name) => new Promise((resolve, reject) => {
  mkdirp(name, err => err ? reject(err) : resolve());
});

export default { writeFile, readFile, makeDir };
