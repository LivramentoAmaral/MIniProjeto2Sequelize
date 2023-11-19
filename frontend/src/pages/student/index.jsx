import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert';

import './Student.css'; // Importando o arquivo de estilos CSS

const Student = () => {
  const apiURL = 'http://localhost:8000';
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [dataCourse, setDataCourse] = useState([]);
  const [dataSelected, setDataSelected] = useState(null);
  const [modalData, setModalData] = useState({
    id: '',
    nome: '',
    email: '',
    cur_id: '',
  });

  const getData = async () => {
    try {
      const response = await axios.get(`${apiURL}/alunos`);
      const responseCourse = await axios.get(`${apiURL}/cursos`);
      setData(response.data);
      setDataCourse(responseCourse.data);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  const CourseStudentTake = (cur_id) => {
    const course = dataCourse.find((course) => course.id === cur_id);
    return course.curso;
  };

  const addStudent = async () => {
    try {
      const data = {
        nome: modalData.nome,
        email: modalData.email,
        cur_id: modalData.cur_id,
      };

      if (dataSelected) {
        await axios.put(`${apiURL}/alunos/${dataSelected.id}`, data);
      } else {
        await axios.post(`${apiURL}/alunos`, data);
      }

      setDataSelected(null);
      setModalData({
        id: '',
        nome: '',
        email: '',
        cur_id: '',
      });
      setError(null);
      getData();
    } catch (error) {
      setError(error);
    }
  };

  const updateStudent = async (id) => {
    try {
      const response = await axios.get(`${apiURL}/alunos/${id}`);
      setDataSelected(response.data);
      setModalData({
        id: response.data.id,
        nome: response.data.nome,
        email: response.data.email,
        cur_id: response.data.cur_id,
      });
    } catch (error) {
      setError(error);
    }
  };

  const deleteStudent = async (id) => {

    const aluno = data.find((student) => student.id === id).nome;

    try {
      Swal({
        title: 'Deseja excluir?',
        text: `Tem certeza deseja excluir o ${aluno}!`,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await axios.delete(`${apiURL}/alunos/${id}`);
          getData();
          Swal(`Aluno ${aluno} excluido com sucesso!`, {
            icon: 'success',
          });
        } 
      });
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="student-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <tr key={student.id}>
              <td>{student.nome}</td>
              <td>{student.email}</td>
              <td>{CourseStudentTake(student.cur_id)}</td>
              <td>
                <button className='btn-edit' onClick={() => updateStudent(student.id)}>
                  Editar
                </button>
                <button className='btn-excluir' onClick={() => deleteStudent(student.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="student-form">
        <form onSubmit={() => addStudent()}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            id="nome"
            required
            value={modalData.nome}
            onChange={(e) =>
              setModalData({ ...modalData, nome: e.target.value })
            }
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={modalData.email}
            onChange={(e) =>
              setModalData({ ...modalData, email: e.target.value })
            }
          />
          <label htmlFor="curso">Curso</label>
          <select
            name="curso"
            id="curso"
            required
            value={modalData.cur_id}
            onChange={(e) =>
              setModalData({ ...modalData, cur_id: e.target.value })
            }
          >
            <option value="">Selecione um curso</option>
            {dataCourse.map((course) => (
              <option key={course.id} value={course.id}>
                {course.curso}
              </option>
            ))}
          </select>

          <button type="submit">
            {dataSelected ? 'Atualizar' : 'Cadastrar'}
          </button>
        </form> 
      </div>
    </div>
  );
};

export default Student;
