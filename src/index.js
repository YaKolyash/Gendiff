import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import render from './formatters/index.js';
import getParse from './parsers.js';
import makeAst from './makeAst.js'

const getData = (pathToFile) => {
  const data = fs.readFileSync(path.resolve(pathToFile));
  const format = _.trim(path.extname(pathToFile), '.');

  return { data, format };
};


const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const file1 = getData(filepath1);
  const file2 = getData(filepath2);

  const data1 = getParse(file1.format, file1.data);
  const data2 = getParse(file2.format, file2.data);

  const diffTree = makeAst(data1, data2);
  return render(diffTree, outputFormat);
};

export default genDiff;