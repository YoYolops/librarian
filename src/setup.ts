import dotenv from 'dotenv';

const configEnv: any = {
    test: ".env.test",
    dev: ".env.dev",
    prod: ".env.prod"
}

const enviromentVariablesPath = configEnv[process.env.NODE_ENV];

dotenv.config({
    path: enviromentVariablesPath,
})