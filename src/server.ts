import dotenv from 'dotenv';
import setupApp from './main/config/app';

dotenv.config();

const PORT = parseInt(`${process.env.PORT || 4003}`);

const app = setupApp();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
