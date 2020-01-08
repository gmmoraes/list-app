var jsonObjects = []
function createJsonObjct(usuario, email, dataDeInclusao, dataDeAlteracao, regras, status,id) {
  var obj = new Object();
  obj.usuario = usuario;
  obj.email = email;
  obj.dataDeInclusao = dataDeInclusao;
  obj.dataDeAlteracao = dataDeAlteracao;
  obj.regras = regras;
  obj.status = status
  obj.id = id
  jsonObjects.push(obj)
}

var emailProviders = ["@yahoo.com", "@gmail.com", "@hotmail.com", "@zoho.com"];

var RandomNames = {
  firstNames: [
    'Vinicius',
    'Talita',
    'Maria',
    'João',
    'José',
    'Marcos',
    'Gabriel',
    'Rafael',
    'Ronaldo',
    'Paulo',
    'Pedro',
    'Wiliam',
    'Breno',
    'Leticia',
    'Nelson',
    'Luana',
    'Luna',
    'Laís',
    'Mauro'
  ],
  middleNames: [
    'Costa',
    'Araújo',
    'Rodrigues',
    'Pereira',
    'Soares',
    'Luiz'

  ],
  lastNames: [
    'Pires',
    'Alves',
    'Álvares',
    'Moreira',
    'Ferreira',
    'Silva',
    'Costa',
    'Moraes',
    'Andrade',
    'Barbosa',
    'Batista',
    'Borges',
    'Campos',
    'Cardoso'
  ],
  generate: function (quantity) {
    var maxNames = this.firstNames.length * this.middleNames.length * this.lastNames.length;
    if (quantity > maxNames) {
      /* eslint-disable no-console */
      console.log("Quantity greater than possible matches. Possible matches: " + maxNames);
    }
    var names = [];
    while (names.length < quantity) {
      var name = "";
      var first = Math.floor(Math.random() * this.firstNames.length);
      name += this.firstNames[first];
      var middle = Math.floor(Math.random() * this.middleNames.length);
      name += " " + this.middleNames[middle];
      var last = Math.floor(Math.random() * this.lastNames.length);
      name += " " + this.lastNames[last];

      if (names.indexOf(name) == -1) {
        names.push(name);
      }
    }
    return names;
  }
};



function randomDate() {
  var startDate = new Date(2012, 0, 1).getTime();
  var endDate = new Date(2015, 0, 1).getTime();
  var spaces = (endDate - startDate);
  var timestamp = Math.round(Math.random() * spaces);
  timestamp += startDate;
  return new Date(timestamp);
}

function formatDate(date) {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear()


  return day + '/' + month + '/' + year;
}


export default function mockData() {
  //Mark: Nomes Fixos
  createJsonObjct("Anpina", "antonio.pina@tvglobo.com.br", "28/05/2019", "30/05/2019", 1, "Ativo",1);
  createJsonObjct("Cchang", "ciro.chang@tvglobo.com.br", "28/05/2019", "30/05/2019", 1, "Ativo",2);
  createJsonObjct("Tmarcal", "thiago.marcal@tvglobo.com.br", "28/05/2019", "30/05/2019", 1, "Ativo",3);
  createJsonObjct("Ecgiann", "ecgiannotoo@tvglobo.com.br", "28/05/2019", "30/05/2019", 1, "Ativo",4);
  createJsonObjct("Yfernand", "yuri.vasquez@tvglobo.com.br", "28/05/2019", "30/05/2019", 2, "Ativo",5);
  createJsonObjct("Placerda", "pedro.soares.lacerda@tvglobo.com.br", "28/05/2019", "30/05/2019", 2, "Ativo",6);


  //Mark: Nomes randomicos
  var names = RandomNames.generate(15);
  for (var i = 0; i < names.length; i++) {
    var usuario = names[i];
    var emailProvider = emailProviders[Math.floor(Math.random() * 3)];
    var email = ((names[i].replace(/ /g, '')) + emailProvider).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    var dataDeInclusao = formatDate(randomDate());
    var dataDeAlteracao = formatDate(randomDate());
    var status = Math.floor(Math.random() * 2) === 0 ? "Inativo" : "Ativo";
    var id = 7 + i 


    createJsonObjct(usuario, email, dataDeInclusao, dataDeAlteracao, 1, status,id);
  }

  return jsonObjects


}






