type Props = {
  error: string
}

export const ErrorWindow = ({ error }: Props) => {
  return (
    <div className="server-error">
      <h2 className="danger">{error}</h2>
    </div>
  )
}
