import { Button, Col, Form, Modal, notification, Row, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import { useEffect, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import InputText from "../components/InputText";
import FormSelect from "../components/FormSelect";
import FormDatePicker from "../components/FormDatePicker";
import dayjs from "dayjs";

function AlunoCreatePage() {
  const { alunoId } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback(
    (event) => {
      const { name, input } = event;

      setFormValues({
        ...formValues,
        [name]: input,
      });
    },
    [formValues]
  );

  const requestTask = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(`/aluno/${alunoId}`);

      const { data } = response;

      setFormValues({
        nome: {
          value: data.nome,
          valid: true,
        },
        sexo: {
          value: data.sexo,
          valid: true,
        },
        dataNascimento: {
          value: dayjs(data.data_nascimento),
          valid: true,
        },
      });
    } catch (error) {
      console.warn(error);
      Modal.error({
        title:
          "Não foi possível carregar os dados do aluno, tente novamente mais tarde.",
      });
      navigate("/alunos");
    } finally {
      setLoading(false);
    }
  }, [alunoId, navigate]);

  useEffect(() => {
    if (alunoId) {
      requestTask();
    } else {
      setFormValues({});
    }
  }, [requestTask, alunoId]);

  const handleCreateTask = useCallback(async () => {
    try {
      let message
      setLoading(true);

      const { nome, sexo, dataNascimento } = formValues;
      if (!nome?.valid) return;

      const body = {
        nome: nome.value,
        sexo: sexo.value,
        data_nascimento: dataNascimento.value,
      };

      if (alunoId) {
        await axios.put(`/aluno/${alunoId}`, body);
        message = "Aluno atualizado com sucesso!"
      } else {
        await axios.post("/aluno", body);
        message = "Aluno cadastrado com sucesso!"
      }

      notification.success({ message });

      navigate("/alunos");
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: "Não foi cadastrar-se, tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  }, [formValues, navigate, alunoId]);

  return (
    <Content>
      <br />
      <Space direction="vertical" style={{ display: "flex" }}>
        <Row justify="center">
          <Col xs={23} sl={14} md={12} lg={10} xl={8}>
            <Form layout="vertical">
              <InputText
                name="nome"
                label="Nome do Aluno"
                size="large"
                onChange={handleInputChange}
                disabled={loading}
                required
                value={formValues.nome?.value}
              />
              <FormDatePicker
                name="dataNascimento"
                label="Data de nascimento"
                size="large"
                format="DD/MM/YYYY"
                onChange={handleInputChange}
                value={formValues.dataNascimento?.value}
              />
              <FormSelect
                name="sexo"
                label="Sexo do Aluno"
                size="large"
                placeholder="Selecione o Sexo do Aluno"
                onChange={handleInputChange}
                options={[
                  { value: "M", label: "Masculino" },
                  { value: "F", label: "Feminino" },
                ]}
                disabled={loading}
                required
                value={formValues.sexo?.value}
              />
              <Button
                block
                type="primary"
                size="large"
                onClick={handleCreateTask}
                loading={loading}
              >
                Salvar
              </Button>
            </Form>
          </Col>
        </Row>
      </Space>
    </Content>
  );
}

export default AlunoCreatePage;
