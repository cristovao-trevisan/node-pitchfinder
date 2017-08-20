const {MacLeod} = require('../../../build/Release/addon')

module.exports = (options = {}) => {
  const detector = new MacLeod(options.bufferSize, options.sampleRate, options.cutoff, options.freqCutoff, options.probabilityThreshold)

  function macLeod (data) {
    let actualData = data
    if (!(data instanceof Float64Array)) actualData = Float64Array.from(data)
    return detector.getPitch(actualData)
  }
  macLeod.getResult = data => {
    let actualData = data
    if (!(data instanceof Float64Array)) actualData = Float64Array.from(data)
    return detector.getResult(actualData)
  }

  return macLeod
}
