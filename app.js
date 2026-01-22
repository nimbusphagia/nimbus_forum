import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
const app = express();

// App setup
const _dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(_dirname, 'public')));
app.set('views', path.join(_dirname, 'src/views'));
app.set('view engine', 'pug');

// Routes

app.get('/', (req, res) => res.render('home'));

// Error catching middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;

  console.error(err);

  res.status(status).json({
    error: {
      message: err.expose ? err.message : 'Internal Server Error',
    },
  });
});


// Server start
const server = app.listen(process.env.PORT, () => {
  console.log('Server listening on port', process.env.PORT);
});

server.on('error', (err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});

