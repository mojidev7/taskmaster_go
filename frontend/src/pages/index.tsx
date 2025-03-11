// frontend/src/pages/index.tsx
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { TaskService } from "@/services/api";
import { Task } from "@/types";
import TaskList from "@/components/TaskList";
import Link from "next/link";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await TaskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      toast({
        title: "Error fetching tasks",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container maxW="container.md" py={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Heading>TaskMaster</Heading>
        <Link href="/tasks/new" passHref>
          <Button as="a" colorScheme="blue">
            Create New Task
          </Button>
        </Link>
      </Flex>

      {loading ? (
        <Flex justifyContent="center" my={12}>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Box>
          <TaskList tasks={tasks} refetch={fetchTasks} />
        </Box>
      )}
    </Container>
  );
}
