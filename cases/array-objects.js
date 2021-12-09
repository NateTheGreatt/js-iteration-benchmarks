export default (size) => {

  class Vec3 extends Array {
    constructor(x=0,y=0,z=0) {
      super(3)
      this[0] = x
      this[1] = y
      this[2] = z
    }
  }
  
  const f32objects = Array(size).fill(1.23).map(()=>new Vec3())

  return () => {
    for (let i = 0, l = size; i < l; i++) {
      const pos = f32objects[i]
      pos[0] += 1.23
      pos[1] += 1.23
      pos[2] += 1.23
    }
  }
}