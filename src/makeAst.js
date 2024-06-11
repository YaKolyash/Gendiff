import _ from 'lodash';

const makeAst = (file1, file2) => {
    const fileKeys = _.sortBy(_.union(_.keys(file1), _.keys(file2)));
    const result = fileKeys.map((key) => {
      const oldValue = file1[key];
      const newValue = file2[key];
      if (!_.has(file2, key)) {
        return { key, status: 'deleted', value: oldValue };
      }
      if (!_.has(file1, key)) {
        return { key, status: 'added', value: newValue };
      }
      if (oldValue === newValue) {
        return { key, status: 'unchanged', value: oldValue };
      }
      if (_.isObject(oldValue) && _.isObject(newValue)) {
        return { key, status: 'nested', children: makeAst(oldValue, newValue) };
      }
      return {
        key,
        status: 'changed',
        oldValue,
        newValue,
      };
    });
    return result;
};

export default makeAst;