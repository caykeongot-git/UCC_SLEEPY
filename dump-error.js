const fs = require('fs');
const { execSync } = require('child_process');
try {
  const out = execSync('npm run build', { encoding: 'utf-8', stdio: 'pipe' });
  fs.writeFileSync('build-out.txt', "SUCCESS\n" + out);
} catch (e) {
  fs.writeFileSync('build-out.txt', "FAILED\nSTDOUT:\n" + (e.stdout || '') + "\nSTDERR:\n" + (e.stderr || '') + "\nMSG:\n" + e.message);
}
