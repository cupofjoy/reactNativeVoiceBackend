const express = require('express');
const Analyser = require('audio-analyser');
const toUintArray = require('base64-to-uint8array');

const { addFrequencyToFirebase } = require('../firebase/firebase.utils.js')

const router = express.Router();

router.post('/', (req, res) => {
  // console.log('node', req.body.formdata._parts[0][0].uri);

  const base64 = req.body.formdata._parts[0][0].uri;

  // convert base64 to uint8array
  let arr = toUintArray(base64);
  console.log(arr);

  const analyser = new Analyser({
    minDecibels: -1000,
    maxDecibels: 0,

    fftSize: 2048,

    // Number of frequencies, half of fftSize
    frequencyBinCount: 2048/2,

    // Priority of the old data over the new data
    soothingTimeConstant: 0.2,

    // NUmber of channel to analyse
    channel: 1,

    // Size of time data to buffer
    bufferSize: 44100,

    applyWindow: function (sampleNumber, totalSamples) {}
  })

  // Current frequency data into a Float32Array pass into it
  let data = analyser.getFloatTimeDomainData(arr);
  console.log('analyser', data);

  // add data to firebase
  addFrequencyToFirebase(data);
  
  res.json({message: 'message received'})
});

module.exports = router;
