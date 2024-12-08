import { createHash } from 'crypto';

export class HashUtil {
     static hashcode(str: string): string {
        const hash = createHash('sha256');
        hash.update(str);
        return hash.digest('hex');
    }
}