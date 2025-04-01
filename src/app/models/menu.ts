export interface Menu {
    day: string;
    idSnack: string;
    idLunch: string;
    id: string;
}

export interface MenuDatabase {
    name: string;
    calories: number;
    lactose: boolean;
    id: string;
    type: 'snack' | 'lunch';
}

export interface Snack {
    name: string;
    calories: number;
    gluten: boolean;
    lactose: boolean;
    id: string;
}

export interface Lunch {
    name: string;
    calories: number;
    gluten: boolean;
    id: string;
}