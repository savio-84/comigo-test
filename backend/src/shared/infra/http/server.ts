import { app } from "./app";
import { env } from '../../../config/env';

app.listen(env.PORT, () => {
  switch (env.NODE_ENV) {
    case 'development':
      console.log(`Server is running on http://localhost:${env.PORT} 🚀 `);
      break;

    case 'test':
      console.log(`Server is running on http://localhost:${env.PORT} 🚀 `);
      break;
    
    default:
      console.log(`Server is running on http://localhost:${env.PORT} 🚀 `);
  }
});