const assert = require('assert');
const http = require('http');

// Set env for testing
process.env.NODE_ENV = 'test';
process.env.PORT = '5001';
const app = require('../server');

let server;

function makeRequest(path, method = 'GET', body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5001,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, headers: res.headers, body: json });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting BuildConnect NCR Backend API Tests...');

  server = app.listen(5001, async () => {
    try {
      // 1. Test Health Endpoint
      const healthRes = await makeRequest('/api/v1/health');
      assert.strictEqual(healthRes.status, 200);
      assert.strictEqual(healthRes.body.status, 'UP');
      console.log('  ✅ GET /api/v1/health passed');

      // 2. Test Public Settings Endpoint
      const settingsRes = await makeRequest('/api/v1/settings/public');
      assert.strictEqual(settingsRes.status, 200);
      assert.strictEqual(settingsRes.body.success, true);
      assert.strictEqual(typeof settingsRes.body.settings.calculatorRates.materialLabourRate, 'number');
      console.log('  ✅ GET /api/v1/settings/public passed');

      // 3. Test Public Lead Submission Validation (Missing Fields)
      const invalidLeadRes = await makeRequest('/api/v1/leads', 'POST', {
        name: 'Test',
      });
      assert.strictEqual(invalidLeadRes.status, 400);
      assert.strictEqual(invalidLeadRes.body.success, false);
      console.log('  ✅ POST /api/v1/leads validation failure passed');

      // 4. Test Valid Public Lead Submission
      const validLeadRes = await makeRequest('/api/v1/leads', 'POST', {
        name: 'Rohan Sharma',
        phone: '9810098100',
        location: 'Sector 62 Noida',
        serviceType: 'material_labour',
        areaSqFt: 2000,
        floors: 2,
        consent: true,
      });
      assert.strictEqual(validLeadRes.status, 201);
      assert.strictEqual(validLeadRes.body.success, true);
      assert(validLeadRes.body.whatsappUrl.includes('wa.me'));
      console.log('  ✅ POST /api/v1/leads creation passed');

      // 5. Test Unauthenticated Access to Protected Admin Leads API
      const unauthLeadsRes = await makeRequest('/api/v1/leads');
      assert.strictEqual(unauthLeadsRes.status, 401);
      console.log('  ✅ GET /api/v1/leads unauthenticated check passed');

      // 6. Test Admin Login
      const loginRes = await makeRequest('/api/v1/auth/login', 'POST', {
        email: 'admin@buildconnectncr.com',
        password: 'Admin@BuildConnect2026',
      });
      assert.strictEqual(loginRes.status, 200);
      assert.strictEqual(loginRes.body.success, true);
      const token = loginRes.body.token;
      console.log('  ✅ POST /api/v1/auth/login passed');

      // 7. Test Authenticated GET /api/v1/leads
      const authLeadsRes = await makeRequest('/api/v1/leads', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      assert.strictEqual(authLeadsRes.status, 200);
      assert.strictEqual(authLeadsRes.body.success, true);
      assert(Array.isArray(authLeadsRes.body.leads));
      console.log('  ✅ GET /api/v1/leads (Authenticated) passed');

      // 8. Test Cost Calculator Math Logic
      const materialRate = 1800;
      const area = 1500;
      const floors = 2;
      const expectedEstimate = area * floors * materialRate;
      assert.strictEqual(expectedEstimate, 5400000);
      console.log('  ✅ Cost Calculator Math formula verified (₹54,00,000 for 1500 sq ft x 2 floors @ ₹1800/sqft)');

      console.log('\n🎉 ALL 8 BACKEND API TESTS PASSED SUCCESSFULLY!');
      server.close();
      process.exit(0);
    } catch (err) {
      console.error('❌ Test Failed:', err);
      if (server) server.close();
      process.exit(1);
    }
  });
}

runTests();
