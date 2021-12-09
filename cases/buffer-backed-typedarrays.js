export default (size) => {

  const parentArray = new Float32Array(size*3)

  const f32objects = Array(size).fill(1.23).map((_,i)=>parentArray.subarray(i, i+3))
  
  return () => {
    for (let i = 0, l = size; i < l; i++) {
      const pos = f32objects[i]
      pos[0] += 1.23
      pos[1] += 1.23
      pos[2] += 1.23
    }
  }
}
