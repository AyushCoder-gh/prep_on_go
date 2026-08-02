const app = require("./src/app");
const pool = require("./src/config/db");

const PORT = 5000;

pool.connect()
  .then(() => {
    console.log("✅ PostgreSQL Connected Successfully!");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed");
    console.error(err);
  });