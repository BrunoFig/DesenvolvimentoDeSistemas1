require('dotenv').load();
const express    = require('express')
const bodyParser = require('body-parser')
const request    = require('request')
const rp         = require('request-promise');
const app        = express()
const mongoose   = require('mongoose');


// ### Dados  Importantes Configurar para producao
const PORT 		= process.env.PORT;
const MONGO_ACCESS     = process.env.MONGO_ACCESS;
// ### Dados  Importantes Configurar para producao
app.use('/', express.static('public'));
app.set('port', (process.env.PORT || 3000))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(app.get('port'), function() {
	console.log("Logado com sucesso " + PORT)
})

console.log(MONGO_ACCESS)
mongoose.connect(MONGO_ACCESS).then(
  ()=>{
    console.log("connected to mongoDB")},
 (err)=>{
     console.log("err",err);
}
);

// # Criação dos Schemas
//===========================================================
//===========================================================
var Schema = mongoose.Schema; 
var Float = require('mongoose-float').loadType(mongoose);
var ObjectId = mongoose.Schema.Types.ObjectId;

var hostsSchema = new Schema({
  title: {type: String, required: true},
  category: {type: String, required: true},
  owner: {type: ObjectId, required: true},
  adress: {
      state: {type: String, required: true},
      city: {type: String, required: true},
      street: {type: String, required: true},
      number: {type: Number, required: true},
      zipCode: {type: Number, required: true},
      complement: String,
  },
  description: String,
  items: [{}]
}, {collection: 'hosts'});

var usersSchema = new Schema({
    admin: {type: Boolean, required: true},
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    dateBirth: {type: Date, required: true},
    phone: Number,
    sex: String,
    description: String
  }, {collection: 'users'});

var statesSchema = new Schema({
    name: {type: String, required: true, unique: true},
    initials: {type: String, required: true, unique: true}
  }, {collection: 'states'});

var citiesSchema = new Schema({
    name: {type: String, required: true, unique: true},
    state: {type: String, required: true},
    stateInitials: {type: String, required: true}
  }, {collection: 'cities'});

var itemsSchema = new Schema({
    name: {type: String, required: true, unique: true}
  }, {collection: 'items'});

var hostTypesSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: String
  }, {collection: 'hostTypes'});

// categories -> rep, ape, aloja...
var categoriesSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: String
  }, {collection: 'categories'});
  
var reservationsSchema = new Schema({
    host: {type: ObjectId, required: true, unique: true},
    daysAvailable: {
        date: {type: Date, required: true}, 
        guestNumber: {type: Number, required: true},
        dayPrice: {type: Float, required: true},
        hostType: {type: String, required: true}
        },
    daysUnavailable: {
        date: {type: Date, required: true}, 
        guestNumber: {type: Number, required: true},
        guest: {type: [ObjectId], required: true},
        dayPrice: {type: Float, required: true},
        hostType: {type: String, required: true}
        },
    description: String
  }, {collection: 'reservations'});

// # Chamada de api Post para cadastrar o pedido enviado
//===========================================================
//===========================================================

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//                         GET Resquests
//===========================================================
app.get('/hosts', (req, res) =>{
	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
var hostsDb = mongoose.model('hostsDb', hostsSchema);
hostsDb.find({})
		.then(function(hostsConsultObj) { 
		  
		  console.log("#### List of All Hosts  #####")
			   console.log(hostsConsultObj)
			
			res.send(hostsConsultObj) 
		  console.log('#### List of All Hosts  #####')
  });
});

app.get('/users', (req, res) =>{
	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
var usersDb = mongoose.model('usersDb', usersSchema);
usersDb.find({})
		.then(function(usersConsultObj) { 
		  
		  console.log("#### List of All Users  #####")
			   console.log(usersConsultObj)
			
			res.send(usersConsultObj) 
		  console.log('#### List of All Users  #####')
  });
});

app.get('/states', (req, res) =>{
	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
var statesDb = mongoose.model('statesDb', statesSchema);
statesDb.find({})
		.then(function(statesConsultObj) { 
		  
		  console.log("#### List of All States  #####")
			   console.log(statesConsultObj)
			res.send(statesConsultObj) 
		  console.log('#### List of All States  #####')
  });
});

