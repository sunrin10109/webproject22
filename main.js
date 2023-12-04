const express = require('express');
const fs = require('fs');
const qs = require('querystring');
const app = express();
const port = 3000;
const template = require('./template.js');
const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'web'
});
conn.connect();

app.use(express.static('css'));
app.use(express.static('public'));
app.use(express.static('img'));
app.use(express.static('font'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/main.html');
});

app.get("/main.html", function (req, res) {
  res.sendFile(__dirname + '/main.html');
});
 // ------------------------------------------------

app.get("/journal.html", function (req, res) {
  let {id} = req.query;
  conn.query("SELECT * FROM journal", (err, journal) => {  
    if (err) throw err;
      let list = template.list(journal);
      let control;
      if(id === undefined){
        let button = `
        <form action="/journal.html/create_process" accept-charset="utf-8" method="post">
          <p>title</p><input type="text" name="title" autocomplete="off" minlength="1" placeholder="제목을 입력하세요."><br><br>
          <p>content</p><textarea name="description" autocomplete="off" placeholder="내용을 입력하세요."></textarea>
          <button type="submit">CREATE</button>
        </form>`;
        const html = template.HTML(list, button);
        res.send(html);
      }else{
        conn.query(`SELECT title, content FROM journal WHERE id=?`, [id], (err2, journal2) => {
          if (err2) throw err2;
            button = `
            <form action="/journal.html/update_process" method="post">
              <p>title</p><input type="text" name="title" value='${journal2[0].title}' autocomplete="off" minlength="1" placeholder="제목을 입력하세요."><br><br>
              <p>content</p><textarea name="description" autocomplete="off" placeholder="내용을 입력하세요.">${journal2[0].content}</textarea>
              <input type='hidden' name='id' value='${id}'>
              <button type="submit">UPDATE</button>
            </form>
            <form action="/journal.html/delete_process" method="post">
              <input type='hidden' name='id' value='${id}'>
              <button type="submit">DELETE</button>
            <form>
            `;
            const html = template.HTML(list, button);
            res.send(html);  
        });
      }
    });
});
app.post('/journal.html/create_process', (req, res)=>{
  let body = '';
  req.on('data', (data)=>{
      body = body + data;
  })
  req.on('end', ()=>{
      const post = qs.parse(body);
      const title = post.title;
      const description = post.description;
      conn.query("INSERT INTO journal (title, content, adddate) values (?, ?,  DATE_FORMAT(now(), '%Y-%m-%d'))",
      [title, description], (err, result) => {
          if (err) throw err;
          res.redirect(302, '/journal.html');
      })
  })
})
app.post('/journal.html/update_process', (req, res)=>{
  let body = '';
  req.on('data', (data)=>{
      body = body + data;
  })
  req.on('end', ()=>{
    const post = qs.parse(body);
    const id = post.id;
    const title = post.title;
    const description = post.description;
    conn.query('UPDATE journal SET title=?, content=? where id=?', [title, description, id], (err, result) => {
      if (err) throw err;
      res.redirect(302, `/journal.html`);
    });
  });
});
app.post('/journal.html/delete_process', (req, res)=>{
  let body = '';
  req.on('data', (data)=>{
      body = body + data;
  })
  req.on('end', ()=>{
      const post = qs.parse(body);
      const id = post.id;
      conn.query('DELETE FROM journal where id=?', [id], (err, result) => {
          if (err) throw err;
          res.redirect(302, `/journal.html`);
      })
  })
})
// ------------------------------------------------

app.get("/ware.html", function (req, res) {
  res.sendFile(__dirname + '/ware.html');
});

app.get("/mypage.html", function (req, res) {
  res.sendFile(__dirname + '/mypage.html');
});

app.listen(port, function () {
  console.log(`App is running on port ${port}`);
});