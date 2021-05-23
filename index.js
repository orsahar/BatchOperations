const express = require('express')
const utils = require('./utils')
const axiosRetry = require('axios-retry')
const axios = require('axios')
// const rateLimit = require('axios-rate-limit');

const app = express()
const port = 3000

//Taking care of 2 tries per request as required.
axiosRetry(axios, { retries: 2 })

// const http = rateLimit(axios.create(), { maxRequests: 5, perMilliseconds: 1000, maxRPS: 5 })
//parser to access body
app.use(express.json())

//the main function
app.post('/batch', async (req, res) => {
    let { endpoint, verb, payloads } = req.body
    let len = payloads.length;
    let successCounter = 0
    let requests = payloads.map(payload =>
        axios.request({
            method: verb,
            url: utils.endpointCorrector(endpoint, payload),
            data: payload.body,
        })
    );

    Promise.allSettled(requests).then((results) => results.forEach((result) => {
        if (result.status == "fulfilled") {
            successCounter++
        }else{
            // console.log(result)
        }
    })).finally(() => {
        res.send(`${successCounter} out of ${len}`)
    })
})

app.listen(port, () => {
    console.log(`Example Batch Service listening at http://localhost:${port}`)
})

