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
var Schema = mongoose.Schema; 
var Float = require('mongoose-float').loadType(mongoose);
var listauPizzaDataSchema = new Schema({
  input: String,
  output:String,
  messages: String,
  context: {} ,  // para poder aceitar um array com informacoes dentro dele 
  _id : {},
  name : String,
  valor : String,
  ingredientes : String,
}, {collection: 'infopizza'});


app.post('/pizzaconsulta', (req, res) =>{

	// console.log(req.body)
  var consulta = {
	context: req.body
  }
 console.log(consulta)
var usersConsultaPizzaDb = mongoose.model('usersConsultaPizzaDb', listauPizzaDataSchema);
var usersConsultaObj ={}
	usersConsultaPizzaDb.find({ "context.senderID": consulta.context.senderID })
		.then(function(usersConsultaObj) { 
		  
		  console.log("#### Lista de pizzas que existem  #####")
			   console.log(usersConsultaObj)
			
			res.send(usersConsultaObj) 
		  console.log('#### Lista de pizzas que existem  #####')
		 
		
  });
});

// ## Criação dos Schemas
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
    dayprice: {type: Float, required: true},
    description: String
  }, {collection: 'reservations'});


/// ## Modelo de estrutura da colecao Pedidos ####///


// Chamada de api Post para cadastrar o pedido enviado
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
                'adress.state': data.info.adress.state,
                'adress.city': data.info.adress.city,
                'adress.street': data.info.adress.street,
                'adress.number': data.info.adress.number,
                'adress.zipCode': data.info.adress.zipCode,
                'adress.complement': data.info.adress.complement,
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
// Chamada de api Post para cadastrar o pedido enviado

// ROUTES
app.get('/teste', function(req, res) {
	console.log("huhuhuuhu Deu certo  o teste");
	res.send({
 				"messages": [
   								 {"text": "Servidor storage"}
									
 							]
			})
});
