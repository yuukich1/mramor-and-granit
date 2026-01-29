import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function MapInfoDesktop() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-1/2 left-89 -translate-y-1/2 bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl max-w-sm"
        >
            <h2 className="text-4xl font-serif text-neutral-900 mb-6">
                Мрамор и Гранит
            </h2>

            <div className="space-y-4 text-neutral-700">
                <Item icon={MapPin} text="Самарская область, Волжский район, сельское поселение Черноречье, село Черноречье, улица Нижние Пески, 10" />
                <Item icon={Phone} text="+7 (927) 766-09-33" />
                <Item icon={Phone} text="+7 (937) 989-01-53" />
                <Item icon={Clock} text="09:00 – 17:00" />
            </div>
        </motion.div>
    );
}

function Item({
    icon: Icon,
    text,
}: {
    icon: React.ElementType;
    text: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg">
                <Icon className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm">{text}</span>
        </div>
    );
}
