require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3000;

const main = async () => {
  app.listen(PORT, () =>
    console.log(`Server listening on http://localhost:${PORT}`)
  );
};

main().catch((err) => console.log(err));
