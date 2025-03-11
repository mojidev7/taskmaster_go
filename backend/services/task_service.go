package services

import (
	"context"

	"github.com/mojidev7/taskmaster/models"
	"github.com/mojidev7/taskmaster/repositories"
)

type TaskService struct {
	taskRepo *repositories.TaskRepository
}

func newTaskService(taskRepo *repositories.TaskRepository) *TaskService {
	return &TaskService{
		taskRepo: taskRepo,
	}
}

func (s *TaskService) GetAllTasks(ctx context.Context) ([]models.Task, error) {
	return s.taskRepo.GetAllTasks(ctx)
}

func (s *TaskService) GetTaskByID(ctx context.Context, id uint) (*models.Task, error) {
	return s.taskRepo.GetTaskByID(ctx, id)
}

func (s *TaskService) CreateTask(ctx context.Context, task *models.Task) error {
	return s.taskRepo.CreateTask(ctx, task)
}

func (s *TaskService) UpdateTask(ctx context.Context, task *models.Task) error {
	return s.taskRepo.UpdateTask(ctx, task)
}

func (s *TaskService) DeleteTask(ctx context.Context, id uint) error {
	return s.taskRepo.DeleteTask(ctx, id)
}

