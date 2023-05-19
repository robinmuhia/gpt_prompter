import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    prompt: {
      type: String,
      required: [true, "Prompt is required"],
    },
  },
  { timestamps: true }
);

PromptSchema.index({ createdAt: 1 });
PromptSchema.index({ updatedAt: 1 });

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
