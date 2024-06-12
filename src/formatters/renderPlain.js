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
    .filter(({ status }) => status !== 'unchanged')
    .map((node) => {
      const newProperty = _.trim(`${parentKey}.${key}`, '.');
      switch (node.type) {
        case 'changed':
          return `Property '${newProperty}' was updated. From ${planValue(value1)} to ${planValue(value2)}`;
        case 'added':
          return `Property '${newProperty}' was added with value: ${planValue(value)}`;
        case 'deleted':
          return `Property '${newProperty}' was removed`;
        case 'nested':
          return renderPlain(children, newProperty);
        default:
          throw new Error(`Unknown node status ${node.type}`);
      }
    });
  return result.join('\n');
};

export default renderPlain;