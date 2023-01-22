import { BallTriangle } from "react-loader-spinner"

export default function LoadingSpinner() {
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
