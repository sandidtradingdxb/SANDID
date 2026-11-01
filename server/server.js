require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Loads a route file if it exists; if it's missing (e.g. a file didn't get
// deployed), logs a clear warning and returns a harmless placeholder router
// instead of crashing the entire server on startup.
function safeRequireRoute(path) {
  try {
    return require(path);
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND") {
      console.error(`⚠️  Route file missing: ${path} — that feature will 404 until it's added back.`);
      const placeholder = express.Router();
      placeholder.use((req, res) => res.status(503).json({ message: `This feature is temporarily unavailable (${path} not deployed).` }));
      return placeholder;
    }
    throw err; // real bugs in the file itself should still fail loudly
  }
}

const authRoutes = safeRequireRoute("./routes/auth");
const productRoutes = safeRequireRoute("./routes/products");
const categoryRoutes = safeRequireRoute("./routes/categories");
const quoteRoutes = safeRequireRoute("./routes/quotes");
const adminRoutes = safeRequireRoute("./routes/admin");
const uploadRoutes = safeRequireRoute("./routes/uploads");
const contactRoutes = safeRequireRoute("./routes/contact");

const app = express();

connectDB();

// Allowed browser origins. CLIENT_URL may hold one address or several separated by
// commas. Trailing slashes and spaces are ignored, and for each address the
// www / non-www counterpart is allowed too. localhost is allowed for development.
function buildAllowedOrigins(raw) {
  if (!raw) return "*";
  const list = new Set(["http://localhost:5173"]);
  raw
    .split(",")
    .map((u) => u.trim().replace(/\/+$/, ""))
    .filter(Boolean)
    .forEach((u) => {
      list.add(u);
      list.add(u.includes("://www.") ? u.replace("://www.", "://") : u.replace("://", "://www."));
    });
  return [...list];
}
const allowedOrigins = buildAllowedOrigins(process.env.CLIENT_URL);
console.log("CORS allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: allowedOrigins === "*" ? "*" : allowedOrigins,
  })
);
// Raised from the default 100kb so a product with a couple of embedded
// base64 photos (from the admin upload feature) can still be saved.
app.use(express.json({ limit: "15mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/contact", contactRoutes);

// Fallback error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
