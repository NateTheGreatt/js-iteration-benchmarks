export default (size) => {

  const Position = {
    x: new Float32Array(size),
    y: new Float32Array(size),
    z: new Float32Array(size)
  }
  
  return () => {
    for (let i = 0, l = size; i < l; i++) {
      Position.x[i] += 1.23
      Position.y[i] += 1.23
      Position.z[i] += 1.23
    }
  }
}
