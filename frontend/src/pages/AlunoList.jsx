import { useEffect, useState } from 'react';
import { Layout, Row, Col, Table, Modal, Button, Space, Popconfirm } from 'antd';

import axios from 'axios';
import { DeleteOutlined, EyeOutlined, FormOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const { Content } = Layout;
const { Column } = Table;

function AlunoListPage() {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestAlunos = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get('/aluno');
      
      setAlunos(data);
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível carregar a lista de alunos, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestAlunos();
  }, []);

  const removeAluno = async (alunoId) => {
    try {
      setLoading(true);

      await axios.delete(`/aluno/${alunoId}`);

      const novoTarefas = [...alunos];
      const index = novoTarefas.findIndex((aluno) => aluno.id === alunoId);

      novoTarefas.splice(index, 1);

      setAlunos(novoTarefas);
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível processar, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderActions = (aluno) => (
    <Button.Group>
      <Button
        onClick={() => {
          navigate(`/acompanhamento/aluno/${aluno.id}`);
        }}
        icon={<EyeOutlined />}
      />
      <Button
        onClick={() => {
          navigate(`/aluno/${aluno.id}`);
        }}
        icon={<FormOutlined />}
      />
      <Popconfirm
        title="Deseja excluir o aluno?"
        okText="Sim, excluir"
        cancelText="Não, cancelar"
        onConfirm={() => {
          removeAluno(aluno.id);
        }}
      >
        <Button
          icon={<DeleteOutlined />}
        />
      </Popconfirm>
    </Button.Group>
  );

  return (
    <Content>
      <br />
      <Space direction="vertical" style={{ display: 'flex' }}>

        <Row justify="center">
          <Col span={23}>

            <Table
              dataSource={alunos}
              pagination
              loading={loading}
              rowKey={(task) => task.id}
            >
              <Column
                title="ID"
                dataIndex="id"
                key="id"
              />
              <Column
                title="Nome"
                dataIndex="nome"
                key="nome"
              />
              <Column
                title="Sexo"
                dataIndex="sexo"
                key="sexo"
              />
              <Column
                title="Data de Nascimento"
                dataIndex="data_nascimento"
                key="data_nascimento"
                render={(data) => dayjs(data).format('DD/MM/YYYY')}
              />
              <Column
                title="Ações"
                key="acoes"
                render={renderActions}
              />
            </Table>
          </Col>
        </Row>
      </Space>
    </Content>
  );
}

export default AlunoListPage;
