import { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Table,
  Modal,
  Button,
  Space,
  Popconfirm,
} from "antd";

import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import IMC from '../utils/IMC';

const { Content } = Layout;
const { Column } = Table;

function AlunoAcompanhamento() {
  const { alunoId } = useParams();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [aluno, setAluno] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestAvaliacoes = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`/aluno/${alunoId}`);
      setAluno(response.data);

      const { data } = await axios.get(`/avaliacao/aluno/${alunoId}`);
      const avaliacoesComIMC = data.map((avaliacao) => ({
        ...avaliacao,
        imc: IMC.getValor(avaliacao.peso, avaliacao.altura).toFixed(2),
        status: IMC.getNivel(IMC.getValor(avaliacao.peso, avaliacao.altura)),
      }));
      setAvaliacoes(avaliacoesComIMC);
    } catch (error) {
      console.warn(error);
      Modal.error({
        title:
          "Não foi possível carregar as avaliacoes, tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestAvaliacoes();
  }, []);

  const removeAvaliacao = async (avaliacaoId) => {
    try {
      setLoading(true);

      await axios.delete(`/avaliacao/${avaliacaoId}`);

      const novoAvaliacoes = [...avaliacoes];
      const index = novoAvaliacoes.findIndex(
        (avaliacao) => avaliacao.id === avaliacaoId
      );

      novoAvaliacoes.splice(index, 1);

      setAvaliacoes(novoAvaliacoes);
    } catch (error) {
      console.warn(error);
      Modal.error({
        title:
          "Não foi possível realizar a operação, tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  function calcularIdade(dataAvaliacao) {
    return dayjs(dataAvaliacao).diff(dayjs(aluno.data_nascimento), "year");
  }

  const renderActions = (aluno) => (
    <Button.Group>
      <Popconfirm
        title="Deseja excluir a avaliação?"
        okText="Sim, excluir"
        cancelText="Não, cancelar"
        onConfirm={() => {
          removeAvaliacao(aluno.id);
        }}
      >
        <Button icon={<DeleteOutlined />} />
      </Popconfirm>
    </Button.Group>
  );

  return (
    <Content>
      <br />
      <Space direction="vertical" style={{ display: "flex" }}>
        <Row justify="center">
          <Col span={23}>
            <Table
              dataSource={avaliacoes}
              pagination
              loading={loading}
              rowKey={(task) => task.id}
            >
              <Column
                title="Idade"
                dataIndex="data_avaliacao"
                key="data_avaliacao"
                render={(data) => calcularIdade(data)}
              />
              <Column title="Altura (m)" dataIndex="altura" key="idade" />
              <Column title="Peso (kg)" dataIndex="peso" key="peso" />
              <Column
                title="IMC"
                dataIndex="imc"
                key="imc"
                render={(imc) => `${imc} kg/m²`}
              />
              <Column
                title="Status"
                dataIndex="status"
                key="status"
              />
              <Column
                title="Data da Avaliação"
                dataIndex="data_avaliacao"
                key="data_avaliacao"
                render={(data) => dayjs(data).format("DD/MM/YYYY")}
              />
              <Column title="Ações" key="acoes" render={renderActions} />
            </Table>
          </Col>
        </Row>
      </Space>
    </Content>
  );
}

export default AlunoAcompanhamento;
