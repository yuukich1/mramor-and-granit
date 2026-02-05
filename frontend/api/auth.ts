import axios from "axios";
import { LoginPayload } from "@/types/auth";

interface LoginResponse {
    access_token: string;
    token_type: string;
}

export const loginRequest = async (
    payload: LoginPayload
): Promise<LoginResponse> => {
    const params = new URLSearchParams();
    params.append("username", payload.username);
    params.append("password", payload.password);

    const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        params,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data;
};
