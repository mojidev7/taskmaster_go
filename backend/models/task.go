package models

import (
	"time"
	"gorm.io/gorm"
)

type Task struct {
	ID 	  uint           `json:"id" gorm:"primarykey"`
	Title string         `json:"title" gorm:"not null"`
	Description string   `json:"description"`
	Status string        `json:"status" grom:"defualt:pending"`
	DueDate *time.Time   `json:"due_date"`
	CreatedAt time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"` 
}

type TaskStatus string

const (
	TaskStatusPending TaskStatus = "pending"
	TaskStatusCompleted TaskStatus = "completed"
	TaskStatusInProgress TaskStatus = "in_progress"
)