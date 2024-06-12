import _ from 'lodash';

const makeAst = (data1, data2) => {
    const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
    const result = keys.map((key) => {
      if (!_.has(data2, key)) {
        return { key, type: 'deleted', value: data1[key] };
      }
      if (!_.has(data1, key)) {
        return { key, type: 'added', value: data2[key] };
      }
      if (data1[key] === data2[key]) {
        return { key, type: 'unchanged', value: data1[key] };
      }
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return { key, type: 'nested', children: makeAst(data1[key], data2[key]) };
      }
      return {
        key,
        type: 'changed',
        value1: data1[key],
        value2: data2[key],
      };
    });
    return result;
};

export default makeAst;