// frontend/src/components/TaskForm.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Task, TaskFormData } from "@/types";
import { TaskService } from "@/services/api";
import { useRouter } from "next/router";

interface TaskFormProps {
  initialData?: Task;
  isEditing?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  isEditing = false,
}) => {
  const toast = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    status: initialData?.status || "pending",
    due_date: initialData?.due_date
      ? new Date(initialData.due_date).toISOString().split("T")[0]
      : undefined,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing && initialData) {
        await TaskService.updateTask({
          ...initialData,
          ...formData,
        });
        toast({
          title: "Task updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await TaskService.createTask(formData);
        toast({
          title: "Task created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      router.push("/");
    } catch (error) {
      toast({
        title: "Error saving task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <VStack spacing={4} align="stretch">
        <Heading size="lg">
          {isEditing ? "Edit Task" : "Create New Task"}
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task title"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Task description"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Due Date</FormLabel>
              <Input
                name="due_date"
                type="date"
                value={formData.due_date}
                onChange={handleChange}
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" mt={4}>
              {isEditing ? "Update Task" : "Create Task"}
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default TaskForm;
