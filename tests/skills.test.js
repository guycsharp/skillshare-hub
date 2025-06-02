const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Skill = require('../models/Skill');
const User = require('../models/User');

let token;
let skillId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Skill.deleteMany();
  await User.deleteMany();

  await request(app).post('/api/auth/register').send({
    name: 'Mentor',
    email: 'mentor@test.com',
    password: 'pass123',
    role: 'mentor'
  });

  const res = await request(app).post('/api/auth/login').send({
    email: 'mentor@test.com',
    password: 'pass123'
  });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Skill API', () => {
  it('should create a skill', async () => {
    const res = await request(app)
      .post('/api/skills')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'JavaScript', description: 'Learn JS' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('JavaScript');
    skillId = res.body._id;
  });

  it('should get all skills', async () => {
    const res = await request(app)
      .get('/api/skills')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a skill', async () => {
    const res = await request(app)
      .put(`/api/skills/${skillId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Advanced JavaScript' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Advanced JavaScript');
  });

  it('should delete a skill', async () => {
    const res = await request(app)
      .delete(`/api/skills/${skillId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Skill deleted');
  });
});
