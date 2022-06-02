exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("user_data", function (table) {
      table.increments("id");
      table.string("nama", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("password", 255).notNullable();
      table.string("status");
      table.timestamp("created_at");
      table.integer("created_by");
      table.timestamp("updated_at");
      table.timestamp("deleted_at");
      table.integer("updated_by");
    })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("user_data");
};