app.get('/cities', (req, res) =>{
	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
var citiesDb = mongoose.model('citiesDb', citiesSchema);
citiesDb.find({})
		.then(function(citiesConsultObj) { 
		  
		  console.log("#### List of All Cities  #####")
			   console.log(citiesConsultObj)
			
			res.send(citiesConsultObj) 
		  console.log('#### List of All Cities  #####')
  });
});

app.get('/items', (req, res) =>{
	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
var itemsDb = mongoose.model('itemsDb', itemsSchema);
itemsDb.find({})
		.then(function(itemsConsultObj) { 
		  
		  console.log("#### List of All Items  #####")
			   console.log(itemsConsultObj)
			
			res.send(itemsConsultObj) 
		  console.log('#### List of All Items  #####')
  });
});

app.get('/hostTypes', (req, res) =>{
	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
var hostTypesDb = mongoose.model('hostTypesDb', hostTypesSchema);
hostTypesDb.find({})
		.then(function(hostTypesConsultObj) { 
		  
		  console.log("#### List of All HostTypes  #####")
			   console.log(hostTypesConsultObj)
			
			res.send(hostTypesConsultObj) 
		  console.log('#### List of All HostTypes  #####')
  });
});


app.get('/categories', (req, res) =>{
	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
var categoriesDb = mongoose.model('categoriesDb', categoriesSchema);
categoriesDb.find({})
		.then(function(categoriesConsultObj) { 
		  
		  console.log("#### List of All categories  #####")
			   console.log(categoriesConsultObj)
			
			res.send(categoriesConsultObj) 
		  console.log('#### List of All categories  #####')
  });
});


app.get('/reservations', (req, res) =>{
	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
var reservationsDb = mongoose.model('reservationsDb', reservationsSchema);
reservationsDb.find({})
		.then(function(reservationsConsultObj) { 
		  
		  console.log("#### List of All Items  #####")
			   console.log(reservationsConsultObj)
			
			res.send(reservationsConsultObj) 
		  console.log('#### List of All Items  #####')
  });
});

//                         POST Resquests
//===========================================================
app.post('/states', (req, res) =>{
	let infoRaw= req.body.data
  console.log(infoRaw)

	let data ={
		info:infoRaw  // Montando estrutura que sera salva
	}
		var statesDb = mongoose.model('statesDb',  statesSchema);
		statesDb
				.findOneAndUpdate({ "name": infoRaw.name },
					{  $set: {
                'name': data.info.name,
                'initials': data.info.initials	 
					   }
					},
					{ upsert: true },
					function(err, result) {
						if (err) res.send(err);  /// Em caso de erro enviar o erro na api para Verificar
					     console.log(err) 
							
							console.log("#### State Updated #####" )
							console.log(result)
							res.send("State Updated") // Se tudo certo devolver esse cara
					});
});

app.post('/categories', (req, res) =>{
	let infoRaw= req.body.data
  console.log(infoRaw)

	let data ={
		info:infoRaw  // Montando estrutura que sera salva
	}
		var categoriesDb = mongoose.model('categoriesDb',  categoriesSchema);
		categoriesDb
				.findOneAndUpdate({ "name": infoRaw.name },
					{  $set: {
                'name': data.info.name,
                'description': data.info.description	 
					   }
					},
					{ upsert: true },
					function(err, result) {
						if (err) res.send(err);  /// Em caso de erro enviar o erro na api para Verificar
					     console.log(err) 
							
							console.log("#### Categories Updated #####" )
							console.log(result)
							res.send("Categories Updated") // Se tudo certo devolver esse cara
					});
});

app.post('/hostTypes', (req, res) =>{
	let infoRaw= req.body.data
  console.log(infoRaw)

	let data ={
		info:infoRaw  // Montando estrutura que sera salva
	}
		var hostTypesDb = mongoose.model('hostTypesDb',  hostTypesSchema);
		hostTypesDb
				.findOneAndUpdate({ "name": infoRaw.name },
					{  $set: {
                'name': data.info.name,
                'description': data.info.description	 
					   }
					},
					{ upsert: true },
					function(err, result) {
						if (err) res.send(err);  /// Em caso de erro enviar o erro na api para Verificar
					     console.log(err) 
							
							console.log("#### hostTypes Updated #####" )
							console.log(result)
							res.send("hostTypes Updated") // Se tudo certo devolver esse cara
					});
});

