<p align="center">
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>
</p>

# node-pitchfinder
A compilation of pitch detection algorithms for Node (Using native C++ Addon).
Based on [pitchfinder](https://github.com/peterkhayes/pitchfinder), but running a lot faster (because it's native)

## Provided pitch-finding algorithms
- **MacLeod** - Best results for instruments
- **YIN** - The best balance of accuracy and speed, in my experience.  Occasionally provides values that are wildly incorrect.
- **AMDF** - Slow and only accurate to around +/- 2%, but finds a frequency more consistenly than others. *NOT AN ADDON*
- **Dynamic Wavelet** - Very fast, but struggles to identify lower frequencies. *NOT AN ADDON*
- **YIN w/ FFT** *TODO*
- **Goertzel** *TODO*

## Installation
`npm install --save node-pitchfinder`

## Usage

### Finding the pitch of a wav file in node
```javascript
const fs = require('fs')
const WavDecoder = require('wav-decoder')
const { YIN } = require('node-pitchfinder')

// see below for option parameters.
const detectPitch = YIN({ sampleRate: 44100 })

const buffer = fs.readFileSync(PATH_TO_FILE)
const decoded = WavDecoder.decode(buffer) // get audio data from file using `wav-decoder`
const float64Array = decoded.channelData[0] // get a single channel of sound
const pitch = detectPitch(float64Array) // All detectors are using float64Array internally, but you can also give an ordinary array of numbers
```

## Configuration

### All detectors
- `sampleRate` - defaults to 44100

### YIN
- `threshold` - used by the algorithm
- `probabilityThreshold` - don't return a pitch if probability estimate is below this number.

### AMDF
- `minFrequency` - Lowest frequency detectable
- `maxFrequency` - Highest frequency detectable
- `sensitivity`
- `ratio`

### MacLeod
- `bufferSize` - Maximum data size (default 1024)
- `cutoff` - Defines the relative size the chosen peak (pitch) has. 0.93 means: choose
the first peak that is higher than 93% of the highest peak detected. 93% is the default value used in the Tartini user interface.
- `freqCutoff` - Minimum frequency to be detected (default 80Hz)
- `probabilityThreshold` - don't return a pitch if probability estimate is below this number.

### Dynamic Wavelet
*no special config*

## MORE API

### YIN and MacLeod
- method: getResult (data) - does not use probabilityThreshold, returns an object with probability instead, like `{ pitch: number, probability: number }`

#### Usage
```js
const {MacLeod} = require('node-pitchfinder')
const detectPitch = MacLeod().getResult

detectPitch(data)
// {pitch: 440, probability: 1}
```

## Todo
- MacLeod using FFT

## Thanks
Several of these algorithms were ported from Jonas Six's excellent TarsosDSP library (written in Java).  If you're looking for a far deeper set of tools than this, check out his work [on his website](http://tarsos.0110.be/tag/TarsosDSP) or [on Github](https://github.com/JorenSix/TarsosDSP).

Thanks to Aubio for his [YIN code](https://github.com/aubio/aubio/blob/master/src/pitch/pitchyin.c)
