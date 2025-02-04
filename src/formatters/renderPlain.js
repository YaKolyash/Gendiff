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

const renderPlain = (tree, parentKey = '') => tree
  .map((node) => {
    const newProperty = _.trim(`${parentKey}.${node.key}`, '.');
    switch (node.type) {
      case 'changed':
        return `Property '${newProperty}' was updated. From ${planValue(node.value1)} to ${planValue(node.value2)}`;
      case 'added':
        return `Property '${newProperty}' was added with value: ${planValue(node.value)}`;
      case 'deleted':
        return `Property '${newProperty}' was removed`;
      case 'nested':
        return renderPlain(node.children, newProperty);
      case 'unchanged':
        return '';
      default:
        throw new Error(`Unknown node status ${node.type}`);
    }
  })
  .filter((line) => line !== '')
  .join('\n');

export default renderPlain;
