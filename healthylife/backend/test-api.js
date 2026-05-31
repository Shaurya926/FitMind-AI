// Quick test script for HealthyLife API
const http = require('http');

function testAPI(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                console.log(`${method} ${path}`);
                console.log(`Status: ${res.statusCode}`);
                console.log(`Response: ${data}\n`);
                resolve({ status: res.statusCode, body: data });
            });
        });

        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function runTests() {
    console.log('🧪 Testing HealthyLife API\n');

    try {
        // Test 1: Register
        console.log('✅ Test 1: Register User');
        await testAPI('POST', '/api/users/register', {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });

        // Test 2: Login
        console.log('✅ Test 2: Login User');
        const loginRes = await testAPI('POST', '/api/users/login', {
            email: 'test@example.com',
            password: 'password123'
        });

        console.log('✅ Test 3: Get non-existent route (should return index.html)');
        await testAPI('GET', '/');

        console.log('✅ Test 4: Invalid API route (should return 404)');
        await testAPI('GET', '/api/invalid-route');

        console.log('✅ All tests completed!');
    } catch (error) {
        console.error('❌ Test failed:', error);
    }

    process.exit(0);
}

runTests();
