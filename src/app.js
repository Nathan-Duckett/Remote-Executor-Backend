import express from 'express';

let PORT = 4000;

async function startServer() {
  const app = express();


  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.get('/', (req, res) => {
    res.send("Hello World!");
  })

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });

  app.listen(PORT, err => {
    if (err) {
      console.log(err);
      process.exit(1);
      return;
    }

    console.log("Server started on port " + PORT);
  });

}

startServer();