// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "postgres",
      user: "postgres",
      password: "setiabudi52",
      host: "localhost",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "postgres",
      user: "postgres",
      password: "setiabudi52",
      host: "localhost",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "postgres",
      user: "postgres",
      password: "setiabudi52",
      host: "localhost",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
