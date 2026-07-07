/**
 * One-time script to generate bcrypt hashes for admin and staff passwords.
 * Run: node utils/generateHashes.js
 * Copy the output hashes into server/.env
 * Delete this file after use.
 */
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 12;

async function generate() {
  const adminPass = process.env.ADMIN_PASS || 'Adminsjc123';
  const staffPass = process.env.STAFF_PASS || 'sjcstaff123';

  const adminHash = await bcrypt.hash(adminPass, SALT_ROUNDS);
  const staffHash = await bcrypt.hash(staffPass, SALT_ROUNDS);

  console.log('\n=== COPY THESE INTO server/.env ===');
  console.log(`ADMIN_PASS_HASH=${adminHash}`);
  console.log(`STAFF_PASS_HASH=${staffHash}`);
  console.log('====================================\n');
}

generate();