app.post('/cities', (req, res) =>{
	let infoRaw= req.body.data
  console.log(infoRaw)

	let data ={
		info:infoRaw  // Montando estrutura que sera salva
	}
		var citiesDb = mongoose.model('citiesDb',  citiesSchema);
		citiesDb
				.findOneAndUpdate({ "name": infoRaw.name },
					{  $set: {
                'name': data.info.name,
                'state': data.info.state,
                'stateInitials': data.info.stateInitials	 
					   }
					},
					{ upsert: true },
					function(err, result) {
						if (err) res.send(err);  /// Em caso de erro enviar o erro na api para Verificar
					     console.log(err) 
							
							console.log("#### cities Updated #####" )
							console.log(result)
							res.send("cities Updated") // Se tudo certo devolver esse cara
					});
});

app.post('/items', (req, res) =>{
	let infoRaw= req.body.data
  console.log(infoRaw)

	let data ={
		info:infoRaw  // Montando estrutura que sera salva
	}
		var itemsDb = mongoose.model('itemsDb',  itemsSchema);
		itemsDb
				.findOneAndUpdate({ "name": infoRaw.name },
					{  $set: {
                'name': data.info.name 
					   }
					},
					{ upsert: true },
					function(err, result) {
						if (err) res.send(err);  /// Em caso de erro enviar o erro na api para Verificar
					     console.log(err) 
							
							console.log("#### Items Updated #####" )
							console.log(result)
							res.send("Items Updated") // Se tudo certo devolver esse cara
					});
});

app.post('/users', (req, res) =>{
	let infoRaw= req.body.data
  console.log(infoRaw)

	let data ={
		info:infoRaw  // Montando estrutura que sera salva
	}
		var usersDb = mongoose.model('usersDb',  usersSchema);
		usersDb
				.findOneAndUpdate({ "email": infoRaw.email },
					{  $set: {
                'email': data.info.email,
                'firstName': data.info.firstName,
                'lastName': data.info.lastName,
                'password': data.info.password,
                'dateBirth': data.info.dateBirth,
                'phone': data.info.phone,
                'sex': data.info.sex,
                'description': data.info.description
					   }
					},
					{ upsert: true },
					function(err, result) {
						if (err) res.send(err);  /// Em caso de erro enviar o erro na api para Verificar
					     console.log(err) 
							
							console.log("#### Users Updated #####" )
							console.log(result)
							res.send("Users Updated") // Se tudo certo devolver esse cara
					});
});

app.post('/hosts', (req, res) =>{
	let infoRaw= req.body.data
  console.log(infoRaw)

	let data ={
		info:infoRaw  // Montando estrutura que sera salva
	}
		var hostsDb = mongoose.model('hostsDb',  hostsSchema);
		hostsDb
				.findOneAndUpdate({ "adress": infoRaw.email },
					{  $set: {
                'title': data.info.title,
                'category': data.info.category,
                'owner': data.info.owner,
                'adress': data.info.adress,
                'description': data.info.description,
                'items': data.info.items,
					   }
					},
					{ upsert: true },
					function(err, result) {
						if (err) res.send(err);  /// Em caso de erro enviar o erro na api para Verificar
					     console.log(err) 
							
							console.log("#### Hosts Updated #####" )
							console.log(result)
							res.send("Hosts Updated") // Se tudo certo devolver esse cara
					});
});

app.post('/reservations', (req, res) =>{
	let infoRaw= req.body.data;
  console.log(infoRaw);

	let data ={
		info:infoRaw  // Montando estrutura que sera salva
	}
		var reservationsDb = mongoose.model('reservationsDb',  reservationsSchema);
		reservationsDb
				.findOneAndUpdate({ "host": infoRaw.email },
					{  $set: {
                'host': data.info.host,
                'daysAvailable': data.info.daysAvailable,
                'daysUnavailable': data.info.daysUnavailable,
                'description': data.info.description,
					   }
					},
					{ upsert: true },
					function(err, result) {
						if (err) res.send(err);  /// Em caso de erro enviar o erro na api para Verificar
					     console.log(err) 
							
							console.log("#### Reservations Updated #####" )
							console.log(result)
							res.send("Reservations Updated") // Se tudo certo devolver esse cara
					});
});

//                         DELETE Resquests
//===========================================================

