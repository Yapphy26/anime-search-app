import FuzzyText from "@/components/FuzzyText";
import type { FC } from "react";

interface NotFoundProps { }

const NotFound: FC<NotFoundProps> = () => {
  return (
    <>
      <span className="text-primary flex justify-center">
        <FuzzyText
          baseIntensity={0.1}
          hoverIntensity={0.4}
          enableHover={true}
        >
          404
        </FuzzyText>
      </span>
      <h1 className="text-primary flex justify-center mt-4">
        <FuzzyText
          baseIntensity={0.1}
          hoverIntensity={0.2}
          enableHover={true}
          fontSize={"clamp(20px, 8vw, 12px)"}
        >
          Page Not Found
        </FuzzyText>
      </h1>
    </>
  );
}

export default NotFound;