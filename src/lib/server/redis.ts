import { REDIS_KEY } from "$env/static/private";
import Redis from "ioredis";

export const redis_client = new Redis(REDIS_KEY);
