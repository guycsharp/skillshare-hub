const request = require('supertest');
const app = require('../server');
const Skill = require('../models/Skill');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');

let adminToken, mentorToken, learnerToken;

beforeAll(async () => {
  const admin = await User.create({ name: 'Admin', email: 'admin@test.com', password: 'password', role: 'admin' });
  const mentor = await User.create({ name: 'Mentor', email: 'mentor@test.com', password: 'password', role: 'mentor' });
  const learner = await User.create({ name: 'Learner', email: 'learner@test.com', password: 'password', role: 'learner' });

  adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  mentorToken = jwt.sign({ id: mentor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  learnerToken = jwt.sign({ id: learner._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterEach(async () => {
  await Skill.deleteMany(); // Clear test skills after each test
});

describe('Skill Routes', () => {
  test('POST /api/skills - Only Admin can create skills', async () => {
    const res = await request(app)
      .post('/api/skills')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'React', description: 'Learn React basics', price: 100 });

    expect(res.statusCode).toBe(201);
  });

  test('PUT /api/skills/:id - Only Admin can update skills', async () => {
    const skill = await Skill.create({ title: 'React', description: 'Learn React basics', price: 100 });

    const res = await request(app)
      .put(`/api/skills/${skill._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'Advanced React', description: 'Deep dive into React', price: 150 });

    expect(res.statusCode).toBe(200);
  });

  test('DELETE /api/skills/:id - Only Admin can delete skills', async () => {
    const skill = await Skill.create({ title: 'React', description: 'Learn React basics', price: 100 });

    const res = await request(app)
      .delete(`/api/skills/${skill._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  test('Mentors and Learners should NOT create skills', async () => {
    const res = await request(app)
      .post('/api/skills')
      .set('Authorization', `Bearer ${mentorToken}`)
      .send({ title: 'Vue.js', description: 'Learn Vue.js basics', price: 80 });

    expect(res.statusCode).toBe(403);
  });
});
