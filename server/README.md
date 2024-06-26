# pokemon-mern-server
MERN Application with JWT approach for Authentication and Authorization

## API ENDPOINTS    

| Description                  | HTTP Method | Endpoint           |
|------------------------------|-------------|--------------------|
| Get All Pokemon              | GET         | /api/pokemon       |
| Get specific Pokemon thru ID | GET         | /api/pokemon/:id   |
| Get All Types                | GET         | /api/pokemon/types |
| Create Pokemon                | POST         | /api/pokemon/ |
| Update Pokemon Details                | PUT         | /api/pokemon/:id |
| Delete Pokemon                | DELETE         | /api/pokemon/:id |

## Checklist
- [X] Create a command that saves all the pokemons from the pokeapi in your pokedex
database. Plus points if you can determine data that can be stored into different tables
for reusability. Fetch and store at least generation 1 Pokemons (first 151 Pokemons) (*see [seed.ts](https://github.com/louispawaon/pokemon-mern/blob/main/server/src/scripts/seed.ts)*)
- [X] Create these authentication endpoints:
    - [X] Register
    - [X] Login
    - [X] Logout
- [X] Create an API endpoint using express.js that
  - [X] Lists all Pokemon
  - [X] Display details of specific Pokemon
  - [X] Allow create a Pokemon (authenticated)
  - [X] Allow update a Pokemon (authenticated)
  - [X] Allow deletion of Pokemon (authenticated)
- [X] Unit Tests