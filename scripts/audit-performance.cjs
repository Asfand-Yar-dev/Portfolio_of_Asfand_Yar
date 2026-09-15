// Install Lighthouse into the ignored qa/tools directory before running.
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const fs = require("node:fs");
(async () => {
  const { default: lighthouse } =
    await import("../qa/tools/node_modules/lighthouse/core/index.js");
  const { default: desktop } =
    await import("../qa/tools/node_modules/lighthouse/core/config/desktop-config.js");
  const browser = await chromium.launch({
    headless: true,
    executablePath:
      process.env.CHROME_PATH ||
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
    args: ["--remote-debugging-port=9223"],
  });
  try {
    for (const mode of ["mobile", "desktop"]) {
      const result = await lighthouse(
        process.env.PORTFOLIO_URL || "http://127.0.0.1:3000",
        {
          port: 9223,
          output: ["json", "html"],
          logLevel: "error",
          onlyCategories: [
            "performance",
            "accessibility",
            "best-practices",
            "seo",
          ],
        },
        mode === "desktop" ? desktop : undefined,
      );
      fs.writeFileSync(`qa/lighthouse-${mode}.report.json`, result.report[0]);
      fs.writeFileSync(`qa/lighthouse-${mode}.report.html`, result.report[1]);
      console.log(
        mode,
        JSON.stringify({
          scores: Object.fromEntries(
            Object.entries(result.lhr.categories).map(([key, value]) => [
              key,
              Math.round(value.score * 100),
            ]),
          ),
          metrics: Object.fromEntries(
            [
              "largest-contentful-paint",
              "total-blocking-time",
              "cumulative-layout-shift",
            ].map((key) => [key, result.lhr.audits[key].displayValue]),
          ),
          runtimeError: result.lhr.runtimeError,
        }),
      );
    }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
