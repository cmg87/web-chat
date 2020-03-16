const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const express = require('express')
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log('connected')
    socket.on('message', (msg)=>{
        io.emit('message', msg)
    })
});


server.listen(PORT, console.log(`Server running on port:${PORT}`))

