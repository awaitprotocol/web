type Props = {
  error: string
}

const ErrorWindow = ({ error }: Props) => {
  return (
    <div className="server-error">
      <h2 className="danger">{error}</h2>
    </div>
  )
}

export default ErrorWindow
