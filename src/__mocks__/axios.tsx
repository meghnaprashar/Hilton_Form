import Promise from "bluebird";
import rooms from "./room.data.json";
import { BACKEND_BASE_URL } from "../Constants";

const ROOMS_ENDPOINT = new URL("/rooms", BACKEND_BASE_URL);
const REQUESTS_ENDPOINT = new URL("/requests", BACKEND_BASE_URL);

export default {
  get: jest.fn(url => {
    if (url === `${ROOMS_ENDPOINT}`) {
      return Promise.resolve({
        data: rooms
      });
    }
  }),
  post: jest.fn((url, requests) => {
    if (url === `${REQUESTS_ENDPOINT}`) {
      return Promise.resolve({
        data: requests
      });
    }
  }),
  create: jest.fn(function() {
    return this;
  }),
  CancelToken: {
    source: jest.fn(() => new AbortController())
  }
};
