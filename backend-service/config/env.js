import { config } from "dotenv";

config({path: `.env.${process.env.NODE_ENV || "development"}.local`});

export const { PORT,
     NODE_ENV,
      Mongodb_URI,
       JWT_SECRET,
        JWT_EXPIRES_IN,
         GROQ_API_KEY,
          TAVILY_API_KEY,
        FRONTEND_URL } = process.env;