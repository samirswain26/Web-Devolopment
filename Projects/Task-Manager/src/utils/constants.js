export const UserRolesEnum = {
  ADMIN: "admin",
  PROJECT_ADMIN: "project_admin",
  MEMBER: "member",
};

export const AvailableUserRoles = Object.values(UserRolesEnum);

export const TaskStatusEnum = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  DONE: "Completed",
};

export const AvailableTaskStatus = Object.values(TaskStatusEnum);
