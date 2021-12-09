export default (size) => {

  const store = {
    x: new Float32Array(size),
    y: new Float32Array(size),
    z: new Float32Array(size)
  }
  
  class Vec3Proxy {
    constructor(store,eid=0) {
      this.store = store
      this.eid = eid
    }
    get x () { return this.store.x[this.eid] }
    get y () { return this.store.y[this.eid] }
    get z () { return this.store.z[this.eid] }
  
    set x (v) { this.store.x[this.eid] = v }
    set y (v) { this.store.y[this.eid] = v }
    set z (v) { this.store.z[this.eid] = v }
  }
  
  const flyweight = new Vec3Proxy(store)

  return () => {
    for (let i = 0, l = size; i < l; i++) {
      flyweight.eid = i
      flyweight.x += 1.23
      flyweight.y += 1.23
      flyweight.z += 1.23
    }
  }
}
