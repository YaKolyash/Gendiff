import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import render from './formatters/index.js';
import getParseFile from './parsers.js';
import makeAst from './makeAst.js'

const getData = (pathToFile) => {
  const data = fs.readFileSync(path.resolve(pathToFile));
  const format = _.trim(path.extname(pathToFile), '.');

  return { data, format };
};

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const beforeConfig = getData(filepath1);
  const afterConfig = getData(filepath2);

  const data1 = getParseFile(beforeConfig.format, beforeConfig.data);
  const data2 = getParseFile(afterConfig.format, afterConfig.data);

  const diffTree = makeAst(data1, data2);
  return render(diffTree, outputFormat);
};

export default genDiff;