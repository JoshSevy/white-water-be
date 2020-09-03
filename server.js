import { whitewater } from './whitewater.js'
import { response } from 'express';

const express = require('express');
const app = express();
// const cors = require('cors')

app.set('port', process.env.port || 8080);

app.use(express.json());

app.locals.title = 'Crazy Whitewater';

app.locals.whitewater = [...whitewater]

app.get('api/v1/whitewater', (request, response) => {
  response.status(200).json(app.locals.whitewater);
})


app.get('/api/v1/whitewater/:id', (req, resp) => {
  const { id } = req.params;

  const getSpecificRiver = app.locals.whitewater.filter(river => river.id === parseInt(id))
  response.status(200).json({river: getSpecificRiver});
})

app.post('/api/v1/whitewater', (req, resp) => {
  const requiredProp = ["name", "river", "class"];
  const recievedProp = Object.keys(req.body);

  for(let prop of requiredProp) {
    if(!recievedProp.includes(prop)) {
      return resp.status(418).json({error: `Your a little tea pot, add ${prop}`})
    }
  }

  const newRiver = {
    ...req.body, 
    id: (app.locals.whitewater.length + 1)
  }

  app.locals.whitewater.push(newRiver);
  return response.status(201).json({newRiver: newRiver});
})

app.listen(app.get('port'), () => console.log(`The river is flowing at ${app.locals.title}, server flowing on port ${app.get('port')}!`));