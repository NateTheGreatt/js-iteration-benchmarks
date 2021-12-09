export default (size) => {

  const stride = 3
  
  const f32a = new Float32Array(size*stride)

  return () => {
    for (let i = 0, l = size; i < l; i++) {
      const e = i*stride
      f32a[e] += 1.23
      f32a[e+1] += 1.23
      f32a[e+2] += 1.23
    }
  }
}