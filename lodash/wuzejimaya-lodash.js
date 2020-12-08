var wuzejimaya = function () {
  function concat(array, values) {
    let res = ''
    for (let i = 0; i < array.length; i++) {
      res += array[i]
    }
    return res
  }
  return {
    concat,
  }
}()