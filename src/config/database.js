module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '12345678',
  database: 'meetapp',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
