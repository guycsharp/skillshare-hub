jest.setTimeout(20000);

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../app');
const Skill = require('../models/Skill');
const User = require('../models/User');

let mongo;
let token;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Skill.deleteMany();
  await User.deleteMany();

  const res = await request(app).post('/api/auth/register').send({
    name: 'Mentor',
    email: 'mentor@example.com',
    password: 'password123',
    role: 'mentor',
  });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});

describe('Skill API', () => {
  let skillId;

  it('should create a skill', async () => {
    const res = await request(app)
      .post('/api/skills')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript',
        description: 'Learn JS from scratch',
        price: 50,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('JavaScript');
    skillId = res.body._id;
  });

  it('should get all skills', async () => {
    const res = await request(app).get('/api/skills');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a skill', async () => {
    const res = await request(app)
      .put(`/api/skills/${skillId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ price: 60 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(60);
  });

  it('should delete a skill', async () => {
    const res = await request(app)
      .delete(`/api/skills/${skillId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
