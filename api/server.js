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
      unique: true
  },
  description: String,
  items: [{}], 
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
    name: {type: String, required: true, unique: true}
  }, {collection: 'states'});

var citiesSchema = new Schema({
    name: {type: String, required: true, unique: true},
    state: {type: String, required: true}
  }, {collection: 'cities'});

var itemsSchema = new Schema({
    name: {type: String, required: true, unique: true}
  }, {collection: 'items'});

var hostTypesSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: String
  }, {collection: 'hostTypes'});

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

	let dados ={
		info:infoRaw  // Montando estrutura que sera salva
	}
		var statesDb = mongoose.model('statesDb',  statesSchema);
		var usersObj ={}
		statesDb
				.findOneAndUpdate({ "name": infoRaw.name },
					{  $set: {
								'name': dados.info.name			 
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