app.delete('/hosts/:id', (req, res) =>{
	let infoRaw= req.params.id;
  console.log(infoRaw)

	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
	var hostsDb = mongoose.model('hostsDb', hostsSchema);
	hostsDb.findOneAndDelete({"_id": infoRaw})
		.then(function(hostsDeleteObj) { 
		  
		  console.log("####  Host Deleted  #####")
			   console.log(hostsDeleteObj)
			
			res.send(hostsDeleteObj) 
		  console.log('####  Host Deleted  #####')
	});
});

app.delete('/users/:id', (req, res) =>{
	let infoRaw= req.params.id;
  console.log(infoRaw)

	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
	var usersDb = mongoose.model('usersDb', usersSchema);
	usersDb.findOneAndDelete({"_id": infoRaw})
		.then(function(usersDeleteObj) { 
		  
		  console.log("####  Users Deleted  #####")
			   console.log(usersDeleteObj)
			
			res.send(usersDeleteObj) 
		  console.log('####  Users Deleted  #####')
	});
});

app.delete('/states/:id', (req, res) =>{
	let infoRaw= req.params.id;
  console.log(infoRaw)

	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
	var statesDb = mongoose.model('statesDb', statesSchema);
	statesDb.findOneAndDelete({"_id": infoRaw})
		.then(function(statesDeleteObj) { 
		  
		  console.log("####  States Deleted  #####")
			   console.log(statesDeleteObj)
			
			res.send(statesDeleteObj) 
		  console.log('####  States Deleted  #####')
	});
});

app.delete('/cities/:id', (req, res) =>{
	let infoRaw= req.params.id;
  console.log(infoRaw)

	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
	var citiesDb = mongoose.model('citiesDb', citiesSchema);
	citiesDb.findOneAndDelete({"_id": infoRaw})
		.then(function(citiesDeleteObj) { 
		  
		  console.log("####  Cities Deleted  #####")
			   console.log(citiesDeleteObj)
			
			res.send(citiesDeleteObj) 
		  console.log('####  Cities Deleted  #####')
	});
});

app.delete('/items/:id', (req, res) =>{
	let infoRaw= req.params.id;
  console.log(infoRaw)

	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
	var itemsDb = mongoose.model('itemsDb', itemsSchema);
	itemsDb.findOneAndDelete({"_id": infoRaw})
		.then(function(itemsDeleteObj) { 
		  
		  console.log("####  Items Deleted  #####")
			   console.log(itemsDeleteObj)
			
			res.send(itemsDeleteObj) 
		  console.log('####  Items Deleted  #####')
	});
});

app.delete('/hostsTypes/:id', (req, res) =>{
	let infoRaw= req.params.id;
  console.log(infoRaw)

	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
	var hostsTypesDb = mongoose.model('hostsTypesDb', hostsTypesSchema);
	hostsTypesDb.findOneAndDelete({"_id": infoRaw})
		.then(function(hostsTypesDeleteObj) { 
		  
		  console.log("####  HostTypes Deleted  #####")
			   console.log(hostsTypesDeleteObj)
			
			res.send(hostsTypesDeleteObj) 
		  console.log('####  HostTypes Deleted  #####')
	});
});

app.delete('/categories/:id', (req, res) =>{
	let infoRaw= req.params.id;
  console.log(infoRaw)

	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
	var categoriesDb = mongoose.model('categoriesDb', categoriesSchema);
	categoriesDb.findOneAndDelete({"_id": infoRaw})
		.then(function(categoriesDeleteObj) { 
		  
		  console.log("####  Categories Deleted  #####")
			   console.log(categoriesDeleteObj)
			
			res.send(categoriesDeleteObj) 
		  console.log('####  Categories Deleted  #####')
	});
});

app.delete('/reservations/:id', (req, res) =>{
	let infoRaw= req.params.id;
  console.log(infoRaw)

	// console.log(req.body)
  var consult = {
	context: req.body
  }
 console.log(consult)
	var reservationsDb = mongoose.model('reservationsDb', reservationsSchema);
	reservationsDb.findOneAndDelete({"_id": infoRaw})
		.then(function(reservationsDeleteObj) { 
		  
		  console.log("####  Reservations Deleted  #####")
			   console.log(reservationsDeleteObj)
			
			res.send(reservationsDeleteObj) 
		  console.log('####  Reservations Deleted  #####')
	});
});