package repositories

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/go-redis/redis/v8"
	"gorm.io/gorm"

	"github.com/mojidev7/taskmaster/models"
)

type TaskRepository struct {
	DB    *gorm.DB
	Redis *redis.Client
}

func NewTaskRepository(db *gorm.DB, redis *redis.Client) *TaskRepository {
	return &TaskRepository{
		DB:    db,
		Redis: redis,
	}
}

func (r *TaskRepository) GetAllTasks(ctx context.Context) ([]models.Task, error) {
	cacheKey := "tasks:all"
	cachedTasks, err := r.Redis.Get(ctx, cacheKey).Result()
	if err == nil {
		var tasks []models.Task
		if err := json.Unmarshal([]byte(cachedTasks), &tasks); err == nil {
			return tasks, nil
		}
		return tasks, nil
	}

	var tasks []models.Task
	if err:= r.DB.Find(&tasks).Error; err != nil {
		return nil, err
	}
	tasksJSON, _ := json.Marshal(tasks)
	r.Redis.Set(ctx, cacheKey, tasksJSON, 5*time.Minute)

	return tasks, nil
}

func (r *TaskRepository) GetTaskByID(ctx context.Context, id uint) (*models.Task, error) {
	cacheKey := fmt.Sprintf("tasks:%d", id)
	cachedTask, err := r.Redis.Get(ctx, cacheKey).Result()
	if err == nil {
		var task models.Task
		if err := json.Unmarshal([]byte(cachedTask), &task); err == nil {
			return &task, nil
		}
		return nil, nil
	}

	var task models.Task
	if err := r.DB.First(&task, id).Error; err != nil {
		return nil, err
	}
	taskJSON, _ := json.Marshal(task)
	r.Redis.Set(ctx, cacheKey, taskJSON, 5*time.Minute)

	return &task, nil
}

func (r *TaskRepository) CreateTask(ctx context.Context, task *models.Task) error {
	if err := r.DB.Create(task).Error; err != nil {
		return err
	}

	cacheKey := fmt.Sprintf("tasks:%d", task.ID)
	taskJSON, _ := json.Marshal(task)
	r.Redis.Set(ctx, cacheKey, taskJSON, 5*time.Minute)
	r.Redis.Del(ctx, "tasks:all")

	return nil
}

func (r *TaskRepository) UpdateTask(ctx context.Context, task *models.Task) error {
	
	if err := r.DB.Save(task).Error; err != nil {
		return err
	}

	cacheKey := fmt.Sprintf("tasks:%d", task.ID)
	taskJSON, _ := json.Marshal(task)
	r.Redis.Set(ctx, cacheKey, taskJSON, 5*time.Minute)

	r.Redis.Del(ctx, "tasks:all")

	return nil
}

func (r *TaskRepository) DeleteTask(ctx context.Context, id uint) error {
	if err := r.DB.Delete(&models.Task{}, id).Error; err != nil {
		return err
	}

	cacheKey := fmt.Sprintf("tasks:%d", id)
	r.Redis.Del(ctx, cacheKey)
	r.Redis.Del(ctx, "tasks:all")

	return nil
}