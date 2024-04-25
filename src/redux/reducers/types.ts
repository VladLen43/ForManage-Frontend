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
export type user = {
    _id: string;
    fullName: string;
    email: string;
}

export type userData = {
    data: user | null,
    status: string;
}