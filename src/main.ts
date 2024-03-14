// import './assets/main.css'
import { createApp } from "vue";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

import App from "./App.vue";
import router from "./router";
import  store  from "./stores/store";
const app = createApp(App);

app.use(router);
app.provide('store', store);
app.use(store)


app.mount("#app");
