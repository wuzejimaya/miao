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
  function drop(array, n = 1) {

  }
  return {
    chunk,
    compact,
  }
}()