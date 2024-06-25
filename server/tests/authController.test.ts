import request from 'supertest';
import bcrypt from 'bcryptjs';
import Users from '../src/models/Users';
import app from '../src'; // Adjust the path based on your project structure
import mongoose from 'mongoose';

describe('User Controller Tests', () => {
  // Test data for registration and login
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
    await mongoose.connection.close();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
            username: testUser.username,
            password: testUser.password,
        })
        .expect(201);

      expect(response.body).toHaveProperty('message', 'User successfully created!');
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.result).toBeDefined();
    });

    it('should return 403 if username already exists', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: testUser.username,
          password: 'somepassword',
        })
        .expect(403);

      expect(response.body).toHaveProperty('message', 'Username already used');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in an existing user', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: testUser.username,
          password: testUser.password,
        })
        .expect(200);

      expect(response.body).toHaveProperty('accessToken');
      jwtToken = response.body.accessToken; 
    });

    it('should return 401 if username does not exist', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'nonexistentuser',
          password: 'somepassword',
        })
        .expect(401);

      expect(response.body).toHaveProperty('message', 'Authentication Failed');
    });

    it('should return 401 if password is incorrect', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: testUser.username,
          password: 'incorrectpassword',
        })
        .expect(401);

      expect(response.body).toHaveProperty('message', 'Authentication Failed');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should log out a logged-in user', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Logout successful');
    });

    it('should return 401 if no token provided', async () => {
        const response = await request(app)
          .post('/api/auth/logout')
          .expect(401);
  
        expect(response.body).toHaveProperty('message', 'No token provided');
      });

  });
});
