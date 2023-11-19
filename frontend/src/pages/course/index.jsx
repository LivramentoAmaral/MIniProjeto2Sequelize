import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert';

import './Course.css'; // Importando o arquivo de estilos CSS

const Course = () => {
  const apiURL = 'http://localhost:8000';
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [dataSelected, setDataSelected] = useState(null);
  const [modalData, setModalData] = useState({
    id: '',
    curso: '',
  });
  const [deleteModel, setDeleteModel] = useState({
    id: '',
    show: false,
  });

  const getData = async () => {
    try {
      const response = await axios.get(`${apiURL}/cursos`);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  const addCourse = async () => {
    try {
      const data = {
        curso: modalData.curso,
      };

      if (dataSelected) {
        await axios.put(`${apiURL}/cursos/${dataSelected.id}`, data);
      } else {
        await axios.post(`${apiURL}/cursos`, data);
      }

      setDataSelected(null);
      setModalData({
        id: '',
        curso: '',
      });
      setError(null);
      getData();
    } catch (error) {
      setError(error);
    }
  };

  const updateCourse = async (id) => {
    try {
      const response = await axios.get(`${apiURL}/cursos/${id}`);
      setDataSelected(response.data);
      setModalData({
        id: response.data.id,
        curso: response.data.curso,
      });
    } catch (error) {
      setError(error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      // Obter informações do curso pelo ID
      const cursoResponse = await axios.get(`${apiURL}/cursos/${id}`);
      const curso = cursoResponse.data.curso; // Suponha que 'nome' seja o campo do nome do curso
  
      const alunosMatriculadosResponse = await axios.get(`${apiURL}/alunoscurso/${id}`);
      const alunosMatriculados = alunosMatriculadosResponse.data;
  
      if (alunosMatriculados.length > 0) {
        Swal('Não é possível apagar o curso pois ele está vinculado a um aluno.');
      } else {
        Swal({
          title: 'Deseja excluir?',
          text: `Tem certeza que deseja excluir o curso ${curso}?`,
          icon: 'warning',
          buttons: ['Cancelar', 'Excluir'],
          dangerMode: true,
        }).then(async (willDelete) => {
          if (willDelete) {
            await axios.delete(`${apiURL}/cursos/${id}`);
            getData();
            Swal(`Curso "${curso}" excluído com sucesso.`, {
              icon: 'success',
            });
          }
        });
      }
    } catch (error) {
      setError(error);
    }
  };
  
  

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="course-container">
      <table className="course-table">
        <thead>
          <tr>
            <th>Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((course) => (
            <tr key={course.id}>
              <td>{course.curso}</td>
              <td>
                <button className="btn-edit" onClick={() => updateCourse(course.id)}>Editar</button>
                <button className="btn-excluir" onClick={() => deleteCourse(course.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="course-form">
        <form onSubmit={() => addCourse()}>
          <label htmlFor="curso">Curso</label>
          <input
            type="text"
            name="curso"
            id="curso"
            required
            value={modalData.curso}
            onChange={(e) =>
              setModalData({ ...modalData, curso: e.target.value })
            }
          />
          <button type="submit">
            {dataSelected ? 'Atualizar' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Course;
