// frontend/src/pages/tasks/new.tsx
import { Container } from "@chakra-ui/react";
import TaskForm from "@/components/TaskForm";

export default function NewTask() {
  return (
    <Container maxW="container.md" py={8}>
      <TaskForm />
    </Container>
  );
}
