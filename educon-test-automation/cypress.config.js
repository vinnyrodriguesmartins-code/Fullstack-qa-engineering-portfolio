const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const addCucumberPreprocessorPlugin = preprocessor.addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  projectId: "nuc2ai",
  video: false,
  screenshotOnRunFailure: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 100000,
  pageLoadTimeout: 100000,
  requestTimeout: 100000,

  fixturesFolder: "cypress/fixtures",

  e2e: {
    retries: {
      // runMode: 1,
      // openMode: 1,
    },

    baseUrl: "https://areaaluno.educon-stg.afya.systems/",
    downloadsFolder: "cypress/downloads",
    numTestsKeptInMemory: 1,
    experimentalMemoryManagement: true,
    chromeWebSecurity: false,
    scrollBehavior: "center",
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.js",

    env: {
      stepDefinitions: "cypress/e2e/step_definitions/**/*.js",  // Verifique se o caminho está correto
      // TAGS: '@teste'
    },

    async setupNodeEvents(on, config) {
      // Cucumber Preprocessor
      await addCucumberPreprocessorPlugin(on, config);

      // Esbuild + Cucumber plugin
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Task personalizada para verificar arquivos .xlsx
      on("task", {
        checkIfXlsxFileExists(folder) {
          const files = fs.readdirSync(folder);
          return files.some((file) => file.endsWith(".xlsx"));
        },
      });

      // Ajustes específicos para o Chrome
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push("--disk-cache-size=0");
          launchOptions.args.push("--disable-http2");
        }
        return launchOptions;
      });

      // Plugin Allure
      allureWriter(on, config);

      return config;
    }
  }
});
