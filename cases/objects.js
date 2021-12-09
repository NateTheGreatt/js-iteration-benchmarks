export default (size) => {

  class Position {
    constructor(x=0,y=0,z=0) {
      this.x = x
      this.y = y
      this.z = z
    }
  }
  
  const objects = Array(size).fill(1.23).map(()=>new Position())

  return () => {
    for (let i = 0, l = size; i < l; i++) {
      const pos = objects[i]
      pos.x += 1.23
      pos.y += 1.23
      pos.z += 1.23
    }
  }
}
