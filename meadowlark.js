var express = require('express'); //require — функция Node для импорта модулей.

var app = express();

var fortune = require('./lib/fortune.js');

// Установка механизма представления handlebars
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000); // порт, на котором хотим, чтобы было запущено наше приложение

app.get('/', function(req, res){ //app.get — метод, с помощью которого мы добавляем маршруты
	 res.render('home');
});

app.get('/about', function (req, res) {
	 res.render('about', { fortune: fortune.getFortune() });
});

// page 404
app.use(function (req, res) {
	res.status(404);
    res.render('404');
});

// page 500
app.use(function (err, req, res, next) {
	console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express start http://localhost:' + app.get('port') + '; нажмите Ctrl+C для завершения.');
});