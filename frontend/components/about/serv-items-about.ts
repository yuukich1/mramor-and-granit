import { FileText, Hammer, Truck, Wrench } from "lucide-react";
export const SERVICES_ABOUT = [
  {
    icon: FileText,
    title: "Индивидуальный дизайн",
    description:
      "Разработка уникального дизайна памятника с учетом всех ваших пожеланий. Профессиональная 3D-визуализация проекта.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Hammer,
    title: "Изготовление",
    description:
      "Изготовление памятников из высококачественного гранита и мрамора. Использование современного оборудования и технологий.",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: Truck,
    title: "Доставка и установка",
    description:
      "Бережная доставка памятника на место установки. Профессиональный монтаж с соблюдением всех технологий.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Wrench,
    title: "Благоустройство",
    description:
      "Комплексное благоустройство захоронения: укладка плитки, установка оград, цветников и других элементов.",
    color: "from-purple-500 to-purple-600",
  },
] as const;
