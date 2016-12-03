export const hShift = (context, change, unit, easing, time, callback) => {
  const startTime = new Date().getTime()
  const startPos = parseFloat(context.state.style.left)

  const horizontalTimer = setInterval(() => {
    let step = Math.min(1, (new Date().getTime() - startTime) / time)
    let increment = Math.pow(step, easing) * parseFloat(change)
    let style = context.state.style
    style.left = startPos + increment + unit
    context.setState({
      style: style
    })
    if (step === 1) {
      clearInterval(horizontalTimer)
      if (callback) {
        callback()
      }
    }
  }, 0.0001)
}

export const hShiftR = (context, change, unit, easing, time, callback) => {
  const startTime = new Date().getTime()
  const startPos = parseFloat(context.state.style.right)

  const horizontalTimer = setInterval(() => {
    let step = Math.min(1, (new Date().getTime() - startTime) / time)
    let increment = Math.pow(step, easing) * parseFloat(change)
    let style = context.state.style
    style.right = startPos + increment + unit
    context.setState({
      style: style
    })
    if (step === 1) {
      clearInterval(horizontalTimer)
      if (callback) {
        callback()
      }
    }
  }, 0.0001)
}

export const hExpand = (context, change, unit, easing, time, callback) => {
  const startTime = new Date().getTime()
  const startSize = parseFloat(context.state.style.width)

  const horizontalTimer = setInterval(() => {
    let step = Math.min(1, (new Date().getTime() - startTime) / time)
    let increment = Math.pow(step, easing) * parseFloat(change)
    let style = context.state.style
    style.width = startSize + increment + unit
    context.setState({
      style: style
    })
    if (step === 1) {
      clearInterval(horizontalTimer)
      if (callback) {
        callback()
      }
    }
  }, 0.0001)
}

export const vExpand = (context, change, unit, easing, time, callback) => {
  const startTime = new Date().getTime()
  const startSize = parseFloat(context.state.style.height)

  const verticalTimer = setInterval(() => {
    let step = Math.min(1, (new Date().getTime() - startTime) / time)
    let increment = Math.pow(step, easing) * parseFloat(change)
    let style = context.state.style
    style.height = startSize + increment + unit
    context.setState({
      style: style
    })
    if (step === 1) {
      clearInterval(verticalTimer)
      if (callback) {
        callback()
      }
    }
  }, 0.0001)
}

export const fade = (context, change, easing, time, callback) => {
  const startTime = new Date().getTime()
  const startOpacity = parseFloat(context.state.style.opacity)

  const horizontalTimer = setInterval(() => {
    let step = Math.min(1, (new Date().getTime() - startTime) / time)
    let increment = Math.pow(step, easing) * parseFloat(change)
    let style = context.state.style
    style.opacity = startOpacity + increment
    context.setState({
      style: style
    })
    if (step === 1) {
      clearInterval(horizontalTimer)
      if (callback) {
        callback()
      }
    }
  }, 0.0001)
}
