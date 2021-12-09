export default (size) => {

  const stride = 3

  const buffer = new ArrayBuffer(size*stride*Float32Array.BYTES_PER_ELEMENT)
  const view = new DataView(buffer)
  
  return () => {
    for (let i = 0, l = size; i < l; i++) {
      const e = i * stride
      view.setFloat32(e, view.getFloat32(e) + 1.23)
      view.setFloat32(e+1, view.getFloat32(e+1) + 1.23)
      view.setFloat32(e+2, view.getFloat32(e+2) + 1.23)
    }
  }
}