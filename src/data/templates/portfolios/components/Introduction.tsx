import { IntroductionProps } from "../types";

export function Introduction_01({ title, subtitle, description }: IntroductionProps) {
  return (
    <section className="text-red-300">
      <div className="flex flex-col">
        <h1 className="text-pretty text-large">{title}</h1>
        <h2 className="tetx-md">{subtitle}</h2>
        <p className="intro-description">{description}</p>
      </div>
    </section>
  );
}

export function Introduction_02({ title, subtitle, description }: IntroductionProps) {
  return (
    <section className="bg-orange-400">
      <div className="p-4">
        <h1 className="intro-title">{title}</h1>
        <h2 className="intro-subtitle">{subtitle}</h2>
        <p className="intro-description">{description}</p>
      </div>
    </section>
  );
}
