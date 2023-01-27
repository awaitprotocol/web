import { BallTriangle } from "react-loader-spinner"

const LoadingSpinner = () => {
  return (
    <div className="spinner">
      <BallTriangle
        height={40}
        width={40}
        radius={5}
        color="#633dede0"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </div>
  )
}
export default LoadingSpinner
