function getPermutation(length) {
  let result = []
  for (let i = 0; i < length; i++) {
    result.push([i])
    for (let j = i + 1; j < length; j++) {
      result.push([i, j])
      for (let k = j + 1; k < length; k++) {
        result.push([i, j, k])
        for (let h = k + 1; h < length; h++) {
          result.push([i, j, k, h])
          for (let l = h + 1; l < length; l++) {
            result.push([i, j, k, h, l])
          }
        }
      }
    }
  }
  return result
}

exports.getPermutation = getPermutation
