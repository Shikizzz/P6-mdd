import { Theme } from "../../themes/interfaces/theme.class";

export interface UserInformationDTO {
    id: number;
    username: string;
    email: string;
    themes: Theme[];
}