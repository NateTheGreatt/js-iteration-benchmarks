export default (size) => {

  const Position = {
    x: Array(size).fill(1.23),
    y: Array(size).fill(1.23),
    z: Array(size).fill(1.23)
  }

  return () => {
    for (let i = 0, l = size; i < l; i++) {
      Position.x[i] += 1.23
      Position.y[i] += 1.23
      Position.z[i] += 1.23
    }
  }
}