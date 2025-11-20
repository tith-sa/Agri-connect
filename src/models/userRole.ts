import { IUserRole } from "@/types/userRole";
import mongoose, { Schema } from "mongoose";

const userRoleSchema = new Schema<IUserRole>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

userRoleSchema.index({ userId: 1, roleId: 1 }, { unique: true });

export default mongoose.model<IUserRole>("UserRole", userRoleSchema);
