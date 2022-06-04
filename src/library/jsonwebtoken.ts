import { ApiError, ClientError, ServerError } from '../errors';
import { Generator } from '@ducksclan/utils';
import {
    JsonWebTokenError,
    NotBeforeError,
    TokenExpiredError,
} from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

interface RsaKeys {
    publicKey: string;
    privateKey: string;
}

/**
 * Template for custom token payload
 */
export interface JwtPayload
    extends jwt.JwtPayload,
        Record<string, string | undefined | null> {}

export interface TokensPair {
    access: string;
    refresh: string;
}

export interface ExpiresInOptions {
    access: string | number;
    refresh: string | number;
}

export default class JsonWebToken<Payload extends JwtPayload = JwtPayload> {
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

    verifyAccess(token: string): Payload {
        try {
            return jwt.verify(token, this.publicKey) as Payload;
        } catch (error) {
            throw handleJWTError(error);
        }
    }

    verifyRefresh(token: string): Payload {
        try {
            return jwt.verify(token, this.secret) as Payload;
        } catch (error) {
            throw handleJWTError(error);
        }
    }

    /**
     * Access token verification function for customers.
     */
    static verifyAccess(token: string, publicKey: string | Buffer) {
        return jwt.verify(token, publicKey) as any;
    }
}

function handleJWTError(error: unknown): ApiError | unknown {
    if (
        error instanceof JsonWebTokenError ||
        error instanceof TokenExpiredError ||
        error instanceof NotBeforeError
    ) {
        return ClientError.Unauthorized(error.message);
    }

    return ServerError.InternalServerError();
}
