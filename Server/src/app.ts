// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import authRouter from "./routes/auth";
// import contentRouter from "./routes/content";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import brainRouter from "./routes/mind";

// const app = express();

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//     methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/content", contentRouter);
// app.use("/api/v1/brain", brainRouter);

// export default app;



import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRouter from "./routes/auth";
import contentRouter from "./routes/content";
import cookieParser from "cookie-parser";
import cors from "cors";
import brainRouter from "./routes/mind";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import { xss } from "express-xss-sanitizer";
import compression from "compression";

const app = express();

// 1. Security HTTP Headers
app.use(helmet());

// 2. Enable CORS with stricter configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept"
  ],
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// 3. Rate limiting - 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later"
});
app.use(limiter);

// 4. Body parsers
app.use(express.json({ limit: "10kb" })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// 5. Cookie parser
app.use(cookieParser());

// 6. Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// 7. Data sanitization against XSS
app.use(xss());

// 8. Prevent parameter pollution
app.use(hpp());

// 9. Compression
app.use(compression());

// 10. Disable x-powered-by header
app.disable("x-powered-by");

// 11. Custom security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=()");
  next();
});

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", brainRouter);

// 12. Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// 13. Handle 404
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

export default app;