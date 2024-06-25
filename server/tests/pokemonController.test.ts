import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../src'; 
import mongoose from 'mongoose';
import Pokemon from '../src/models/Pokemon';
import Users from '../src/models/Users'; // Assuming you have a User model

describe('Pokemon Controller Tests', () => {
  // Test data for creating/updating a Pokemon
  const testPokemon = {
    name: 'Hotdog',
    types: ["667a167452197a789dead6fa"],
    abilities: ["667a167452197a789dead700"],
    exp: 100,
    height: 0.4,
    weight: 6,
    artwork_url: 'https://example.com/pikachu.png',
  };

  let createdPokemonId: string;

  const testUser = {
    username: 'testuser',
    password: 'testpassword',
  };

  let jwtToken: string;

  beforeAll(async () => {
    const hash = await bcrypt.hash(testUser.password, 10);
    testUser.password = hash
  });

  afterAll(async () => {
    await Users.deleteOne({ username: testUser.username });
    await Pokemon.deleteOne({name: testPokemon.name});
    await mongoose.connection.close();
  });

  describe('Authentication and Pokemon CRUD Operations', () => {
    it('should register a user and authenticate', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          username: testUser.username,
          password: testUser.password,
        })
        .expect(201);

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
            username: testUser.username,
            password: testUser.password,
        })
        .expect(200);

      expect(loginResponse.body).toHaveProperty('accessToken');
      jwtToken = loginResponse.body.accessToken;
    });

    describe('POST /api/pokemon', () => {
      it('should create a new pokemon', async () => {
        const response = await request(app)
          .post('/api/pokemon')
          .set('Authorization', `Bearer ${jwtToken}`)
          .send(testPokemon)
          .expect(201);

        expect(response.body).toHaveProperty('_id');
        createdPokemonId = response.body._id;
      });

      it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
          .post('/api/pokemon')
          .set('Authorization', `Bearer ${jwtToken}`)
          .send({
            name: 'Bulbasaur', // Missing required fields
          })
          .expect(400);

        expect(response.body).toHaveProperty('message');
      });
    });

    describe('GET /api/pokemon', () => {
      it('should get all pokemons', async () => {
        const response = await request(app)
          .get('/api/pokemon')
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('GET /api/pokemon/:id', () => {
      it('should get a pokemon by ID', async () => {
        const response = await request(app)
          .get(`/api/pokemon/${createdPokemonId}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);

        expect(response.body).toHaveProperty('_id', createdPokemonId);
      });

      it('should return 404 if pokemon ID does not exist', async () => {
        const response = await request(app)
          .get('/api/pokemon/nonexistentid')
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(404);

        expect(response.body).toHaveProperty('message', 'Pokemon not found');
      });
    });

    describe('PUT /api/pokemon/:id', () => {
      it('should update a pokemon by ID', async () => {
        const updatedName = 'Raichu';
        const response = await request(app)
          .put(`/api/pokemon/${createdPokemonId}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .send({ ...testPokemon, name: updatedName })
          .expect(200);

        expect(response.body).toHaveProperty('name', updatedName);
      });

      it('should return 404 if pokemon ID does not exist', async () => {
        const response = await request(app)
          .put('/api/pokemon/nonexistentid')
          .set('Authorization', `Bearer ${jwtToken}`)
          .send(testPokemon)
          .expect(404);

        expect(response.body).toHaveProperty('message', 'Pokemon not found');
      });
    });

    describe('DELETE /api/pokemon/:id', () => {
      it('should delete a pokemon by ID', async () => {
        const response = await request(app)
          .delete(`/api/pokemon/${createdPokemonId}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);

        expect(response.body).toHaveProperty('message', 'Pokemon removed');
      });

      it('should return 404 if pokemon ID does not exist', async () => {
        const response = await request(app)
          .delete('/api/pokemon/nonexistentid')
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(404);

        expect(response.body).toHaveProperty('message', 'Pokemon not found');
      });
    });
  });
});


// afterAll(async () => {
//     await Pokemon.deleteMany({});
//     await mongoose.connection.close();
//   });