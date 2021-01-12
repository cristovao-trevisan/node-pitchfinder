const Pitchfinder = require('./index')

let sine = []
let fs = 47000
let f = 440
let bufferSize = 1024

for (let i = 0; i < bufferSize; i++) {
  sine.push(100 * Math.sin(2 * Math.PI * f / fs * i))
}

let yinJs = Pitchfinder.YIN({ sampleRate: fs })
console.time('JS')
let pitch
for (let i = 0; i < 1000; i++) {
  pitch = yinJs.getResult(sine)
}
console.timeEnd('JS')
console.log(pitch, 'err: ' + (440 - pitch.pitch))

let macLeod = Pitchfinder.MacLeod({ bufferSize: 2048, sampleRate: fs })
console.time('Addon')
for (let i = 0; i < 1000; i++) {
  pitch = macLeod.getResult(Float64Array.from(sine))
}
console.timeEnd('Addon')
console.log(pitch, 'err: ' + (440 - pitch.pitch))
