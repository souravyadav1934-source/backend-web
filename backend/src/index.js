import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = process.env.PORT || 4000;

try {
  await connectDatabase();
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
} catch (error) {
  console.error("Could not start the server:", error.message);
  process.exit(1);
}
