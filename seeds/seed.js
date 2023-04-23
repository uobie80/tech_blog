const sequelize = require('../config/connection');
const { User, Comment, Blog } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogs = [];

  for (const blog of blogData) {
  const createdBlog = await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    blogs.push(createdBlog);
  }

  let idx = 0;
  for (const comment of commentData){
    await Comment.create({
      ...comment,
      blog_id: blogs[idx++].id,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  }

  process.exit(0);
};

seedDatabase();
