const express      = require('express');
const mysql        = require('mysql');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const nodemailer   = require("nodemailer");
const jwt          = require("jsonwebtoken");
const session      = require("express-session");
const cors         = require('cors');

const PORT = process.env.PORT || 5000
const app        = express();
const connection = mysql.createConnection({
    host     : 'us-cdbr-iron-east-05.cleardb.net',
    user     : 'b7261f32e36adc',
    password : '70f8479e',
    database : 'heroku_3c7b87207c85770'
});
app.use(cors({credentials: true}));
app.use(session({
  secret: 'my cats name again',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: false, // key
    maxAge: null
  }
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
process.env.SECRET_KEY = "mybadasskey";

setInterval(function () {
  connection.query('SELECT 1');
}, 5000);

app.get('/', (req, res) => {
    res.send("Idiot");
})

app.post('/registration_manager', (req, res) => {
  let newUser = {
      login: req.body.login,
      password: req.body.password,
      email: req.body.email,
      token: ''
  }

  let token = jwt.sign(newUser, process.env.SECRET_KEY, {
      expiresIn: 4000
  });

  newUser.token = token;

  connection.query('INSERT INTO manager(login, pas, email, confirm, token) VALUES("' + newUser.login + '", "' + newUser.password + '","'+ newUser.email +'", false, "' + newUser.token + '")', function(err, result, fields) {
      if (!err){
          let transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'moonkin973@gmail.com',
                pass: 'torres3a'
              }
            });
            
            let mailOptions = {
              from: 'moonkin973@gmail.com',
              to: newUser.email,
              subject: 'Confirm email',
              html: '<b>Your link </b><a href="http://localhost:5000/activation_manager/'+ newUser.token +'"> localhost:5000/activation_manager/' + newUser.token + '</a>'  
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                res.send(error);
              }else{
                res.send("OK");
              }
            });
      }
      else
          res.send(err);
  });
})

app.get('/test_login_dev/:login', (req, res) => {
  connection.query('Select * from developers where login = "' + req.params.login + '"', function(err, result) {
    if(!err){
      if(Object.keys(result).length !== 0){
        return res.send("This login exist");
      }else{
        res.send("OK");
      }
    }else{
      return res.send(err);
    }
  })
})

app.get('/test_email_dev/:email', (req, res) => {
  connection.query('Select * from developers where email = "' + req.params.email + '"', function(err, result) {
    if(!err){
      if(Object.keys(result).length !== 0){
        return res.send("This mail exist");
      }else{
        res.send("OK");
      }
    }else{
      return res.send(err);
    }
  })
})

app.get('/test_login_manager/:login', (req, res) => {
  connection.query('Select * from developers where login = "' + req.params.login + '"', function(err, result) {
    if(!err){
      if(Object.keys(result).length !== 0){
        return res.send("This login exist");
      }else{
        res.send("OK");
      }
    }else{
      return res.send(err);
    }
  })
})

app.get('/test_email_manager/:email', (req, res) => {
  connection.query('Select * from developers where email = "' + req.params.email + '"', function(err, result) {
    if(!err){
      if(Object.keys(result).length !== 0){
        return res.send("This mail exist");
      }else{
        res.send("OK");
      }
    }else{
      return res.send(err);
    }
  })
})

app.post('/registration_dev', (req, res) => {
    let newUser = {
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
        token: ''
    };

    let post_res;

    let token = jwt.sign(newUser, process.env.SECRET_KEY, {
        expiresIn: 4000
    });

    newUser.token = token

    connection.query('INSERT INTO developers(login, pas, email, confirm, token) VALUES("' + newUser.login + '", "' + newUser.password + '","'+ newUser.email +'", false, "' + newUser.token + '")', function(err, result, fields) {
        if (!err){
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'moonkin973@gmail.com',
                  pass: 'torres3a'
                }
              });
              
              let mailOptions = {
                from: 'moonkin973@gmail.com',
                to: newUser.email,
                subject: 'Confirm email',
                html: '<b>Your link </b><a href="http://localhost:5000/activation_dev/'+ newUser.token +'"> localhost:5000/activation_dev/' + newUser.token + '</a>'  
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  return res.send(error);
                }else{
                  return res.send("OK");
                }
              });
        }
        else
          return res.send(err);
    });
})

app.get('/activation_dev/:token', (req, res) => {

  connection.query('Update developers set confirm = true where token = "' + req.params.token + '"', function(err, result) {
      if(!err){
        res.redirect('http://localhost:3000/');
      }else{
          res.send(err);
      }
  })

})

app.get('/activation_manager/:token', (req, res) => {

  connection.query('Update manager set confirm = true where token = "' + req.params.token + '"', function(err, result) {
      if(!err){
        res.redirect('http://localhost:3000/');
      }else{
          res.send(err);
      }
  })

})

app.post('/login_dev', (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', '*');
    let User = {
        login: req.body.login,
        password: req.body.password 
    };

    let userID;
    
    connection.query('SELECT id from developers where login = "' + User.login + '" and pas = "' + User.password + '"', function(err, result) {
      if (!err){
        if(Object.keys(result).length === 0){
          res.send("Error password or login");
        }else{
          User = {
            id: result[0].id,
            login: User.login,
            password: User.password,
            type: "developer"
          }
          res.send(User);
        }
      }else{
          res.send(err);
      }
  });
})

