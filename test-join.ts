import { generateToken } from './src/server/auth';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function test() {
  const token = generateToken({ id: '03d6ade3-1ae6-445d-93aa-8ad3cd13bb4d' });
  const res = await fetch('http://localhost:5173/api/user/sessions/Panel%20Test%20-%20Randhir/join', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Response:', text);
}

test();
