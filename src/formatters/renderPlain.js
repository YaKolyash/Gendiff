import _ from 'lodash';

const planValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const renderPlain = (tree, parentKey = '') => {
  const result = tree
    .map((node) => {
      const newProperty = _.trim(`${parentKey}.${node.key}`, '.');
      let output;
      switch (node.type) {
        case 'changed':
          output = `Property '${newProperty}' was updated. From ${planValue(node.value1)} to ${planValue(node.value2)}`;
          break;
        case 'added':
          output = `Property '${newProperty}' was added with value: ${planValue(node.value)}`;
          break;
        case 'deleted':
          output = `Property '${newProperty}' was removed`;
          break;
        case 'nested':
          output = renderPlain(node.children, newProperty);
          break;
        case 'unchanged':
          output = '';
          break;
        default:
          throw new Error(`Unknown node status ${node.type}`);
      }
      return output;
    })
    .filter((line) => line !== '');
  return result.join('\n');
};

export default renderPlain;