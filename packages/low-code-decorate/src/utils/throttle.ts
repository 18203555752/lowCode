export const throttle_time = (fn: any)=> {
  let time = new Date().getTime()
  let timer: any = null
  return function (...args: any[]) {
    const thisTime = new Date().getTime()
    console.log(thisTime , time, thisTime - time)
    if(thisTime - time > 16) {
      fn(...args)
      time = thisTime
    }else{
      clearTimeout(timer)
      timer = setTimeout(()=> {
        fn(...args)
        time = thisTime
      }, 16)
      
      
    }
  }
}

export const throttle = (fn: any)=> {
  let timer: number = 0
  return function (...args: any[]) {
    if(timer){
      cancelAnimationFrame(timer)      
    }
    timer = requestAnimationFrame(()=> {
      fn(...args)
      timer = 0
    })
    
  }
}
export const throttle1 = (fn: any)=> {
  let time = new Date().getTime()
  let timer: any = null
  return function (...args: any[]) {
    fn(...args)
  }
}