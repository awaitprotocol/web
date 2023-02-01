import Image from "next/image"
import image from "@/assets/images/error.svg"

type Props = {
  error: string
}

export const ErrorWindow = ({ error }: Props) => {
  return (
    <div className="alert alert-error shadow-lg">
      <div>
        <Image src={image} alt="close" />
        <span>{error}</span>
      </div>
    </div>
  )
}
