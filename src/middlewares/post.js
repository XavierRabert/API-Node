app.post("/*", (req, res, next) => {
  // if (req.method !== "POST") return next();
  if (req.headers["content-type"] !== "application/json") return next();

  let body = "";
  //escoltar l'event data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    req.body = data;
    next();
  });
});
