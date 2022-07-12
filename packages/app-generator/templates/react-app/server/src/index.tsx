import {
  createIfNotExistLocalCache,
  getIndexHtmlContent,
  getPageFromCache,
  getServerInfo,
  storePageInCache,
} from "./utils";
import express from "express";
import path from "path";
import http from "http";

// constants needed externally
const { port, publicDir, pages, pythonPort, publicUrlAssetMap } =
  getServerInfo(__dirname);
const appDistHtml = path.resolve(publicDir, "index.html");

createIfNotExistLocalCache();

const app = express();
const disablePageCache = process.argv.includes("--disable-cache");

app.use((req, res, next) => {
  if (req.method === "GET" && pages[req.originalUrl]) {
    if (!disablePageCache) {
      const finalTextFromCache = getPageFromCache(req.originalUrl);
      if (finalTextFromCache) {
        res.send(finalTextFromCache);
        return;
      }
    }
    // read again App.jsx for dev server
    const getAppTextPath = path.resolve(
      __dirname,
      "..",
      "app-node",
      "static",
      "js",
      "app.bundle.js"
    );
    delete require.cache[getAppTextPath];
    const getAppText = require(getAppTextPath)["getAppText"]["getAppText"];
    const appHtmlContent = getIndexHtmlContent(appDistHtml);
    const finalText = getAppText(req.originalUrl, appHtmlContent);
    res.send(finalText);
    storePageInCache(req.originalUrl, finalText);
  } else {
    next();
  }
});

app.post("/event-handler", express.json(), (req, res) => {
  console.log("event handler recieved");
  const pageRoute = req.body["pageRoute"];
  const pageState = req.body["pageState"];
  const alias = req.body["alias"];
  const callbackName = req.body["callbackName"];
  const eventData = req.body["eventData"];
  if (
    typeof pageRoute !== "string" ||
    typeof pageState !== "object" ||
    typeof alias !== "string" ||
    typeof callbackName !== "string"
  ) {
    res.status(400).send();
    return;
  }
  console.log(pageRoute, pageState, alias, callbackName, eventData);
  // TODO: update pageState if success python call otherwise 501
  const payload = JSON.stringify({
    route: pageRoute,
    state: pageState,
    alias,
    callbackName,
    eventData,
  });
  const forward_req = http.request(
    {
      hostname: `0.0.0.0`,
      port: pythonPort,
      path: "/event",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": payload.length,
      },
    },
    (forward_res) => {
      console.log(`STATUS: ${forward_res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(forward_res.headers)}`);
      forward_res.setEncoding("utf8");
      let data = "";
      forward_res.on("data", (chunk) => {
        data = data + chunk;
      });
      forward_res.on("end", () => {
        try {
          const newPageState = JSON.parse(data);
          res.status(200).send({ pageState: newPageState });
        } catch (err) {
          console.log("Unexpected Forward Response\n", err);
          res.status(501).send();
        }
      });
    }
  );
  forward_req.on("error", (e) => {
    console.error(`problem with request: ${e.message}`);
    res.status(501).send();
  });
  forward_req.write(payload);
  forward_req.end();
});

Object.keys(publicUrlAssetMap).forEach((url) => {
  app.use(url, express.static(publicUrlAssetMap[url]!));
});

app.use(express.static(publicDir));

const server = app.listen(port, () => {
  const address = server.address();
  if (typeof address === "object" && address !== null) {
    let port = address.port;
    let ip = address.address;
    console.log(`[ATRI_SERVER] listening on http://${ip}:${port}`);
  } else if (typeof address === "string") {
    console.log(`[ATRI_SERVER] listening on http://${address}`);
  } else {
    console.log(`[ATRI_SERVER] cannot listen on ${port}`);
  }
});