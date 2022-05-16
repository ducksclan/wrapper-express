import { Generator } from '@ducksclan/utils';
import jwt from 'jsonwebtoken';

/**
 * Template for custom token payload
 */
export interface TokenPayload extends Record<string, string> {}

export interface TokensPair {
    access: string;
    refresh: string;
}

export interface ExpiresInOptions {
    access: string | number;
    refresh: string | number;
}

interface RsaKeys {
    publicKey: string;
    privateKey: string;
}

export default class JsonWebToken<Payload extends TokenPayload = TokenPayload> {
    protected secret: string;
    protected keys: RsaKeys;

    constructor() {
        this.keys = Generator.rsa();
        this.secret = Generator.sequence(40);
    }

    /**
     * In the event of a private key leak,
     * all keys can be updated by this method,
     * however, in this case, all issued tokens will be invalid
     */
    updateSecrets() {
        this.keys = Generator.rsa();
        this.secret = Generator.sequence(100);
    }

    /**
     * public key for access token verification
     */
    get publicKey() {
        return this.keys.publicKey;
    }

    /**
     * Generates jwt tokens pair with the given payload
     */
    generateTokensPair(
        payload: Payload,
        expiresIn?: ExpiresInOptions
    ): TokensPair {
        const accessOptions: jwt.SignOptions = {
            algorithm: 'RS256',
            expiresIn: expiresIn?.access || '10m',
        };
        const refreshOptions: jwt.SignOptions = {
            algorithm: 'HS256',
            expiresIn: expiresIn?.refresh || '7d',
        };

        return {
            access: jwt.sign(payload, this.keys.privateKey, accessOptions),
            refresh: jwt.sign(payload, this.secret, refreshOptions),
        };
    }

    decodeToken(token: string) {
        return jwt.decode(token) as any;
    }

    verifyAccess(token: string) {
        return jwt.verify(token, this.publicKey) as any;
    }

    verifyRefresh(token: string) {
        return jwt.verify(token, this.secret) as any;
    }

    /**
     * Access token verification function for customers.
     */
    static verifyAccess(token: string, publicKey: string | Buffer) {
        return jwt.verify(token, publicKey) as any;
    }
}
