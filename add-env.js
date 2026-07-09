const fs = require('fs');
const { spawn } = require('child_process');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function readEnv(key) {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  const lines = envFile.split('\n');
  for (const line of lines) {
    if (line.startsWith(key + '=')) {
      return line.substring(key.length + 1).trim().replace(/['"]/g, '');
    }
  }
  return null;
}

function addVercelEnv(key, value, envType) {
  return new Promise((resolve, reject) => {
    const child = spawn('npx.cmd', ['vercel', 'env', 'add', key, envType, 'restore/production-2026-07-08'], {
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
      env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: '0' }
    });

    let output = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
      if (data.toString().includes('What’s the value of')) {
        child.stdin.write(value + '\n');
        child.stdin.end();
      }
    });

    child.stderr.on('data', (data) => {
      output += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(`Failed with code ${code}: ${output}`));
    });
    
    child.stdin.write(value + '\n');
    child.stdin.end();
  });
}

async function run() {
  const url = readEnv('NEXT_PUBLIC_SUPABASE_URL');
  const key = readEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  if (!url || !key) return process.exit(1);

  try {
    await addVercelEnv('NEXT_PUBLIC_SUPABASE_URL', url, 'preview');
    await addVercelEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', key, 'preview');
    console.log("SUCCESS");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();
