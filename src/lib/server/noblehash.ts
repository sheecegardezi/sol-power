import { argon2id } from '@noble/hashes/argon2';

export async function generateArgon2idHash(password: string) {
	const salt = '11111110'; //<- change this maybe a const per user or something
	const hash = await argon2id(password, salt, { t: 2, m: 19000, p: 1 }); //<- maybe min recommended settings
	const saltBase64 = btoa(salt);
	const hashBase64 = btoa(String.fromCharCode(...new Uint8Array(hash)));
	return `$argon2id$v=19$m=19000,t=2,p=1$${saltBase64}${hashBase64}`;
}
