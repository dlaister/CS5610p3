// add actionable code here that uses api and js
// add api calls here, there should be about 20?
//TODO
import express from 'express';
// import { deletePokemon, findPokemonById, findPokemonByOwner, findPokemonByType, getAllPokemon, insertPokemon } from './db/model/pokemon.model.js';

const router = express.Router();
// let nextPokemonId = 4;
//
// const battleship = {
// replace with db
// }
//
// router.get('/', async function(req, res) {
//
//     const pokemonType = req.query.type;
//
//     const owner = req.cookies.user
//
//     if(!owner) {
//         // if no owner cookie, redirect to login
//     }
//
//     console.log(owner);
//
//     // if(pokemonType) {
//     //     const pokemonResponse = await findPokemonByType(pokemonType);
//
//     //     res.json(pokemonResponse);
//     //     return;
//     // }
//
//     const allPokemonResponse = await findPokemonByOwner(owner);
//
//     res.json(allPokemonResponse)
//
// });
//
//
// // https://www.amazon.com/dp/B0CL5KNB9M/
//
// // localhost:8000/api/pokemon/2
//
// router.get('/:pokemonId', async function(request, response) {
//     const pokemonId = request.params.pokemonId;
//
//     const responsePokemon = await findPokemonById(pokemonId);
//
//     if(!responsePokemon) {
//         response.status(404);
//         response.send('No pokemon with Pokemon ID ' + pokeId + ' exists');
//         return;
//     }
//
//
//     response.json(responsePokemon)
// })
//
// router.post('/', async function(request, response) {
//     const requestBody = request.body;
//
//     const owner = request.cookies.user
//
//     console.log(owner);
//
//     if(!requestBody.type || !requestBody.health || !requestBody.name)  {
//         response.status(400)
//         response.send("Request invalid, please recheck");
//         return;
//     }
//
//     const newPokemon = {
//         type: requestBody.type,
//         name: requestBody.name,
//         health: requestBody.health,
//         owner: owner
//     }
//
//     if(requestBody.creationDate) {
//         newPokemon.creationDate = requestBody.creationDate
//     }
//
//     const newPokemonId = await insertPokemon(newPokemon)
//
//     // const newId = nextPokemonId;
//     // myPokemon[newId] = newPokemon;
//     // nextPokemonId = nextPokemonId + 1;
//
//     response.json({
//         newPokemonId: newPokemonId
//     });
// })
//
// router.delete('/:pokemonId', async function(request, response) {
//     const pokemonToDelete = request.params.pokemonId;
//
//     await deletePokemon(pokemonToDelete)
//
//     response.send("Delete request received")
// })
//
//
export default router;