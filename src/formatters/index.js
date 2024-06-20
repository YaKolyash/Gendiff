import stylish from './renderStylish.js';
import plain from './renderPlain.js';

export default (diffTree, format) => {
  switch (format) {
    case 'plain':
      return plain(diffTree);
    case 'stylish':
      return stylish(diffTree);
    case 'json':
      return JSON.stringify(diffTree, '', 1);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};
