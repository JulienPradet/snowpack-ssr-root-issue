const { join } = require("path");
const { startServer, loadConfiguration } = require("snowpack");

const run = async () => {
  const snowpackConfig = await loadConfiguration(
    {
      root: join(__dirname, "../client"),
      mount: {
        src: "/",
      },
    },
    join(__dirname, "./snowpack.config.json")
  );

  const server = await startServer({
    config: snowpackConfig,
    lockfile: null,
  });
  const runtime = server.getServerRuntime();

  const module = await runtime.importModule("/example.js");
  console.log(module.exports.default());
};

run();
