import { defineNuxtConfig } from 'nuxt'
import dotenv from "dotenv";
dotenv.config({path: "../.env"});

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: {
    server: {
      proxy: {
        '/api': {
          target: "http://localhost:" + process.env.SERVER_PORT,
          changeOrigin: true,
        },
        '/oauth': {
          target: "http://localhost:" + process.env.SERVER_PORT,
          changeOrigin: true,
        }
      }
    }
  }
})
