var wuzejimaya = function () {

  const TypedArray = [
    "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array",
    "Uint16Array", "Int32Array", "Uint32Array", "Float32Array",
    "Float64Array",
  ]

  function chunk(array, size = 1) {
    let res = []
    for (let i = 0; i < array.length;) {
      let tem = []
      for (let j = 0; j < size && i < array.length; j++) {
        tem.push(array[i++])
      }
      res.push(tem)
    }
    return res
  }

  function compact(array) {
    return array.filter(it => it)
  }

  function difference(array, ...values) {
    let diff = [].concat(...values)
    return array.filter(e => !diff.includes(e))
  }

  function differenceBy(array, ...values) {
    if (isArray(values[values.length - 1])) return difference(array, ...values)
    let iteratee = _iteratee(values.pop())
    let diffs = [].concat(...values)
    return array.filter(e => diffs.every(diff => iteratee(diff) != iteratee(e)))
  }

  function differenceWith(arr, values, comparator) {
    return arr.filter(e => values.every(value => !comparator(value, e)))
  }

  function drop(array, n = 1) {
    if (n <= 0) return array.slice(0)
    return array.slice(n)
  }

  function dropRight(array, n = 1) {
    return array.filter((_, idx) => idx < array.length - n)
  }
  
  function dropRightWhile(ary, predicate) {
    let i = ary.length - 1
    predicate = _iteratee(predicate)
    for (; i >= 0; i--) {
      if (!predicate(ary[i])) break
    }
    return ary.slice(0, i + 1)
  }

  function dropWhile(ary, predicate) {
    let i = 0
    predicate = _iteratee(predicate)
    for (; i < ary.length; i++) {
      if (!predicate(ary[i])) break
    }
    return ary.slice(i)
  }

  function fill(array, value, start = 0, end = array.length) {
    if (start < 0 && start >= - array.length) {
      start = start + array.length
    } else if (start < - array.length) {
      start = 0
    } else if (start >= array.length) {
      return array
    }
    if (end < 0 && end >= - array.length) {
      end = end + array.length
    } else if (end < - array.length) {
      return array
    } else if (end >= array.length) {
      end = array.length
    }
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }

  function findIndex(array, predicate, fromIndex = 0) {
    if (fromIndex < 0) return -1
    predicate = _iteratee(predicate)
    for (let i = fromIndex; i < array.length; i++) {
      if (predicate(array[i])) return i
    }
    return -1
  }

  function findLastIndex(array, predicate, fromIndex = array.length - 1) {
    predicate = _iteratee(predicate)
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(array[i])) return i
    }
    return -1
  }

  function flatten(array) {
    return flattenDepth(array)
  }

  function flattenDeep(array) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        let ary = flattenDeep(array[i])
        for (let j = 0; j < ary.length; j++) {
          res.push(ary[j])
        }
      } else {
        res.push(array[i])
      }
    }
    return res
  }

  function flattenDepth(array, depth = 1) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i]) && depth > 0) {
        let ary = flattenDepth(array[i], depth - 1)
        for (let j = 0; j < ary.length; j++) {
          res.push(ary[j])
        }
      } else {
        res.push(array[i])
      }
    }
    return res
  }

  function fromPairs(pairs) {
    let res = {}
    for (let i = 0; i < pairs.length; i++) {
      res[pairs[i][0]] = pairs[i][1]
    }
    return res
  }

  function head(array) {
    return array[0]
  }

  function indexOf(array, value, fromIndex = 0) {
    if (fromIndex < 0) fromIndex += array.length
    for (let i = fromIndex; i < array.length; i++) {
      if (array[i] === value) return i
    }
    return -1
  }

  function initial(array) {
    return array.slice(0, array.length - 1)
  }

  function intersection(...arrays) {
    return arrays[0].filter(e => arrays.every(array => array.some(it => it == e)))
  }

  function intersectionBy(...arrays) {
    let iteratee = _iteratee(arrays.pop())
    return arrays[0].filter(e => arrays.every(array => array.some(
      it => iteratee(it) == iteratee(e))))
  }

  function intersectionWith(...arrays) {
    let comparator = arrays[arrays.length - 1]
    arrays.pop()
    return arrays[0].filter(e => arrays.every(array => array.some(
        it => comparator(it, e))))
  }

  function join(array, separator = ',') {
    let res = ''
    for (let i = 0; i < array.length; i++) {
      res += array[i] + '' + separator
    }
    return res.slice(0, res.length - 1)
  }

  function last(array) {
    return array[array.length - 1]
  }

  function lastIndexOf(array, value, fromIndex = array.length - 1) {
    fromIndex = fromIndex > array.length - 1 ? array.length - 1 : fromIndex
    fromIndex = fromIndex < 0 ? fromIndex + array.length : fromIndex
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] === value) return i
    }
    return -1
  }

  function nth(array, n = 0) {
    return array[n > 0? n : n + array.length]
  }

  function pull(array, ...values) {
    return array.filter(it => !values.includes(it))
  }

  function pullAll(array, ...values) {
    return array.filter(it => !values[0].includes(it))
  }

  function pullAllBy(array, values, iteratee) {
    return array.filter(obj => values.every(value => value[iteratee] != obj[iteratee]))
  }

  function pullAllWith(array, values, comparator) {
    return array.filter(obj => values.every(value => !comparator(value, obj)))
  }

  function reverse(array) {
    let left = 0, right = array.length - 1
    while (left < right) {
      swap(array, left++, right--)
    }
    return array
  }

  function swap(array, i, j) {
    let tem = array[i]
    array[i] = array[j]
    array[j] = tem
  }

  function sortedIndex(array, value) {
    let left = 0, right = array.length - 1
    while (right != left) {
      let mid = (left + right) >> 1
      if (value > array[mid]) left = mid + 1
      else right = mid
    }
    return value > array[left] ? left + 1 : left
  }

  function sortedIndexBy(array, value, iteratee) {
    let left = 0, right = array.length - 1
    iteratee = _iteratee(iteratee)
    while (right != left) {
      let mid = (left + right) >> 1
      if (iteratee(value) > iteratee(array[mid])) left = mid + 1
      else right = mid
    }
    return value > array[left] ? left + 1 : left
  }

  function sortedIndexOf(array, value) {
    return sortedIndex(array, value)
  }

  function sortedLastIndex(array, value) {
    let left = 0, right = array.length - 1
    while (right != left) {
      let mid = (left + right) >> 1
      if (value >= array[mid]) left = mid + 1
      else right = mid
    }
    return value > array[left] ? left + 1 : left
  }

  function sortedLastIndexBy(array, value, iteratee) {
    let left = 0, right = array.length - 1
    iteratee = _iteratee(iteratee)
    while (right != left) {
      let mid = (left + right) >> 1
      if (iteratee(value) >= iteratee(array[mid])) left = mid + 1
      else right = mid
    }
    return value > array[left] ? left + 1 : left
  }

  function sortedLastIndexOf(array, value) {
    return sortedLastIndex(array, value) - 1
  }

  function sortedUniq(array) {
    let res = []
    array.forEach(e => {
      if (!res.includes(e)) res.push(e)
    })
    return res
  }

  function sortedUniqBy(array, iteratee) {
    let res = []
    array.forEach(e => {
      if (res.every(it => iteratee(e) != iteratee(it))) res.push(e)
    })
    return res
  }

  function tail(array) {
    return array.slice(1)
  }

  function take(array, n = 1) {
    return array.slice(0, n)
  }
  
  function takeRight(array, n = 1) {
    return array.slice(array.length - (n > array.length ? array.length : n))
  }

  function takeRightWhile(array, predicate) {
    let i = array.length - 1
    predicate = _iteratee(predicate)
    for (; i >= 0; i--) {
      if (!predicate(array[i])) break
    }
    return array.slice(i + 1)
  }

  function takeWhile(array, predicate) {
    let i = 0
    predicate = _iteratee(predicate)
    for (; i < array.length; i++) {
      if (!predicate(array[i])) break
    }
    return array.slice(0, i)
  }

  function union(...arrays) {
    return [...new Set([].concat(...arrays))]
  }

  function unionBy(...arrays) {
    let iteratee = _iteratee(arrays.pop())
    let array = [].concat(...arrays), res = []
    array.forEach(it => {
      if (res.every(e => iteratee(e) != iteratee(it))) res.push(it)
    })
    return res
  }

  function unionWith(...arrays) {
    let comparator = arrays[arrays.length - 1]
    arrays.pop()
    let array = [].concat(...arrays), res = []
    array.forEach(it => {
      if (res.every(e => !comparator(e, it))) res.push(it)
    })
    return res
  }

  function uniq(array) {
    let res = []
    array.forEach(it => {
      if (res.every(e => e != it)) res.push(it)
    })
    return res
  }

  function uniqBy(array, iteratee) {
    let res = []
    iteratee = _iteratee(iteratee)
    array.forEach(it => {
      if (res.every(e => iteratee(e) != iteratee(it))) res.push(it)
    })
    return res
  }

  function uniqWith(array, comparator) {
    let res = []
    array.forEach(it => {
      if (res.every(e => !comparator(e, it))) res.push(it)
    })
    return res
  }

  function unzip(array) {
    return array[0].map((_, idx) => array.map(it => it[idx]))
  }

  function unzipWith(array, iteratee) {
    return array[0].map((_, idx) => iteratee(...(array.map(it => it[idx]))))
  }

  function without(array, ...values) {
    return array.filter(it => !values.includes(it))
  }

  function xor(...arrays) {
    let map = new Map(), array = flatten(arrays)
    array.forEach((it) => {
        if (map.has(it)) {
            map.set(it, map.get(it) + 1)
        } else {
            map.set(it, 1)
        }
    });
    return array.filter(it => map.get(it) == 1)
  }

  function xorBy(...arrays) {
    let iteratee = _iteratee(arrays.pop())
    let map = new Map(), array = flatten(arrays)
    array.forEach((it) => {
        if (map.has(iteratee(it))) {
            map.set(iteratee(it), map.get(it) + 1)
        } else {
            map.set(iteratee(it), 1)
        }
    });
    return array.filter(it => map.get(iteratee(it)) == 1)
  }

  function xorWith(...arrays) {
    let comparator = arrays.pop(), objects = arrays[0], others = arrays[1]
    let array = flatten(arrays)
    return objects.filter(it => others.every(e => !comparator(e, it))).concat(others.filter(it => objects.every(e => !comparator(e, it))))
  }

  function zip(...arrays) {
    return arrays[0].map((_, idx) => arrays.map(it => it[idx]))
  }

  function zipObject(props = [], values = []) {
    let res = {}
    props.forEach((it, idx) => {
      res[it] = values[idx]
    })
    return res
  }

  function zipObjectDeep(props = [], values = []) {
    let res = {}
    props = props.map(it => toPath(it))
    for (let i = 0; i < props.length; i++) {
      let path = props[i], cur = res
      for (let j = 0; j < path.length; j++) {
        if (j === path.length - 1) {
          cur[path[j]] = values[i]
          break
        }
        if (cur[path[j]] === undefined) {
          if (/\d/.test(path[j + 1])) cur[path[j]] = []
          else cur[path[j]] = {}
        }
        cur = cur[path[j]]
      }
    }
    return res
  }

  function zipWith(...arrays) {
    let iteratee = arrays.pop()
    return zip(...arrays).map(it => iteratee(...it))
  }

  function countBy(...collection) {
    let iteratee = _iteratee(collection.pop())
    let map = {}, array = flatten(collection)
    array.forEach(it => {
      if (map.hasOwnProperty(iteratee(it))) map[iteratee(it)]++
      else map[iteratee(it)] = 1
    })
    return map
  }
  
  function every(collection, predicate) {
    predicate = _iteratee(predicate)
    for (let i = 0; i < collection.length; i++) {
      if (!predicate(collection[i])) return false
    }
    return true
  }

  function filter(collection, predicate) {
    let res = []
    predicate = _iteratee(predicate)
    for (let i = 0; i < collection.length; i++) {
      if (predicate(collection[i])) res.push(collection[i])
    }
    return res
  }

  function find(collection, predicate, fromIndex = 0) {
    predicate = _iteratee(predicate)
    for (let i = fromIndex; i < collection.length; i++) {
      if (predicate(collection[i])) return collection[i]
    }
  }

  function findLast(collection, predicate, fromIndex = collection.length - 1) {
    predicate = _iteratee(predicate)
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(collection[i])) return collection[i]
    }
  }

  function flatMap(collection, iteratee) {
    return flatMapDepth(collection, iteratee)
  }

  function flatMapDeep(collection, iteratee) {
    return flatMapDepth(collection, iteratee, Infinity)
  }

  function flatMapDepth(collection, iteratee, depth = 1) {
    let array = collection.map(it => iteratee(it))
    return flattenDepth(array, depth)
  }

  function forEach(collection, iteratee) {
    for (let key in collection) {
      iteratee(collection[key], key, collection)
    }
    return collection
  }

  function forEachRight(collection, iteratee) {
    for (let i = collection.length - 1; i >= 0; i--) {
      iteratee(collection[i], i)
    }
    return collection
  }

  function groupBy(collection, iteratee) {
    let map = {}
    iteratee = _iteratee(iteratee)
    for (let i = 0; i < collection.length; i++) {
      if (iteratee(collection[i]) in map) {
        map[iteratee(collection[i])].push(collection[i])
      } else {
        map[iteratee(collection[i])] = [collection[i]]
      }
    }
    return map
  }

  function includes(collection, value, fromIndex = 0) {
    fromIndex = fromIndex >= 0 ? fromIndex : collection.length + fromIndex
    if (_isObject(collection)) {
      for (let key in collection) {
        if (collection[key] === value) return true
      }
    } else if (isArray(collection)) {
      for (let i = fromIndex; i < collection.length; i++) {
        if (collection[i] === value) return true
      }
    } else if (isString(collection)) {
      if (collection.includes(value)) return true
    }
    return false
  }

  function invokeMap(collection, path, ...args) {
    if (isString(path)) 
      return collection.map(it => it[path](...args))
    return collection.map(it => path.call(it, ...args))
  }

  function keyBy(collection, iteratee) {
    let map = {}
    iteratee = _iteratee(iteratee)
    collection.forEach(it => {
      map[iteratee(it)] = it
    })
    return map
  }

  function map(collection, iteratee) {
    let res = []
    iteratee = _iteratee(iteratee)
    if (isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        res.push(iteratee(collection[i], i, collection))
      }
    } else if (_isObject(collection)) {
      for (let key in collection) {
        res.push(iteratee(collection[key], key, collection))
      }
    }
    return res
  }

  function orderBy(collection, iteratees, orders) {
    iteratees = iteratees.map(iteratee => _iteratee(iteratee))
    let copy = collection.slice()
    copy.sort((obj1, obj2) => {
      for (let key in iteratees) {
        let compare = _compare(obj1, obj2, iteratees[key], orders[key])
        if (compare !== 0) return compare
      }
      return 0
    })
    return copy
  }

  function _compare(obj1, obj2, iteratee, order) {
    if (order === 'asc') {
      if (iteratee(obj1) < iteratee(obj2)) return -1
      else if (iteratee(obj1) > iteratee(obj2)) return 1
      else return 0
    } else if (order === 'desc') {
      if (iteratee(obj1) > iteratee(obj2)) return -1
      else if (iteratee(obj1) < iteratee(obj2)) return 1
      else return 0
    }
  }

  function partition(collection, predicate) {
    let res = [[], []]
    predicate = _iteratee(predicate)
    collection.forEach(it => {
      if (predicate(it)) res[0].push(it)
      else res[1].push(it)
    })
    return res
  }

  function reduce(collection, iteratee, accumulator) {
    let result = accumulator
    if (isArray(collection)) {
      let start = 0
      if (accumulator === undefined) {
        result = collection[0]
        start = 1
      }
      for (let i = start; i < collection.length; i++) {
        result = iteratee(result, collection[i], i, collection)
      }
      return result
    } else {
      let keys = Object.keys(collection)
      if (accumulator === undefined) {
        result = collection[keys.shift()]     
      }
      for (let key of keys) {
        result = iteratee(result, collection[key], key, collection)
      }
      return result
    }
  }

  function reduceRight(collection, iteratee, accumulator) {
    let result = accumulator
    if (isArray(collection)) {
      let start = collection.length - 1
      if (accumulator === undefined) {
        result = collection[collection.length - 1]
        start = collection.length - 2
      }
      for (let i = start; i >= 0; i--) {
        result = iteratee(result, collection[i], i, collection)
      }
      return result
    } else {
      let keys = Object.keys(collection)
      if (accumulator === undefined) {
        result = collection[keys.pop()]     
      }
      for (let i = keys.length - 1; i >= 0; i++) {
        result = iteratee(result, collection[keys[i]], keys[i], collection)
      }
      return result
    }
  }

  function reject(collection, predicate) {
    let res = []
    predicate = _iteratee(predicate)
    for (let i = 0; i < collection.length; i++) {
      if (!predicate(collection[i])) res.push(collection[i])
    }
    return res
  }

  function sample(collection) {
    return sampleSize(collection)[0]
  }

  function sampleSize(collection, n = 1) {
    let res = []
    n = n > collection.length? collection.length : n
    for (let i = 0; i < n;) {
      let index = (Math.random() * collection.length) | 0;
      if (!res.includes(collection[index])) {
        res.push(collection[index])
        i++
      }
    }
    return res
  }

  function shuffle(collection) {
    return sampleSize(collection, collection.length)
  }

  function size(collection) {
    if (isString(collection)) return collection.length
    else return Object.keys(collection).length
  }

  function some(collection, predicate) {
    predicate = _iteratee(predicate)
    for (let i = 0; i < collection.length; i++) {
      if (predicate(collection[i])) return true
    }
    return false
  }

  function sortBy(collection, iteratees) {
    let orders = Array(iteratees.length).fill('asc')
    return orderBy(collection, iteratees, orders)
  }

  function after(n, func) {
    let c = 0
    return function (...args) {
      c++
      if (c > n) {
        return func.call(this, ...args)
      }
    }
  }

  function ary(func, n = func.length) {
    return function (...args) {
        return func(args.slice(0, n))
    }
  }
  
  function before(n, func) {
    let c = 0, result
    return function (...args) {
      if (c < n) {
        return result = func.bind(this, ...args)
        c++
      } else {
        return result
      }
    }
  }

  function bind(func, thisArg, ...partials) {
    return function (...args) {
      let copy = partials.slice()
      for (let i = 0; i < copy.length; i++) {
        if (copy[i] === window) {
          copy[i] = args.shift()
        }
      }
      return func.call(thisArg, ...copy, ...args)
    }
  }

  function curry(func, arity = func.length) {
    return function (...args) {
      if (args.length < arity) {
        return curry(func.bind(null, ...args), arity - args.length)
      } else {
        return func(...args)
      }
    }
  }

  function defer(func, ...args) {
    let timeoutID = setTimeout(func, 1, ...args)
    return timeoutID - 1
  }

  function delay(func, wait, ...args) {
    var timeoutID = setTimeout(func, wait, ...args)
    return timeoutID - 1
  }

  function flip(func) {
    return function (...args) {
      return func(...args.reverse())
    }
  }

  function negate(predicate) {
    return function (...args) {
      return !predicate(...args)
    }
  }

  function castArray(value) {
    if (isArray(value)) return value
    if (arguments.length == 0) return []
    return [value]
  }

  function conformsTo(object, source) {
    for (key in source) {
        let predicate = source[key];
        if (!predicate(object[key])) {
            return false;
        }
    }
    return true;
  }

  function eq(value, other) {
    if (Number.isNaN(value) && Number.isNaN(other)) return true
    return value === other
  }

  function gt(value, other) {
    return value > other
  }

  function gte(value, other) {
    return value >= other
  }

  function isArguments(values) {
    return getType(values) === "[object Arguments]"
  }

  function isArray(value) {
    return getType(value) === "[object Array]";
  }

  function isArrayBuffer(value) {
    return getType(value) == "[object ArrayBuffer]";
  }

  function isArrayLike(value) {
    if (typeof value == "function") return false;
    return value.length >= 0 && value.length < Number.MAX_SAFE_INTEGER;
  }

  function isArrayLikeObject(value) {
    return isArrayLike(value) && typeof value === "object";
  }

  function isBoolean(value) {
    return getType(value) === '[object Boolean]';
  }

  function isDate(value) {
    return value instanceof Date
  }

  function isElement(value) {
    let regexp = /^\[object HTML\w+\]$/;
    return regexp.test(getType(value));
  }

  function isEmpty(value) {
    if (isMap(value) || isSet(value)) return value.size === 0
    if (isArray(value) || isString(value)) return value.lenght === 0
    if (_isObject(value)) return Object.keys(value).length === 0
    return true
  }

  function isEqual(value, other) {
    if (value === other) return true
    if (value !== value && other !== other) return true
    let typeValue = getType(value), typeOther = getType(other)
    if (typeValue != typeOther) return false 
    if (typeof value != 'object') return value === other
    if (isArray(value)) {
      if (value.length != other.length) {
        return false
      } else {
        for (let i = 0; i < value.length; i++) {
          if (!isEqual(value[i], other[i])){
            return false
          }
        }
        return true
      }
    } else {
      let keysValue = Object.keys(value), keysOther = Object.keys(other)
      let keys = Array.from(new Set(keysValue.concat(keysOther)))//value和other的属性合并去重，避免重复对比
        if (keys.length != keysValue.length) {
          return false
        } else {
          for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            if (!(isEqual(value[key], other[key]))) {
              return false
            }
          }
          return true
        }
    }
  }

  function isEqualWith(value, other, customizer) {
    if (customizer === undefined) {
      return isEqual(value, other)
    } else {
      for (let i = 0; i < value.length; i++) {
        if (customizer(value[i], other[i]) === false) {
          return false
        }
      }
      return true
    }
  }

  function isError(value) {
    return getType(value) === "[object Error]"
  }

  function isFinite(value) {
    if (!isNumber(value)) return false
    return value !== Infinity && value !== -Infinity
  }

  function isFunction(value) {
    if (arguments.length === 0) return true
    return getType(value) === '[object Function]'
  }

  function isInteger(value) {
    return isNumber(value) && Number.parseInt(value) === value
  }

  function isLength(value) {
    return isInteger(value) && value >= 0
  }

  function isMap(value) {
    return getType(value) === "[object Map]"
  }

  function isMatch(object, source) {
    for (let key in source) {
      if (_isObject(source[key])) {
        return isMatch(object[key], source[key])
      } else {
        if (source[key] !== object[key]) {
          return false
        }
      }
    }
    return true
  }

  function isMatchWith(object, source, customizer) {
    for (let key in source) {
      if (_isObject(source[key])) {
        return isMatchWith(object[key], source[key], customizer)
      } else {
        if (customizer(source[key], object[key]) === false) {
          return false
        }
      }
    }
    return true
  }

  function isNaN(value) {
    if (typeof value === "object") value = value.valueOf()
    return value !== value
  }

  function isNative(value) {
    return /\[native code\]/.test('' + value)
  }

  function isNil(value) {
    return value == null
  }

  function isNull(value) {
    return value === null
  }

  function isNumber(value) {
    return getType(value) === "[object Number]"
  }

  function isObject(value) {
    return value !== null && typeof value === "object" || typeof value === "function"
  }

  function isObjectLike(value) {
    return value !== null && typeof value === "object"
  }

  function isPlainObject(value) {
    let proto = Object.getPrototypeOf(value)
    return proto === Object.prototype || proto === null
  }

  function isRegExp(value) {
    return getType(value) === "[object RegExp]"
  }

  function isSafeInteger(value) {
    return isNumber(value)
      && Math.abs(value) <= Number.MAX_SAFE_INTEGER
      && Math.abs(value) > Number.MIN_VALUE
  }

  function isSet(value) {
    return getType(value) === "[object Set]"
  }

  function isString(value) {
    return getType(value) === '[object String]'
  }

  function isSymbol(value) {
    return getType(value) == "[object Symbol]"
  }

  function isTypedArray(value) {
    let match = getType(value).match(/\b\w+(?=])/)
    return TypedArray.includes(match[0])
  }

  function isUndefined(value) {
    return value === undefined
  }

  function isWeakMap(val) {
    return getType(val) == "[object WeakMap]";
  }

  function isWeakSet(val) {
    return getType(val) == "[object WeakSet]";
  }

  function lt(value, other) {
    return value < other
  }
  
  function lte(value, other) {
    return value <= other
  }

  function toArray(value) {
    let res = []
    for (let key in value) {
      res.push(value[key])
    }
    return res
  }

  function toFinite(value) {
    value = Number(value)
    if (value === Infinity) return Number.MAX_VALUE
    if (value === -Infinity) return Number.MIN_VALUE
    return value
  }

  function toInteger(value) {
    return Math.floor(toFinite(value))
  }

  function toLength(value) {
    let integer = 2 ** 32 - 1
    if (value >= integer) return integer
    if (value <= -integer) return -integer
    return Math.floor(Number(value))
  }

  function toNumber(value) {
    return Number(value)
  }

  function assign(object, ...sources) {
    sources.forEach(it => {
        for (let key of Object.keys(it)) {
            object[key] = it[key]
        }
    })
    return object
  }

  function toSafeInteger(value) {
    value = toInteger(value)
    if (value > Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER
    if (value < Number.MIN_SAFE_INTEGER) return Number.MIN_SAFE_INTEGER
    return value
  }

  function add(augend, addend) {
    return augend + addend
  }

  function ceil(number, precision = 0) {
    return Math.ceil(number * (10 ** precision)) / (10 ** precision)
  }

  function divide(dividend, divisor) {
    return dividend / divisor
  }

  function floor(number, precision = 0) {
    return Math.floor(number * (10 ** precision)) / (10 ** precision)
  } 

  function max(array) {
    if (!array.length) return undefined
    return array.reduce((res, it) => Math.max(res, it), -Infinity)
  }

  function maxBy(array, iteratee) {
    let max = -Infinity, res
    iteratee = _iteratee(iteratee)
    for (let i = 0; i < array.length; i++) {
      if (max < iteratee(array[i])) {
        res = array[i]
        max = iteratee(array[i])
      }
    }
    return res
  }

  function mean(array) {
    return array.reduce((result, it, idx) => (result * idx + it) / (idx + 1))
  }

  function meanBy(array, iteratee) {
    iteratee = _iteratee(iteratee)
    return array.reduce((result, it, idx) => (result * idx + iteratee(it)) / (idx + 1), 0)
  }

  function min(array) {
    if (!array.length) return undefined
    return array.reduce((res, it) => Math.min(res, it), Infinity)
  }

  function minBy(array, iteratee) {
    let min = Infinity, res
    iteratee = _iteratee(iteratee)
    for (let i = 0; i < array.length; i++) {
      if (min > iteratee(array[i])) {
        res = array[i]
        min = iteratee(array[i])
      }
    }
    return res
  }

  function multiply(multiplier, multiplicand) {
    return multiplier * multiplicand
  }

  function round(number, precision = 0) {
    return Math.round(number * (10 ** precision)) / (10 ** precision)
  }

  function subtract(minuend, subtrahend) {
    return minuend - subtrahend
  }

  function sum(array) {
    return array.reduce((sum, it) => sum + it, 0)
  }

  function sumBy(array, iteratee) {
    iteratee = _iteratee(iteratee)
    return array.reduce((sum, it) => sum + iteratee(it), 0)
  }

  function clamp(number, lower, upper) {
    if (number < lower) return lower
    if (number > upper) return upper
    return number
  }

  function inRange(number, start, end = 0) {
    if (start > end) [start, end] = [end, start]
    return number >= start && number < end
  }

  function random(upper = 1, lower = 0, floating) {
    if (lower > upper) [lower, upper] = [upper, lower]
    if (isFloat(lower) || isFloat(upper) || arguments[arguments.length - 1] === true) {
      return lower + Math.random() * (upper - lower)
    } else {
      return lower + (Math.random() * (upper - lower) | 0)
    }
  }

  function isFloat(value) {
    return isNumber(value) && Number.parseInt(value) !== value
  }

  function assignIn(object, ...sources) {
    sources.forEach(obj => {
      for (let key in obj) {
          object[key] = obj[key]
      }
    })
    return object
  }

  function at(object, paths) {
    let res = []
    paths = paths.map(path => toPath(path))
    paths.forEach(path => {
      res.push(path.reduce((result, key) => result[key], object)) 
    })
    return res
  }

  function defaults(object, ...sources) {
    sources.forEach(obj => {
      for (let key in obj) {
        if (!object[key]) object[key] = obj[key]
      }
    })
    return object
  }

  function defaultsDeep(object, ...sources) {
    sources.forEach(obj => {
      for (let key in obj) {
        if (!object[key]) {
          object[key] = obj[key]
        } else {
          if (isObject(object[key]) && isObject(obj[key])) {
            defaultsDeep(object[key], obj[key])
          }
        }
      }
    })
    return object
  }

  function findKey(object, predicate) {
    predicate = _iteratee(predicate)
    for (let key in object) {
      if (predicate(object[key])) {
        return key
      }
    }
  }

  function findLastKey(object, predicate) {
    predicate = _iteratee(predicate)
    for (let key of Object.keys(object).reverse()) {
        if (predicate(object[key])) return key
    }
  }

  function forIn(object, iteratee) {
    for (let key in object) {
      if (iteratee(object[key], key, object) === false) break
    }
    return object
  }

  function forInRight(object, iteratee) {
    let tem = []
    for (let key in object) {
      tem.push(key)
    }
    tem.reverse()
    for (let key of tem) {
      if (iteratee(object[key], key, object) === false) break
    }
    return object
  }

  function forOwn(object, iteratee) {
    let ownKeys = Object.keys(object)
    for (let key of ownKeys) {
      if (iteratee(object[key], key, object) === false) break
    }
    return object
  }
  
  function forOwnRight(object, iteratee) {
    let ownKeys = Object.keys(object)
    ownKeys.reverse()
    for (let key of ownKeys) {
      if (iteratee(object[key], key, object) === false) break
    }
    return object
  }

  function functions(object) {
    let keys = Object.keys(object)
    let res = []
    for (let key of keys) {
      if (isFunction(object[key]))
        res.push(key)
    }
    return res
  }

  function functionsIn(object) {
    let res = []
    for (let key in object) {
      if (isFunction(object[key]))
        res.push(key)
    }
    return res
  }

  function get(object, path, defaultValue) {
    if (isString(path)) path = toPath(path)
    for (let key of path) {
      if (key in Object(object)) {
        object = object[key]
      } else {
        return defaultValue
      }
    }
    return object
  }

  function has(object, path) {
    if (isString(path)) path = toPath(path)
    for (let item of path) {
      if (!object.hasOwnProperty(item)) return false
      object = object[item]
    }
    return true
  }

  function hasIn(object, path) {
    if (isString(path)) path = toPath(path)
    for (let item of path) {
      if (item in object) object = object[item]
      else return false
    }
    return true
  }

  function invert(object) {
    let res = {}
    let keys = Object.keys(object)
    for (let key of keys) {
      res[object[key]] = key
    }
    return res
  }

  function invertBy(object, iteratee = it => it) {
    let res = {}
    let keys = Object.keys(object)
    for (let key of keys) {
      let value = iteratee(object[key])
      if (res[value]) res[value].push(key)
      else res[value] = [key]
    }
    return res
  }

  function invoke(object, path, ...args) {
    if (isString(path)) path = toPath(path)
    let f = path.pop()
    return get(object, path)[f](...args)
  }

  function keys(object) {
    return Object.keys(object)
  }

  function keysIn(object) {
    let res = []
    for (let key in object) {
      res.push(key)
    }
    return res
  }

  function mapKeys(object, iteratee = it => it) {
    let res = {}
    let keys = Object.keys(object)
    for (let key of keys) {
      res[iteratee(object[key], key, object)] = object[key]
    }
    return res
  }

  function mapValues(object, iteratee) {
    iteratee = _iteratee(iteratee)
    let res = {}
    let keys = Object.keys(object)
    for (let key of keys) {
      res[key] = iteratee(object[key], key, object)
    }
    return res
  }

  function merge(object, ...sources) {
    sources.forEach(other => {
      for (let key in other) {
        if (typeof other[key] === 'object') {
          if (key in object) merge(object[key], other[key])
          else object[key] = other[key]
        } else if (other[key] != undefined){
          object[key] = other[key]
        }
      }
    })
    return object
  }

  function mergeWith(object, ...sources) {
    if (!isFunction(sources[sources.length - 1])) return merge(object, ...source)
    let customizer = sources.pop()
    sources.forEach((it) => {
      for (let key in it) {
        if (it[key] == undefined) continue
        object[key] = customizer(object[key], it[key], key, object, it, [])
      }
    })
    return object
  }

  function omit(object, ...paths) {
    paths = flattenDeep(paths)
    let res = {}
    for (let key in object) {
        if (!paths.includes(key)) {
            res[key] = object[key]
        }
    }
    return res
  }

  function omitBy(object, predicate) {
    let res = {}
    for (let key in object) {
      if (!predicate(object[key], key))
        res[key] = object[key]
    }
    return res
  }

  function pick(object, ...paths) {
    paths = flattenDeep(paths)
    let res = {}
    for (let key of paths)
      if (object[key]) res[key] = object[key]
    return res
  }

  function pickBy(object, predicate) {
    let res = {}
    for (let key in object)
      if (predicate(object[key])) res[key] = object[key]
    return res
  }

  function result(object, path, defaultValue) {
    let value = get(object, path, defaultValue)
    if (isFunction(value)) return value()
    return value
  }

  function set(object, path, value) {
    if (isString(path)) path = toPath(path)
    let cur = object
    path.forEach((key, idx) => {
      if (idx == path.length - 1) cur[key] = value
      if (cur[key]) {
        cur = cur[key]
      } else {
        if (/\d+/.test(path[idx + 1])) cur[key] = []
        else cur[key] = {}
        cur = cur[key]
      }
    })
    return object
  }

  function setWith(object, path, value, customizer) {
    if (customizer === undefined) return set(object, path, value)
    if (isString(path)) path = toPath(path)
    let cur = object
    path.forEach((key, idx) => {
      if (idx == path.length - 1) cur[key] = value
      cur[key] = customizer(cur[key], key, cur)
      cur = cur[key]
    })
    return object
  }

  function toPairs(object) {
    if (isSet(object) || isMap(object)) return object.entries()
    return keys(object).map(key => [key, object[key]])
  }

  function toPairsIn(object) {
    if (isSet(object) || isMap(object)) return object.entries()
    return keysIn(object).map(key => [key, object[key]])
  }

  function transform(object, iteratee, accumulator) {
    let keys = Object.keys(object)
    if (accumulator === undefined && isArray(object)) accumulator = [] 
    if (accumulator === undefined && isObject(object)) accumulator = {} 
    for (let key of keys) {
      if (iteratee(accumulator, object[key], key, object) === false) break
    }
    return accumulator
  }

  function unset(object, path) {
    if (isString(path)) path = toPath(path)
    let deleteKey = path.pop(), cur = object
    for (let i = 0; i < path.length; i++) {
      if (!cur[path[i]]) return false
      cur = cur[path[i]]
    }
    if (cur[deleteKey]) {
      delete cur[deleteKey]
      return true
    }
    return false
  }

  function update(object, path, updater) {
    if (isString(path)) path = toPath(path)
    let cur = object
    try {
      path.forEach((key, idx) => {
        if (idx == path.length - 1) {
          cur[key] = updater(cur[key])
          throw new Error("")
        } 
        if (cur[key]) {
          cur = cur[key]
        } else {
          if (/\d+/.test(path[idx + 1])) cur[key] = []
          else cur[key] = {}
          cur = cur[key]
        }
      })
    } finally {
      return object
    }
  }

  function updateWith(object, path, updater, customizer) {
    if (customizer === undefined) return update(object, path, updater)
    if (isString(path)) path = toPath(path)
    let cur = object
    path.forEach((key, idx) => {
      if (idx == path.length - 1) cur[key] = updater() 
      cur[key] = customizer(cur[key], key, object)
      cur = cur[key]
    })
    return object
  }

  function values(object) {
    return Object.keys(object).map(key => object[key])
  }
  
  function valuesIn(object) {
    return keysIn(object).map(key => object[key])
  }

  function camelCase(string = '') {
    return string.toLowerCase()
      .replace(/(?<=( |-|_))[a-z]/g, str => str.toUpperCase())
      .replace(/[ \-_]+/g, '')
      .replace(/^\w/, str => str.toLowerCase())
  }

  function capitalize(string = '') {
    return string.toLowerCase()
        .replace(/^\w/, str => str.toUpperCase())
  }

  function endsWith(string = '', target, position = string.length) {
    return string.slice(position - target.length, position) === target
  }

  function toPath(value) {
    return value.match(/\w+/g)
  }

  function matches(source) {
    return bind(isMatch, null, window, source)
  }

  function matchesProperty(array) {
    return obj => obj[array[0]] == array[1]
  }

  function property(path) {
    return bind(get, null, window, path, undefined)
  }

  function _isObject(predicate) {
    return getType(predicate) === '[object Object]'
  }

  function _iteratee(predicate) {
    if (isFunction(predicate)) {
      return predicate
    } else if (_isObject(predicate)) {
      return matches(predicate)
    } else if (isArray(predicate)) {
      return matchesProperty(predicate)
    } else if (isString(predicate)) {
      return property(predicate)
    }
  }

  function getType(val) {
    return Object.prototype.toString.call(val)
  }
  
  return {
    chunk,
    compact,
    difference,
    differenceBy,
    differenceWith,
    drop,
    dropRight,
    dropRightWhile,
    dropWhile,
    fill,
    findIndex,
    findLastIndex,
    flatten,
    flattenDeep,
    flattenDepth,
    fromPairs,
    head,
    indexOf,
    initial,
    intersection,
    intersectionBy,
    intersectionWith,
    join,
    last,
    lastIndexOf,
    nth,
    pull,
    pullAll,
    pullAllBy,
    pullAllWith,
    reverse,
    sortedIndex,
    sortedIndexBy,
    sortedIndexOf,
    sortedLastIndex,
    sortedLastIndexBy,
    sortedLastIndexOf,
    sortedUniq,
    sortedUniqBy,
    tail,
    take,
    takeRight,
    takeRightWhile,
    takeWhile,
    union,
    unionBy,
    unionWith,
    uniq,
    uniqBy,
    uniqWith,
    unzip,
    unzipWith,
    without,
    xor,
    xorBy,
    xorWith,
    zip,
    zipObject,
    zipObjectDeep,
    zipWith,
    countBy,
    every,
    filter,
    find,
    findLast,
    flatMap,
    flatMapDeep,
    flatMapDepth,
    forEach,
    forEachRight,
    groupBy,
    includes,
    invokeMap,
    keyBy,
    map,
    orderBy,
    partition,
    reduce,
    reduceRight,
    reject,
    sample,
    sampleSize,
    shuffle,
    size,
    some,
    sortBy,
    defer,
    delay,
    castArray,
    conformsTo,
    eq,
    gt,
    gte,
    isArguments,
    isArray,
    isArrayBuffer,
    isArrayLike,
    isArrayLikeObject,
    isBoolean,
    isDate,
    isElement,
    isEmpty,
    isEqual,
    isEqualWith,
    isError,
    isFinite,
    isFunction,
    isInteger,
    isLength,
    isMap,
    isMatch,
    isMatchWith,
    isNaN,
    isNative,
    isNil,
    isNull,
    isNumber,
    isObject,
    isObjectLike,
    isPlainObject,
    isRegExp,
    isSafeInteger,
    isSet,
    isString,
    isSymbol,
    isTypedArray,
    isUndefined,
    isWeakMap,
    isWeakSet,
    lt,
    lte,
    toArray,
    toFinite,
    toInteger,
    toLength,
    toNumber,
    assign,
    at,
    toSafeInteger,
    add,
    ceil,
    divide,
    floor,
    max,
    maxBy,
    mean,
    meanBy,
    min,
    minBy,
    multiply,
    round,
    subtract,
    sum,
    sumBy,
    clamp,
    inRange,
    random,
    assignIn,
    defaults,
    defaultsDeep,
    findKey,
    findLastKey,
    forIn,
    forInRight,
    forOwn,
    forOwnRight,
    functions,
    functionsIn,
    get,
    has,
    hasIn,
    invert,
    invertBy,
    invoke,
    keys,
    keysIn,
    mapKeys,
    mapValues,
    merge,
    mergeWith,
    omit,
    omitBy,
    pick,
    pickBy,
    result,
    set,
    setWith,
    toPairs,
    toPairsIn,
    transform,
    unset,
    update,
    updateWith,
    values,
    valuesIn,
    camelCase,
    capitalize,
    endsWith
  }
}()