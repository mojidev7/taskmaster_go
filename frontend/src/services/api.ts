// frontend/src/services/api.ts
import axios from 'axios';
import { Task } from '@/types';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const TaskService = {
    getAllTasks: async (): Promise<Task[]> => {
        const response = await apiClient.get('/tasks');
        return response.data;
    },

    getTaskById: async (id: number): Promise<Task> => {
        const response = await apiClient.get(`/tasks/${id}`);
        return response.data;
    },

    createTask: async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> => {
        const response = await apiClient.post('/tasks', task);
        return response.data;
    },

    updateTask: async (task: Task): Promise<Task> => {
        const response = await apiClient.put(`/tasks/${task.id}`, task);
        return response.data;
    },

    deleteTask: async (id: number): Promise<void> => {
        await apiClient.delete(`/tasks/${id}`);
    },
};