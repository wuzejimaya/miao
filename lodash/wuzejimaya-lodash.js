var wuzejimaya = function () {
  function chunk(array, size = 1) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      let tem = []
      for (let j = 0; j < size && i < array.length; j++) {
        tem.push(array[i++])
      }
      res.push(tem)
    }
    return res
  }
  return {
    chunk,
  }
}()