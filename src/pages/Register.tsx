import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerApi } from '../api/auth';

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = (): string => {
    if (!name.trim()) return 'O nome é obrigatório.';
    if (name.length > 100) return 'O nome deve ter no máximo 100 caracteres.';
    if (!email.trim()) return 'O email é obrigatório.';
    if (password.length < 8) return 'A senha deve ter no mínimo 8 caracteres.';
    if (password.length > 72) return 'A senha deve ter no máximo 72 caracteres.';
    return '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setLoading(true);

    try {
      await registerApi({ name, email, password });
      navigate('/login', { state: { registered: true } });
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 409) {
        setError('Este email já está cadastrado.');
      } else {
        const messages = err.response?.data?.message?.message;
        if (Array.isArray(messages)) {
          setError(messages[0]);
        } else {
          setError('Erro ao criar conta. Tente novamente.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Nossas Notas</h1>
        <p className="login-subtitle">Criar nova conta</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              required
              disabled={loading}
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="auth-link">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
