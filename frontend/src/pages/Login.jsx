import { Button, Card, Col, Form, Layout, Row, Typography, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import Logo from '../assets/peso.png';
import InputText from '../components/InputText';
import LocalStorageHelper from '../helpers/localstorage-helper';

const { Content } = Layout;
const { Title } = Typography;

function LoginPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const { login, senha } = formValues;

      if (!login?.valid || !senha?.valid) return;

      const body = {
        login: login.value,
        senha: senha.value,
      };

      const response = await axios.post('/professor/login', body);

      const { token } = response.data;

      LocalStorageHelper.setToken(token);

      navigate('/alunos');
    } catch (error) {
      console.warn(error);
      const { response } = error;
      if (response?.status === 401) {
        Modal.error({
          title: 'Login ou senha inválidos',
        });
      } else {
        Modal.error({
          title: 'Não foi possível entrar no momento, tente novamente mais tarde.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, input } = event;

    setFormValues({
      ...formValues,
      [name]: input,
    });
  };

  return (
    <Content>
      <Row
        justify="center"
      >
        <Col xs={24} sl={14} md={12} lg={10} xl={8}>
          <Card style={{ margin: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <img
                src={Logo}
                alt="Logotipo"
                style={{ maxWidth: '80%' }}
              />
            </div>
            <Title
              level={3}
              type="secondary"
              style={{ textAlign: 'center', marginTop: 8 }}
            >
              Faça login para continuar
            </Title>

            <Form layout="vertical">
              <InputText
                name="login"
                label="Login"
                size="large"
                onChange={handleInputChange}
                required
                disabled={loading}
                value={formValues.login?.value}
              />

              <InputText
                name="senha"
                label="Senha"
                size="large"
                required
                type="password"
                onChange={handleInputChange}
                disabled={loading}
                value={formValues.senha?.value}
              />

              <Button
                block
                type="primary"
                size="large"
                onClick={handleLogin}
                loading={loading}
              >
                Entrar
              </Button>
            </Form>

            <br />

            <Typography.Text>
              Entao não possui conta?
              {' '}
              <Link
                to="/cadastro"
                className="ant-btn ant-btn-link ant-btn-lg ant-btn-block"
              >
                Cadastre-se
              </Link>
            </Typography.Text>

          </Card>
        </Col>
      </Row>
    </Content>
  );
}

export default LoginPage;
