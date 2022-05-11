import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookie from 'cookie-parser';
import fingerprint from 'express-fingerprint';

/**
 * Initializes an Express application.
 * @param cookieSecret string used for signing cookies.
 * This is optional and if not specified, will not parse signed cookies.
 * If a string is provided, this is used as the secret.
 * @returns `express.Application` object
 */
export default function initialization(
    cookieSecret?: string
): express.Application {
    let app = express();

    app.use(helmet());
    app.use(cors());

    app.use(cookie(cookieSecret));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(fingerprint());

    return app;
}
