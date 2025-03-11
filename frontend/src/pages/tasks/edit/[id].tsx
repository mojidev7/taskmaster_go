// frontend/src/pages/tasks/edit/[id].tsx
import { useState, useEffect } from "react";
import { Container, Spinner, Center, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import TaskForm from "@/components/TaskForm";
import { TaskService } from "@/services/api";
import { Task } from "@/types";

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const data = await TaskService.getTaskById(Number(id));
          setTask(data);
        } catch (error) {
          toast({
            title: "Error fetching task",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          router.push("/");
        } finally {
          setLoading(false);
        }
      };

      fetchTask();
    }
  }, [id, router, toast]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      {task && <TaskForm initialData={task} isEditing={true} />}
    </Container>
  );
}
