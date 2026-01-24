import { z } from "zod";

export const CallbackScheme = z.object({
    fullname: z
        .string()
        .min(2, "введите имя")
        .max(50, "слишком длинное имя")
        .regex(/^[А-Яа-яA-Za-z\s-]+$/, "имя не должно содержать цифры"),

    phone: z
        .string()
        .regex(/^\+7\d{10}$/, "телефон должен быть в формате +7XXXXXXXXXX"),

    message: z
        .string()
        .max(1000, "слишком длинное сообщение")
});
