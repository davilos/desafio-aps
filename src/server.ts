import { app } from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`APS-api está rodando em http://localhost:${port}`);
});
