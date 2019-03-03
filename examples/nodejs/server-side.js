const AuthRocket = require('authrocket-node');

const requestData = {
  realm_id : '__your_realm_id',
};

const authrocket = new AuthRocket({
  apiKey: '__//__YOUR_API_KEY__\\__',
  apiUrl: 'https://api-e1.authrocket.com/v1/',
});

authrocket.Realms({}).get().then((data)=> {
  console.log(data);
});

authrocket.Users({}).get(requestData).then((data)=>{
  console.log(data);
});
