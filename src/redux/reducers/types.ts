export type todoList = {
    _id: string;
    title: string;
    completed: boolean;
    user: string | number | undefined;
    imageUrl: string;
    tags: [string | number | undefined];
    text: string;
    priority: number;
}

export type todoState = {
    list: todoList[];
    loading: boolean;
    error: any;
}
export type removeTodos = {
    _id: string;
}
export type changeStatuss = {
    _id: string;
}