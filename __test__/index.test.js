import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedJson = readFile('jsonTestResult.txt');
const expectedStylish = readFile('stylishTestResult.txt');
const expectedPlain = readFile('plainTestResult.txt');

const cases = ['json', 'yml'];

describe('gendiff', () => {
  test.each(cases)('format %s', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);

    expect(genDiff(filepath1, filepath2)).toBe(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
    expect(genDiff(filepath1, filepath2, 'json')).toBe(expectedJson);
  });
});
