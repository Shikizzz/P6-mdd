import { Theme } from "../../themes/interfaces/theme.class";

export class SessionInformation {
    constructor(
        public token: string,
        public id: number,
        public username: string,
        public email: string,
        public themes: Theme[]
    ) { }

}