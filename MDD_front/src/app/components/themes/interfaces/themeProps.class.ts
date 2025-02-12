import { Theme } from "./theme.class";

export class ThemeProps {
    constructor(
        public theme: Theme,
        public isSubscribed: boolean
    ) { }
}