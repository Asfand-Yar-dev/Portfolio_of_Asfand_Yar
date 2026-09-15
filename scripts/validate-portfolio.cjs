/* Run against a local production server. Set PLAYWRIGHT_PATH to a bundled
   Playwright installation, or install Playwright in a separate QA environment. */
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:3000";
const errors = [];
const checks = [];
const pass = (message) => {
  checks.push(message);
  console.log(`PASS ${message}`);
};

(async () => {
  fs.mkdirSync("qa", { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.addInitScript(() => {
      window.__metrics = { cls: 0, lcp: 0 };
      new PerformanceObserver((list) =>
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) window.__metrics.cls += entry.value;
        }),
      ).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((list) => {
        window.__metrics.lcp = list.getEntries().at(-1).startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
    });
    const response = await page.goto(base, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200);
    const html = await response.text();
    assert.match(html, /AI Powered Voice Agent/);
    assert.match(html, /Snake Game Arcade/);
    assert.match(html, /Developers Hub Corporation/);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
      "https://asfandyar.tech",
    );
    assert.equal(
      await page.locator('meta[property="og:image"]').getAttribute("content"),
      "https://asfandyar.tech/social-preview.png",
    );
    assert.equal(
      await page.locator('meta[name="twitter:card"]').getAttribute("content"),
      "summary_large_image",
    );
    assert(
      !/noindex/i.test(
        await page
          .locator('meta[name="robots"]')
          .evaluateAll((nodes) =>
            nodes.map((node) => node.getAttribute("content")).join(" "),
          ),
      ),
    );
    const schema = JSON.parse(
      await page.locator('script[type="application/ld+json"]').textContent(),
    );
    assert(schema["@graph"].some((item) => item["@type"] === "Person"));
    assert(schema["@graph"].some((item) => item["@type"] === "ProfilePage"));
    pass(
      "Static HTML includes project and experience content, one H1, canonical and social metadata, and valid JSON-LD",
    );

    for (const route of [
      "/Asfand_Yar.pdf",
      "/robots.txt",
      "/sitemap.xml",
      "/favicon.ico",
      "/favicon.png",
      "/logo.svg",
      "/Gemini_Generated_Image_xjz4kjxjz4kjxjz4.png",
      "/asfand-yar.webp",
      "/social-preview.png",
    ]) {
      const result = await context.request.get(`${base}${route}`);
      assert.equal(result.status(), 200, route);
      if (route.endsWith(".pdf"))
        assert((await result.body()).subarray(0, 5).toString() === "%PDF-");
      if (route === "/robots.txt") {
        const body = await result.text();
        assert.match(body, /Allow: \//);
        assert.match(body, /https:\/\/asfandyar.tech\/sitemap.xml/);
        assert(!body.includes("Disallow: /"));
      }
      if (route === "/sitemap.xml")
        assert.match(
          await result.text(),
          /<loc>https:\/\/asfandyar.tech<\/loc>/,
        );
    }
    assert.equal(
      (await context.request.get(`${base}/nonexistent-page`)).status(),
      404,
    );
    pass(
      "Original public URLs, resume PDF, robots, sitemap, new assets and proper 404 response",
    );

    const brokenAnchors = await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="#"]')]
        .map((a) => a.getAttribute("href").slice(1))
        .filter((id) => !document.getElementById(id)),
    );
    assert.deepEqual(brokenAnchors, []);
    assert.equal(
      await page.locator('a[href="mailto:asfandyar273263@gmail.com"]').count(),
      2,
    );
    assert(
      (await page
        .locator('a[href="https://github.com/Asfand-Yar-dev"]')
        .count()) > 0,
    );
    assert(
      (await page
        .locator('a[href="https://www.linkedin.com/in/asfandyar100/"]')
        .count()) > 0,
    );
    for (const id of [
      "home",
      "about",
      "experience",
      "projects",
      "skills",
      "services",
      "contact",
    ]) {
      await page.goto(`${base}/#${id}`, { waitUntil: "networkidle" });
      assert.equal(await page.locator(`#${id}`).count(), 1);
    }
    pass(
      "All existing fragment targets and original contact/social destinations retained",
    );

    await page.goto(base, { waitUntil: "networkidle" });
    await page.screenshot({ path: "qa/desktop-hero.png" });
    await page.screenshot({ path: "qa/desktop-full.png", fullPage: true });
    const initialMetrics = await page.evaluate(() => window.__metrics);
    assert(initialMetrics.cls < 0.1, `CLS ${initialMetrics.cls}`);
    pass(
      `Local browser metrics: CLS ${initialMetrics.cls.toFixed(4)}, LCP ${Math.round(initialMetrics.lcp)}ms (unthrottled, not field data)`,
    );
    await page.keyboard.press("Tab");
    assert(
      await page
        .locator(".skip-link")
        .evaluate((el) => el === document.activeElement),
    );
    await page.keyboard.press("Enter");
    assert(
      await page
        .locator("#main")
        .evaluate((el) => el === document.activeElement),
    );
    pass("Keyboard skip link moves focus to the main content");
    await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
    let accessibility = await page.evaluate(
      async () =>
        await window.axe.run(document, {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
          },
        }),
    );
    fs.writeFileSync(
      "qa/accessibility-dark.json",
      JSON.stringify(accessibility.violations, null, 2),
    );
    assert.deepEqual(
      accessibility.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      [],
    );
    pass("Dark theme: no automated WCAG A/AA accessibility violations");

    await page.getByRole("button", { name: "Switch to light theme" }).click();
    await page.waitForFunction(
      () => document.documentElement.dataset.theme === "light",
    );
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(
      await page.locator("html").getAttribute("data-theme"),
      "light",
    );
    await page.screenshot({ path: "qa/light-hero.png" });
    await page.screenshot({ path: "qa/light-full.png", fullPage: true });
    await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
    accessibility = await page.evaluate(
      async () =>
        await window.axe.run(document, {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
          },
        }),
    );
    fs.writeFileSync(
      "qa/accessibility-light.json",
      JSON.stringify(accessibility.violations, null, 2),
    );
    assert.deepEqual(
      accessibility.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      [],
    );
    pass(
      "Light theme persists after reload and has no automated WCAG A/AA violations",
    );
    await page.getByRole("button", { name: "Switch to dark theme" }).click();

    for (const width of [
      320, 360, 390, 600, 768, 899, 900, 1024, 1280, 1440, 1920,
    ]) {
      await page.setViewportSize({ width, height: 900 });
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `overflow at ${width}px`,
      );
    }
    pass("No horizontal overflow at 11 widths from 320px to 1920px");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base, { waitUntil: "networkidle" });
    const menu = page.locator(".mobile-menu");
    await menu.locator("summary").click();
    assert.equal(await menu.getAttribute("open"), "");
    await page.screenshot({ path: "qa/mobile-menu.png" });
    await page.keyboard.press("Escape");
    assert.equal(await menu.getAttribute("open"), null);
    assert(
      await menu
        .locator("summary")
        .evaluate((el) => el === document.activeElement),
    );
    await menu.locator("summary").click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Projects", exact: true })
      .click();
    await page.waitForURL("**/#projects");
    assert.equal(await menu.getAttribute("open"), null);
    assert(
      await page
        .locator("#projects")
        .evaluate((el) => el === document.activeElement),
    );
    await page.locator(".project-details").first().locator("summary").click();
    assert.equal(
      await page.locator(".project-details").first().getAttribute("open"),
      "",
    );
    assert.equal(await page.locator(".archive-list article").count(), 5);
    assert.equal(await page.locator("#projects article").count(), 10);
    for (const article of await page.locator("#projects article").all())
      assert(await article.isVisible());
    assert.equal(
      await page
        .getByRole("link", {
          name: "View code: Developer Portfolio",
          exact: true,
        })
        .getAttribute("href"),
      "https://github.com/Asfand-Yar-dev/Portfolio_of_Asfand_Yar",
    );
    assert.equal(
      await page
        .getByRole("link", {
          name: "View code: Snake Game Arcade",
          exact: true,
        })
        .getAttribute("href"),
      "https://github.com/Asfand-Yar-dev/Snake-Game-Arcade-in-Python",
    );
    assert.equal(await page.locator(".portrait, .hero img").count(), 0);
    await page.locator(".project-details").first().locator("summary").click();
    await page.goto(base, { waitUntil: "networkidle" });
    await page.screenshot({ path: "qa/mobile-hero.png" });
    await page.screenshot({ path: "qa/mobile-full.png", fullPage: true });
    pass(
      "Mobile navigation and focus; all ten projects visible, verified code links, portrait removed",
    );

    const reduced = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const reducedPage = await reduced.newPage();
    await reducedPage.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...args) {
        if (type.includes("webgl")) return null;
        return original.call(this, type, ...args);
      };
    });
    await reducedPage.goto(base, { waitUntil: "networkidle" });
    await reducedPage.locator(".compute-core").hover();
    assert.equal(
      await reducedPage
        .locator(".core-pointer")
        .evaluate((el) => getComputedStyle(el).transform),
      "none",
    );
    assert.equal(
      await reducedPage
        .locator("html")
        .evaluate((el) => getComputedStyle(el).scrollBehavior),
      "auto",
    );
    assert(await reducedPage.locator(".core-stage").isVisible());
    pass(
      "Reduced motion disables transformation and smooth scrolling; visual works without WebGL",
    );
    const nojs = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const staticPage = await nojs.newPage();
    await staticPage.goto(base);
    assert(
      await staticPage
        .getByRole("heading", { name: "Asfand Yar." })
        .isVisible(),
    );
    await staticPage.locator(".mobile-menu summary").click();
    assert(
      await staticPage
        .getByRole("navigation", { name: "Mobile navigation" })
        .isVisible(),
    );
    await staticPage.locator(".mobile-menu summary").click();
    assert(
      await staticPage
        .getByRole("heading", { name: "Snake Game Arcade" })
        .isVisible(),
    );
    pass(
      "Without JavaScript: content, SVG, native mobile menu, and all projects remain usable",
    );
    assert.deepEqual(errors, []);
    pass("No browser console errors, runtime exceptions or hydration errors");
    fs.writeFileSync(
      path.join("qa", "validation.json"),
      JSON.stringify({ checks, metrics: initialMetrics, errors }, null, 2),
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
