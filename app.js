const express = require('express')
const utility = require('utility')
const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const app = express()

app.get('/',function(req,res) {
  //get用query接收，post用body（学要安装另外模块）
  const q = req.query.q
  const md5Value = utility.md5(q)
  res.send(md5Value)
})

// app.get('/123', function (req,res,next) {
  const items = []
    for(var i=1;i<10;i++) {
    console.log('一' + i)
    const url = 'https://cnodejs.org/?tab=all&page=' + i
    console.log(url)
    superagent.get(url)
    .end(function(err,sres) {
      if(err) {
        return next(err)
      }
      console.log(i)
      const $ = cheerio.load(sres.text)
      $('#topic_list .topic_title').each(function(index,element) {
        items.push({
          title: $(element).attr('title'),
          href: $(element).attr('href')
        })
      })
      // res.send(items)
      for( var j=0;j<items.length;j++) {
        items[j].id = j
      }
      fs.writeFile('item.json',JSON.stringify(items),function(err) {
        if(err) {
          return console.error(err)
        }
        console.log('ok')
      })
    })
  }
  console.log(items.length)
    console.log(items.length)
	  console.log(items.length)
  // console.log(111)
// })

var server = app.listen(3001,'localhost', function () {
 
    var host = server.address().address
    var port = server.address().port
   
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
   
  })