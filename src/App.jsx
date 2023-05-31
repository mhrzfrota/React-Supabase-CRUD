import React,{useState, useEffect} from 'react';
import { supabase } from './createClient';
import './App.css'

const App = () => {

  const [veiculos,setUsers]=useState([])

  const [veiculo,setUser]=useState({
    descricao:'',preco:''
  })

  const [veiculo2,setUser2]=useState({
    id:'',descricao:'',preco:''
  })



  console.log(veiculo2)


  useEffect(() => {
    fetchUsers()
  }, [])
  

  async function fetchUsers(){
    const {data} = await supabase
      .from('veiculos')
      .select('*')
      setUsers(data)



  }

  function handleChange(event) {
    setUser(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      };
    });
  }
  

  function handleChange2(event) {
    setUser2(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    });
  }
  

  async function createUser(event) {
    event.preventDefault();
  
    try {
      const { data, error } = await supabase
        .from('veiculos')
        .insert([{ descricao: veiculo.descricao, preco: veiculo.preco }]);
  
      if (error) {
        console.error(error);
      }
  
      if (data) {
        console.log('Veículo criado com sucesso!');
        fetchUsers();
        setUser({ descricao: '', preco: '' });
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  
  

  async function deleteUser(veiculoId){

    const { data, error } = await supabase
      .from('veiculos')
      .delete()
      .eq('id', veiculoId)

    fetchUsers()
    
    
    if (error){
      console.log(error)
    }

    if (data){
      console.log(data)
    }




  }

  function displayUser(veiculoId) {
    veiculos.map(veiculo => {
      if (veiculo.id === veiculoId) {
        setUser2({ id: veiculo.id, descricao: veiculo.descricao, preco: veiculo.preco });
      }
    });
  }
  


  async function updateUser(veiculoId) {
    const { data, error } = await supabase
      .from('veiculos')
      .update({ descricao: veiculo2.descricao, preco: veiculo2.preco })
      .eq('id', veiculoId);
  
    fetchUsers();
  
    if (error) {
      console.log(error);
    }
  
    if (data) {
      console.log(data);
    }
  }
  
  

  return (
    <div>

      {/* FORM 1 */}
      <form onSubmit={createUser}>
        <input 
          type="text"
          placeholder="Descrição"
          name='descricao'
          onChange={handleChange}
        
        />
        <input 
          type="number"
          placeholder="Preço"
          name='preco'
          onChange={handleChange}
        
        />
        <button type='submit'>Create</button>

      </form>




      {/* FORM 2 */}
      <form onSubmit={()=>updateUser(veiculo2.id)}>
        <input 
          type="text"
          name='descricao'
          onChange={handleChange2}
          defaultValue={veiculo2.descricao}
        
        />
        <input 
          type="number"
          name='preco'
          onChange={handleChange2}
          defaultValue={veiculo2.preco}

        
        />
        <button type='submit'>Save Changes</button>

      </form>



      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Actions</th>

          </tr>
        </thead>

        <tbody>
          {veiculos.map((veiculo)=>
            <tr key={veiculo.id}>
              <td>{veiculo.id}</td>
              <td>{veiculo.descricao}</td>
              <td>{veiculo.preco}</td>
              <td>
                <button onClick={()=>{deleteUser(veiculo.id)}}>Delete</button>
                <button onClick={()=>{displayUser(veiculo.id)}}>Edit</button>
              
              </td>

            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App