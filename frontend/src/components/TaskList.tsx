// frontend/src/components/TaskList.tsx
import React from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Badge,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Task } from "@/types";
import { TaskService } from "@/services/api";
import { useRouter } from "next/router";

interface TaskListProps {
  tasks: Task[];
  refetch: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, refetch }) => {
  const toast = useToast();
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "yellow";
      case "in_progress":
        return "blue";
      case "completed":
        return "green";
      default:
        return "gray";
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await TaskService.deleteTask(id);
      toast({
        title: "Task deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error deleting task.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/tasks/edit/${id}`);
  };

  return (
    <VStack spacing={4} align="stretch" width="100%">
      <Heading size="lg">Tasks</Heading>
      {tasks.length === 0 ? (
        <Text>No tasks found. Create one to get started!</Text>
      ) : (
        tasks.map((task) => (
          <Box
            key={task.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="sm"
          >
            <HStack justifyContent="space-between" mb={2}>
              <Heading size="md">{task.title}</Heading>
              <Badge colorScheme={getStatusColor(task.status)}>
                {task.status.replace("_", " ")}
              </Badge>
            </HStack>
            <Text mb={2}>{task.description}</Text>
            {task.due_date && (
              <Text fontSize="sm" color="gray.600" mb={2}>
                Due: {format(new Date(task.due_date), "MMM dd, yyyy")}
              </Text>
            )}
            <HStack spacing={2} mt={4}>
              <Button size="sm" onClick={() => handleEdit(task.id)}>
                Edit
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </HStack>
          </Box>
        ))
      )}
    </VStack>
  );
};

export default TaskList;