app.post('/login_manager', (req, res) => {
  let User = {
      login: req.body.login,
      password: req.body.password 
  };

  let userID;
  
  connection.query('SELECT id from manager where login = "' + User.login + '" and pas = "' + User.password + '"', function(err, result) {
    if (!err){
      if(Object.keys(result).length === 0){
        res.sendStatus(500);
      }else{
        req.session.User = {
          id: result[0].id,
          login: User.login,
          password: User.password,
          type: "manager"
        }
        res.send("OK");
      }
    }else{
        res.send(err);
    }
});
})

app.get('/getUser', (req, res) => {
  if(!req.session.User){
    res.send("Not");
  }else{
    res.send(req.session.User);
  }
})

app.post('/addPost', (req, res) => {
  connection.query('INSERT INTO projects(name, description, id_manager) VALUES("' + req.body.name + '", "' + req.body.description + '","'+ req.body.id_manager +'")', function(err, result, fields) {
    if (!err){
        res.send('OK');
    }
    else
      return res.send(err);
  });
})

app.get('/getProjects/:id', (req, res) => {
  connection.query('select * from projects where id_manager = '+ req.params.id, function(err, result, fields) {
    if (!err){
        res.send(result);
    }
    else
      return res.send(err);
  });
})

app.get('/getProjectsDev/:id', (req, res) => {
  connection.query('select * from projects where id = '+ req.params.id, function(err, result, fields) {
    if (!err){
        res.send(result);
    }
    else
      return res.send(err);
  });
})

app.get('/getTaskDev/:id/:id_dev', (req, res) => {
  connection.query('select * from tasks where id_project = '+ req.params.id + ' and developer_id =' + req.params.id_dev, function(err, result, fields) {
    if (!err){
        res.send(result);
    }
    else
      return res.send(err);
  });
})

app.get('/get_task/:id', (req, res) => {
  connection.query('select * from tasks where id = '+ req.params.id, function(err, result, fields) {
    if (!err){
        res.send(result);
    }
    else
      return res.send(err);
  });
})

app.post('/create_post/:id', (req, res) => {
  connection.query('Insert into tasks(id_project, name, description, developer_id) values(' + req.params.id + ', "' +  req.body.name + '", "' + req.body.description  + '", ' + req.body.developer_id + ')', function(err, result, fields) {
    if (!err){
        res.send(result);
    }
    else
      return res.send(err);
  });
})

app.get('/getTasks/:id', (req, res) => {
  connection.query('select * from tasks where id_project =' + req.params.id, function(err, result, fields) {
    if (!err){
        res.send(result);
    }
    else
      return res.send(err);
  });
})

app.post('/add_dev/:id', (req, res) => {
  connection.query('Insert into dev_proj values(' + req.body.id_dev + ', ' + req.params.id + ')', function(err, result, fields) {
    if (!err){
        res.send(result);
    }
    else
      return res.send(err);
  });
})

app.get('/get_dev/:id', (req, res) => {
  connection.query('select * from developers where id =' + req.params.id, function(err, result, fields) {
    if (!err){
        res.send(result);
    }
    else
      return res.send(err);
  });
})

app.get('/dev_proj/:id', (req, res) => {
  connection.query('select id from dev_proj where id_dev =' + req.params.id, function(err, result, fields) {
    if (!err){
        res.send(result);
    }
    else
      return res.send(err);
  });
})

app.post('/add_post', (req, res) => {
  connection.query('Insert into comment(id_dev, id_man, comment, id_task, name) values(' + req.body.id_dev + ', ' + req.body.id_man + ', "' + req.body.comment + '", ' + req.body.id_task + ', "' + req.body.name + '")', function(err, result, fields) {
    if (!err){
        res.send("OK");
    }
    else
      return res.send(err);
  });
})

app.get('/comment/:id', (req, res) => {
  connection.query('select * from comment where id_task=' + req.params.id, function(err, result, fields) {
    if (!err){
        res.send(result);
    }
    else
      return res.send(err);
  });
})

app.post('/dev_task', (req, res) => {
  connection.query('Insert into tasks(id_project, name, description, developer_id, status) values(' + req.body.id_project + ', "' + req.body.name + '", "' + req.body.description + '", ' + req.body.developer_id + ', "waiting")', function(err, result, fields) {
    if (!err){
        res.send(result);
    }
    else
      return res.send(err);
  });
})

app.post('/status', (req, res) => {
  connection.query('Update dev_proj set status = ' + req.body.status + ' where id  =' + req.body.id, function(err, result, fields) {
    if (!err){
        res.send(result);
    }
    else
      return res.send(err);
  });
})

app.post('/all_dev', (req, res) => {
  connection.query('select * from developers', function(err, result, fields) {
    if (!err){
        res.send(result);
    }
    else
      return res.send(err);
  });
})

app.get('/dev_name/:name', (req, res) => {
  connection.query('select * from developers where login = "' + req.params.name + '"', function(err, result, fields) {
    if (!err){
        res.send(result);
    }
    else
      return res.send(err);
  });
})

app.post('/add_pr', (req, res) => {
  connection.query('Insert Into dev_proj(id_dev, id_proj, name) values(' + req.body.id_dev + ', ' + req.body.id_proj + ', "' + req.body.name + '")', function(err, result, fields) {
    if (!err){
        res.send(result);
    }
    else
      return res.send(err);
  });
})

app.listen(PORT);