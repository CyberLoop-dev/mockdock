const test = require("node:test");
const assert = require("node:assert/strict");
const { matchPath, createServer } = require("../server");
test("matches literal and parameter path segments", () => {
  assert.deepEqual(matchPath("/users/:id", "/users/42"), { id: "42" });
  assert.equal(matchPath("/users/:id", "/teams/42"), null);
  assert.equal(matchPath("/users/:id", "/users/42/posts"), null);
});
test("serves configured responses and fills path parameters", async () => {
  const server = createServer([{ method: "GET", path: "/users/:id", status: 201, body: { id: "{{id}}" } }]);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const response = await fetch(\`http://127.0.0.1:\${server.address().port}/users/7\`);
    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), { id: "7" });
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});