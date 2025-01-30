import axios from 'axios';

const api = axios.create({ // Cria uma instância do axios
    baseURL: 'http://localhost:3000' // URL da minha API
    
});

export default api; // Exporta a instância do axios, porque é ela que vai ser usada para fazer as requisições HTTP na pasta pages/home/index.jsx