export default (size) => {

  const stride = 3
  
  const arr = Array(size*stride)

  return () => {
    for (let i = 0, l = size; i < l; i++) {
      const e = i*stride
      arr[e] += 1.23
      arr[e+1] += 1.23
      arr[e+2] += 1.23
    }
  }
}