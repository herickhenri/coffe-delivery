import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div>
      <h1>Página nao encontrada</h1>
      <Link to={'/'}>Voltar para a home</Link>
    </div>
  )
}
