const express = require('express')
const app = express()
const client = require('cheerio-httpcli')

const searchGoogle = async(word) => {
  const res = await client.fetch('http://www.google.com/search', { q: word })
  const $ = res.$

  const title = $('title').text()
  console.log(title)

  const searchResults = []
  $('h3 a').each(function (idx) {
    if (searchResults.map(a => a.url).includes($(this).url())) {
      console.log('dup')
      return
    }
    searchResults.push({
      title: $(this).text(),
      url: $(this).url(),
    })
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

app.listen(process.env.PORT || 8080, () => console.log('Example app listening on port 3000!'))
