import mongoose, { Schema } from "mongoose";

const ProjectNotesSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    CreatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const TaskNotesSchema = new Schema(
  {
    Task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    CreatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const ProjectNotes = mongoose.model("ProjectNotes", ProjectNotesSchema);
export const TaskNotes = mongoose.model("TaskNotes", TaskNotesSchema);
