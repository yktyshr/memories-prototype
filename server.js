const express = require('express')
const app = express()
const client = require('cheerio-httpcli')
const axios = require('axios')

const searchGoogle = async(word) => {
  const res = await client.fetch('http://www.google.com/search', { q: word })
  const $ = res.$

  const title = $('title').text()
  console.log(title)

  const searchResults = []
  $('.g').each(function (idx) {
    const h3 = $(this).find('h3 a')
    const url = h3.url()
    const title = h3.text()
    const description = $(this).find('.st').text()

    if (!title || !url || searchResults.map(a => a.url).includes(url)) {
      console.log('dup')
      return
    }

    searchResults.push({ title, url, description })
  })
  return searchResults
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/search', async(req, res) => {
  const r = await searchGoogle(req.query.q)
  res.send(r)
})

app.get('/iframe', async(req, res) => {
  const data = (await axios.get(req.query.url)).data
  res.send(data)
})

app.listen(process.env.PORT || 8080, () => console.log('Example app listening on port 3000!'))
