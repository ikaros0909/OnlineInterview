export const checkSameArr = (arr1, arr2) => {
  if (!arr1 || !arr2) return false;
  const filteredArr1 = arr1.filter((item) => !arr2.includes(item));
  const filteredArr2 = arr2.filter((item) => !arr1.includes(item));
  if (filteredArr1.length > 0 || filteredArr2.length > 0) return false;
  return true;
};

// EXAMPLES
// sortList(arr, key)
export const sortList_asc = (list, value) => {
  if (!list || !list.length) return false;

  const list_sorted = list.sort((a, b) => {
    const onlyNumberRegExp = /\d+/g;
    let itemA = String(a[value]).match(onlyNumberRegExp) ? String(a[value]).match(onlyNumberRegExp)[0] : 0;
    let itemB = String(b[value]).match(onlyNumberRegExp) ? String(b[value]).match(onlyNumberRegExp)[0] : 0;
    itemA = parseInt(itemA, 10);
    itemB = parseInt(itemB, 10);

    if (itemA < itemB) return -1;
    else if (itemA > itemB) return 1;
    else return 0;
  });
  return list_sorted;
};
export const sortList_desc = (list, value) => {
  if (!list || !list.length) return false;

  const list_sorted = list.sort((a, b) => {
    const onlyNumberRegExp = /\d+/g;
    let itemA = String(a[value]).match(onlyNumberRegExp) ? String(a[value]).match(onlyNumberRegExp)[0] : 0;
    let itemB = String(b[value]).match(onlyNumberRegExp) ? String(b[value]).match(onlyNumberRegExp)[0] : 0;
    itemA = parseInt(itemA, 10);

    if (itemA > itemB) return -1;
    else if (itemA < itemB) return 1;
    else return 0;
  });
  return list_sorted;
};

// EXAMPLES
// const users = [{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }, { name: 'fred', age: 40 }];
// orderBy(['name', 'age'], ['asc', 'desc'], users); // [{name: 'barney', age: 36}, {name: 'fred', age: 48}, {name: 'fred', age: 40}]
// orderBy(['name', 'age'], users); // [{name: 'barney', age: 36}, {name: 'fred', age: 40}, {name: 'fred', age: 48}]
export const orderBy = (props, orders, arr) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0),
  );

// EXAMPLES
// groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
// groupBy(['one', 'two', 'three'], 'length'); // [keys: [3, 5], byKey: {3: ['one', 'two'], 5: ['three']}]
export const groupBy = (arr, fn) => {
  if (!arr || !arr.length) return;

  const byKey = arr.map(typeof fn === 'function' ? fn : (val) => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || []).concat(arr[i]);
    return acc;
  }, {});
  const keys = Object.keys(byKey);

  const R = {
    keys,
    byKey,
  };
  return R;
};

/**
 * {} - true, [] - false
 */
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 *  깊은복사 JSON.parse(JSON.stringfy(obj)) 보다 성능 좋고, prototype 유지
 */
export const deepCopyObj = (obj) => {
  let copy = {};
  if (Array.isArray(obj)) {
    copy = obj.slice().map((v) => {
      return deepCopyObj(v);
    });
  } else if (typeof obj === 'object' && obj !== null) {
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = deepCopyObj(obj[attr]);
      }
    }
  } else {
    copy = obj;
  }
  return copy;
};

/**
 * @param input - 처리할 문자열
 * @param type - "front": 앞공백 "back": 뒷공백 "both": 양쪽공백, "all": 모든공백
 */
export const deleteSpacing = (input, type) => {
  let R;
  switch (type) {
    case 'front':
      R = input.replace(/^\s*/, '');
      break;
    case 'back':
      R = input.replace(/\s*$/, '');
      break;
    case 'both':
      R = input.replace(/(^\s*)|(\s*$)/g, '');
      break;
    case 'all':
      R = input.replace(/(\s*)/g, '');
      break;
    default:
      R = input.replace(/(\s*)/g, '');
      break;
  }
  return R;
};

export const getUniqueObjectArray = (array, key) => {
  if (!array) return false;

  return array.filter((item, i) => {
    return (
      array.findIndex((item2, j) => {
        return item[key] === item2[key];
      }) === i
    );
  });
};
