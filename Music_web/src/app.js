import './style.css';
import { generosController } from './views/Generos/generosController.js';


const main = document.querySelector('#main');
const div = document.createElement('div');

window.addEventListener("DOMContentLoaded", () => {
  generosController();
});