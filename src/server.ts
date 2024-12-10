import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import filmRouter from "@/api/film/filmRouter";
import filmFunctionRouter from "@/api/filmFunction/filmFunctionRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import ticketRouter from "@/api/ticket/ticketRouter";
import { userRouter } from "@/api/user/userRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { requireAuth } from "@/common/middleware/requireAuth";
import { env } from "@/common/utils/envConfig";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
const apiRouter = express.Router();
app.use(apiRouter);

apiRouter.use("/health-check", healthCheckRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/films", requireAuth, filmRouter);
apiRouter.use("/film-functions", requireAuth, filmFunctionRouter);
apiRouter.use("/tickets", requireAuth, ticketRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
