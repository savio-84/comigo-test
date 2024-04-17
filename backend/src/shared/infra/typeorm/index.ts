import { AppDataSource } from './data-source';

AppDataSource.initialize()
// eslint-disable-next-line no-console
.then(() => console.log('Database connection initialized! 📈'))
.catch(error => {
  // eslint-disable-next-line no-console
  console.error('Error in database connection! ⚠');
  // eslint-disable-next-line no-console
  console.log(error);
});