import { Button, Card, Col, Form, Layout, Row, Typography, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import axios from 'axios';

import Logo from '../assets/peso.png';
import InputText from '../components/InputText';

const { Content } = Layout;
const { Title } = Typography;

function CadastroPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});

  const [loading, setLoading] = useState(false);

  const handleSubscription = useCallback(async () => {
    try {
      setLoading(true);

      const { nome, login, senha } = formValues;

      if (!nome?.valid || !login?.valid || !senha?.valid) return;

      const body = {
        nome: nome.value,
        login: login.value,
        senha: senha.value,
      };

      await axios.post('/professor', body);

      Modal.success({
        title: 'Cadastro realizado com sucesso!',
      });

      navigate('/login');
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Ooopps, não foi possível cadastrar o usuário no momento.',
      });
    } finally {
      setLoading(false);
    }
  }, [formValues, navigate]);

  const handleInputChange = useCallback((event) => {
    const { name, input } = event;

    setFormValues({
      ...formValues,
      [name]: input,
    });
  }, [formValues]);

  return (
    <Content>
      <Row
        justify="center"
      >
        <Col xs={24} sm={14} md={12} lg={10} xl={8}>
          <Card style={{ margin: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <img
                src={Logo}
                alt="Logotipo"
                style={{ maxWidth: '80%' }}
              />
            </div>

            <Title
              level={2}
              type="secondary"
              style={{ textAlign: 'center', marginTop: 8 }}
            >
              Cadastre-se
            </Title>

            <Form layout="vertical">
              <InputText
                name="nome"
                label="Nome"
                size="large"
                onChange={handleInputChange}
                disabled={loading}
                required
                value={formValues.nome?.value}
              />

              <InputText
                name="login"
                label="Login"
                size="large"
                onChange={handleInputChange}
                disabled={loading}
                required
                value={formValues.login?.value}
              />

              <InputText
                name="senha"
                label="Senha"
                type="password"
                size="large"
                onChange={handleInputChange}
                disabled={loading}
                autoComplete="new-password"
                required
                value={formValues.senha?.value}
              />

              <Button
                block
                type="primary"
                size="large"
                onClick={handleSubscription}
                loading={loading}
              >
                Cadastrar
              </Button>
            </Form>

            <br />

            <Typography.Text>
              Voltar para o
              {' '}
              <Link
                to="/login"
                className="ant-btn ant-btn-link ant-btn-lg ant-btn-block"
              >
                Login
              </Link>
            </Typography.Text>
          </Card>
        </Col>
      </Row>
    </Content>
  );
}

export default CadastroPage;
