import { useEffect, useState, useRef } from 'react' // Importa o hook useEffect do React para fazer requisições à API quando a página for carregada pela primeira vez 
import './style.css'  // Importa o arquivo de estilos
import Tresh from '../../assets/icons8-lixo.svg' // Importa a imagem do ícone de lixeira
import api from '../../services/api' // Importa a instância do axios que foi criada em src/services/api.js

function Home() {

  const [users, setUsers] = useState([]) // Cria um estado chamado users que vai armazenar os usuários que foram cadastrados 

  const [name, setName] = useState('') // Cria um estado chamado name que vai armazenar o nome do usuário que foi digitado no input e uma função setName que vai atualizar o estado name quando um novo nome for digitado

  const inputName = useRef(); // Cria uma referência chamada inputName que vai armazenar o input do nome do usuário
  const inputAge = useRef(); // Cria uma referência chamada inputAge que vai armazenar o input da idade do usuário
  const inputEmail = useRef(); // Cria uma referência chamada inputEmail que vai armazenar o input do email do usuário


  async function getUsers() {

    const usersFromApi = await api.get('/usuarios') // Faz uma requisição GET para a rota /usuarios da minha API e armazena a resposta na variável usersFromApi

    setUsers(usersFromApi.data); // Atribui o array de usuários que foi retornado pela API à variável users usando a função setUsers que foi criada pelo useState
  }

  async function createUsers() { // Função que é chamada quando o botão de cadastrar é clicado 
    await api.post('/usuarios', { // Faz uma requisição POST para a rota /usuarios da minha API e envia um objeto com os dados do usuário que foram digitados nos inputs
      name: inputName.current.value, // Acessa o valor do input do nome do usuário
      age: inputAge.current.value,  // Acessa o valor do input da idade do usuário
      email: inputEmail.current.value // Acessa o valor do input do email do usuário
    }) 
    getUsers() // Chama a função getUsers() para fazer a requisição à API
  }

  async function deleteUser(id) { // Função que é chamada quando o botão de excluir é clicado
    await api.delete(`/usuarios/${id}`) // Faz uma requisição DELETE para a rota /usuarios/:id da minha API e envia o id do usuário que foi clicado
    getUsers() // Chama a função getUsers() para fazer a requisição à API
  }

  useEffect(() => { // useEffect é um hook do React que é executado quando a página é carregada pela primeira vez
    getUsers() // Chama a função getUsers() para fazer a requisição à API
  }, []) // O segundo parâmetro do useEffect é um array vazio, o que significa que a função getUsers() só vai ser chamada uma vez, quando a página for carregada pela primeira vez


  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usúarios</h1>
        <input type='text' name='nome' id='nome' maxLength={20} required placeholder="Nome" ref={inputName} />  
        <input type='number' name='idade' id='idade' maxLength={3} required placeholder="Idade" ref={inputAge} />
        <input type='email' name='e-mail' id='e-mail' maxLength={30} required placeholder="E-mail" ref={inputEmail}/>

        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>
      {users.map((user) => ( // map é um método que percorre cada elemento de um array
        <div key={user.id} className='card'>    
          <div>
            <p>Nome:  <span>{user.name}</span></p> 
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUser(user.id)}> 
            <img src={Tresh} alt='Excluir Usuário' />
          </button>
        </div>
 
      )) } 
      

    </div>

  )
}

export default Home // Exporta o componente Home para ser utilizado em outros arquivos
