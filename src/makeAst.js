import _ from 'lodash';

const makeAst = (data1, data2) => {
    const fileKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
    const result = fileKeys.map((key) => {
      const oldValue = data1[key];
      const newValue = data2[key];
      if (!_.has(data2, key)) {
        return { key, status: 'deleted', value: oldValue };
      }
      if (!_.has(data1, key)) {
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