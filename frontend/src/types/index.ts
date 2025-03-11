// frontend/src/types/index.ts
export type Task = {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    due_date?: string;
    created_at: string;
    updated_at: string;
};

export type TaskFormData = {
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    due_date?: string;
};