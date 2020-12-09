var wuzejimaya = function () {
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
    let res = []
    for (let i = 0; i < array.length; i++) {
      if (array[i] !== false && array[i] !== null && array[i] !== 0 &&
        array[i] !== "" && array[i] !== undefined && array[i] === array[i]) {
        res.push(array[i])
      }
    }
    return res
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
  function drop(array, n = 1) {
    if (n <= 0) return array.slice(0)
    return array.slice(n)
  }
  function dropRight(array, n = 1) {
    let res = [], right
    if (n < 0) {
      right = array.length
    } else if (n > array.length) {
      right = 0
    } else {
      right = array.length - n
    }
    for (let i = 0; i < right; i++) {
      res.push(array[i])
    }
    return res
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
    if (typeof predicate == 'function') {
      for (let i = fromIndex; i < array.length; i++) {
        if (predicate(array[i])) return i
      }
    } else if (Array.isArray(predicate)) {
      for (let i = fromIndex; i < array.length; i++) {
        if (array[i][predicate[0]] == predicate[1]) return i
      }
    } else if (typeof predicate == 'object') {
      for (let i = fromIndex; i < array.length; i++) {
        let flag = true
        for (let key in predicate) {
          if (predicate[key] != array[i][key]) flag = false
        }
        if (flag) return i
      }
    } else if (typeof predicate == 'string') {
      for (let i = fromIndex; i < array.length; i++) {
        if (array[i][predicate]) return i
      }
    }
    return -1
  }
  function findLastIndex(array, predicate, fromIndex = array.length - 1) {
    if (typeof predicate == 'function') {
      for (let i = fromIndex; i >= 0; i--) {
        if (predicate(array[i])) return i
      }
    } else if (Array.isArray(predicate)) {
      for (let i = fromIndex; i >= 0; i--) {
        if (array[i][predicate[0]] == predicate[1]) return i
      }
    } else if (typeof predicate == 'object') {
      for (let i = fromIndex; i >= 0; i--) {
        let flag = true
        for (let key in predicate) {
          if (predicate[key] != array[i][key]) flag = false
        }
        if (flag) return i
      }
    } else if (typeof predicate == 'string') {
      for (let i = fromIndex; i >= 0; i--) {
        if (array[i][predicate]) return i
      }
    }
    return -1
  }
  function flatten(array) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        for (let j = 0; j < array[i].length; j++) {
          res.push(array[i][j])
        }
      } else {
        res.push(array[i])
      }
    }
    return res
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
  function every(collection, predicate) {
    if (typeof predicate == 'function') {
      for (let i = 0; i < collection.length; i++) {
        if (!predicate(collection[i])) return false
      }
    } else if (Array.isArray(predicate)) {
      for (let i = 0; i < collection.length; i++) {
        if (collection[i][predicate[0]] != predicate[1]) return false
      }
    } else if (typeof predicate == 'object') {
      for (let i = 0; i < collection.length; i++) {
        for (let key in collection[i]) {
          if (predicate[key] != collection[i][key]) return false
        }
      }
    } else if (typeof predicate == 'string') {
      for (let i = 0; i < collection.length; i++) {
        if (!collection[i][predicate]) return false
      }
    }
    return true
  }
  function filter(collection, predicate) {
    let res = []
    if (typeof predicate == 'function') {
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) res.push(collection[i])
      }
    } else if (Array.isArray(predicate)) {
      for (let i = 0; i < collection.length; i++) {
        if (collection[i][predicate[0]] == predicate[1]) res.push(collection[i])
      }
    } else if (typeof predicate == 'object') {
      for (let i = 0; i < collection.length; i++) {
        let flag = true
        for (let key in predicate) {
          if (predicate[key] != collection[i][key]) flag = false
        }
        if (flag) res.push(collection[i])
      }
    } else if (typeof predicate == 'string') {
      for (let i = 0; i < collection.length; i++) {
        if (collection[i][predicate]) res.push(collection[i])
      }
    }
    return res
  }
  function find(collection, predicate, fromIndex = 0) {
    if (typeof predicate == 'function') {
      for (let i = fromIndex; i < collection.length; i++) {
        if (predicate(collection[i])) return collection[i]
      }
    } else if (Array.isArray(predicate)) {
      for (let i = fromIndex; i < collection.length; i++) {
        if (collection[i][predicate[0]] == predicate[1]) return collection[i]
      }
    } else if (typeof predicate == 'object') {
      for (let i = fromIndex; i < collection.length; i++) {
        let flag = true
        for (let key in predicate) {
          if (predicate[key] != collection[i][key]) flag = false
        }
        if (flag) return collection[i]
      }
    } else if (typeof predicate == 'string') {
      for (let i = fromIndex; i < collection.length; i++) {
        if (collection[i][predicate]) return collection[i]
      }
    }
  }
  function toArray(value) {
    let res = []
    if (typeof (value) == 'string' || Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        res.push(value[i])
      }
    } else if (typeof (value) == 'object') {
      for (let key in value) {
        res.push(value[key])
      }
    } else {
      return res
    }
    return res
  }
  function max(array) {
    if (array.length == 0|| !Array.isArray(array)) return undefined
    let max = -Infinity
    for (let i = 0; i < array.length; i++) {
      max = max < array[i] ? array[i] : max
    }
    return max
  }
  function maxBy(array, iteratee) {
    let max = -Infinity, res
    if (typeof (iteratee) == 'function') {
      for (let i = 0; i < array.length; i++) {
        if (max < iteratee(array[i])) {
          res = array[i]
          max = iteratee(array[i])
        }
      }
    } else {
      for (let i = 0; i < array.length; i++) {
        if (max < array[i][iteratee]) {
          res = array[i]
          max = array[i][iteratee]
        }
      }
    }
    return res
  }
  function min(array) {
    if (array.length == 0|| !Array.isArray(array)) return undefined
    let min = Infinity
    for (let i = 0; i < array.length; i++) {
      min = min > array[i] ? array[i] : min
    }
    return min
  }
  function minBy(array, iteratee) {
    let min = Infinity, res
    if (typeof (iteratee) == 'function') {
      for (let i = 0; i < array.length; i++) {
        if (min > iteratee(array[i])) {
          res = array[i]
          min = iteratee(array[i])
        }
      }
    } else {
      for (let i = 0; i < array.length; i++) {
        if (min > array[i][iteratee]) {
          res = array[i]
          min = array[i][iteratee]
        }
      }
    }
    return res
  }
  function sum(array) {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
      sum += array[i]
    }
    return sum
  }
  function sumBy(array, iteratee) {
    let sum = 0
    if (typeof (iteratee) == 'function') {
      for (let i = 0; i < array.length; i++) {
        sum += iteratee(array[i])
      }
    } else {
      for (let i = 0; i < array.length; i++) {
        sum += array[i][iteratee]
      }
    }
    return sum
  }
  return {
    chunk,
    compact,
    join,
    last,
    lastIndexOf,
    drop,
    dropRight,
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
    reverse,
    sortedIndex,
    every,
    filter,
    find,
    toArray,
    max,
    maxBy,
    min,
    minBy,
    sum,
    sumBy,
  }
}()