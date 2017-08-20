const { Sinewave, Squarewave, Trianglewave } = require('wave-generator')
const { AMDF, YIN, MacLeod, DynamicWavelet } = require('../src')

const cmajor = require('./constants/cmajor')
const fs = 44100
const length = 1024
const waveforms = [Sinewave, Squarewave, Trianglewave]
const algorithms = [{
  name: 'AMDF',
  detector: AMDF(),
  precision: 0.01
}, {
  name: 'YIN',
  detector: YIN(),
  precision: 0.005
}, {
  name: 'MacLeod',
  detector: MacLeod({ bufferSize: length }),
  precision: 0.005
}, {
  name: 'DynamicWavelet',
  detector: DynamicWavelet(),
  precision: 0.01
}]

waveforms.forEach(waveform => {
  describe(waveform.name, () => {
    algorithms.forEach(algo => {
      describe(algo.name, () => {
        cmajor.forEach(f => {
          const wave = waveform(length, f, fs, 30)(length)
          it(`${f} hz`, () => {
            expect(Math.abs(1 - algo.detector(wave) / f)).toBeLessThan(algo.precision)
          })
        })
      })
    })
  })
})
