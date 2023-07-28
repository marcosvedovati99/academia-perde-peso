import {
  Button,
  Card,
  Col,
  Form,
  Layout,
  Row,
  Typography,
  Modal,
  notification,
  Switch,
} from "antd";

import { useEffect, useState } from "react";
import axios from "axios";

import InputText from "../components/InputText";
import LocalStorageHelper from "../helpers/localstorage-helper";
import FormSelect from "../components/FormSelect";
import IMC from '../utils/IMC';

const { Content } = Layout;
const { Title } = Typography;

function CalculoIMC() {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [alunosSelect, setAlunosSelect] = useState([]);
  const [isStudent, setIsStudent] = useState(false);

  const requestAlunos = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/aluno");

      const formattedItems = data.map((aluno) => ({
        value: aluno.id,
        label: aluno.nome,
      }));
      setAlunosSelect(formattedItems);

      setAlunos(data);
    } catch (error) {
      console.warn(error);
      Modal.error({
        title:
          "Não foi possível carregar a lista de alunos, tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestAlunos();
  }, []);

  const calcularIMC = async () => {
    try {
      setLoading(true);
      const id_professor = LocalStorageHelper.getUsuarioId();
      
      const { id_aluno, peso, altura, sexo } = formValues;

      if (!peso?.value || !altura?.value || (!isStudent && !sexo?.value)) {
        Modal.error({
          title: "Por favor, preencha todos os campos obrigatórios.",
        });
        return;
      }

      const body = {
        id_aluno: id_aluno?.value,
        id_professor: id_professor,
        data_avaliacao: new Date(),
        peso: peso.value,
        altura: altura.value,
      };

      const imc = IMC.getValor(body.peso,body.altura);
      const status = IMC.getNivel(imc);

      if(id_aluno?.value) {
        await axios.post("/avaliacao", body);
      }
    
      notification.success({ message: `IMC ${imc.toFixed(2)} - ${status}` , duration: 5000});
    } catch (error) {
      console.warn(error);
      const { response } = error;
      if (response?.status === 401) {
        Modal.error({
          title: "Erro ao Calcular o IMC",
        });
      } else {
        Modal.error({
          title:
            "Não foi possível calcular o IMC no momento, tente novamente mais tarde.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, input } = event;

    if (name === "id_aluno") {
      const aluno = alunos.filter((aluno) => aluno.id === input.value);
      setFormValues({
        ...formValues,
        [name]: input,
        sexo: aluno.sexo,
      });
      return;
    }

    setFormValues({
      ...formValues,
      [name]: input,
    });
  };

  const handleStudentSwitchChange = (checked) => {
    setIsStudent(checked);
  };

  return (
    <Content>
      <Row justify="center">
        <Col xs={24} sl={14} md={12} lg={15} xl={8}>
          <Card style={{ margin: 24 }}>
            <Title
              level={3}
              type="secondary"
              style={{ textAlign: "center", marginTop: 8 }}
            >
              Calcular IMC
            </Title>

            <Form layout="vertical">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Switch
                  checked={isStudent}
                  onChange={handleStudentSwitchChange}
                />
                <span style={{ marginLeft: 10 }}>É Aluno</span>
              </div>
              {isStudent && (
                <FormSelect
                  name="id_aluno"
                  label="Aluno(a)"
                  size="large"
                  placeholder="Selecione um Aluno"
                  onChange={handleInputChange}
                  options={alunosSelect}
                  disabled={loading}
                  showSearch
                  value={formValues.id_aluno?.value}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                  }
                  required
                />
              )}
              {!isStudent && (
                <FormSelect
                  name="sexo"
                  label="Sexo da Pessoa"
                  size="large"
                  placeholder="Selecione o Sexo da Pessoa"
                  onChange={handleInputChange}
                  options={[
                    { value: "M", label: "Masculino" },
                    { value: "F", label: "Feminino" },
                  ]}
                  disabled={loading}
                  value={formValues.sexo?.value}
                  required
                />
              )}
              <InputText
                name="altura"
                label="Altura"
                size="large"
                type="number"
                onChange={handleInputChange}
                disabled={loading}
                value={formValues.altura?.value}
                required
              />
              <InputText
                name="peso"
                label="peso"
                size="large"
                type="number"
                onChange={handleInputChange}
                disabled={loading}
                value={formValues.peso?.value}
                required
              />

              <Button
                block
                type="primary"
                size="large"
                onClick={calcularIMC}
                loading={loading}
              >
                Calcular
              </Button>
            </Form>

            <br />
          </Card>
        </Col>
      </Row>
    </Content>
  );
}

export default CalculoIMC;
