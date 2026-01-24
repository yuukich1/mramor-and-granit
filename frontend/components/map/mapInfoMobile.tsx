import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, X, ChevronUp, ChevronDown } from "lucide-react";

interface Props {
    open: boolean;
    onToggle: () => void;
}

export function MapInfoMobile({ open, onToggle }: Props) {
    return (
        <>
            <motion.button
                onClick={onToggle}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-black bg-white/90 backdrop-blur-xl rounded-full px-6 py-3 shadow-lg flex items-center gap-2"
            >
                {open ? <ChevronDown /> : <ChevronUp />}
                {open ? "Скрыть информацию" : "Показать информацию"}
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.4 }}
                        className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-3xl p-6 shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-serif text-black">Мрамор и Гранит</h3>
                            <button className="text-black" onClick={onToggle}>
                                <X />
                            </button>
                        </div>

                        <div className="space-y-4 text-neutral-700">
                            <Row icon={MapPin} text="Самара, Матросова, 100" />
                            <Row icon={Phone} text="+7 (927) 766-09-33" />
                            <Row icon={Mail} text="info@krasnoebeloye.ru" />
                            <Row icon={Clock} text="09:00 – 17:00" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function Row({
    icon: Icon,
    text,
}: {
    icon: React.ElementType;
    text: string;
}) {
    return (
        <div className="flex gap-3">
            <Icon className="w-5 h-5 text-amber-600 mt-1" />
            <span>{text}</span>
        </div>
    );
}
