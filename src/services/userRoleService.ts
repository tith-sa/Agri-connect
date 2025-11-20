import User from "@/models/userModel";
import Role from "@/models/userRole";
import UserRole from "@/models/userRole";
import { Types } from "mongoose";

export const assignUserRole = async (userId: string, roleId: string) => {
  const user = await User.findById("userId");
  if (!user) throw new Error("not found");
  const role = await Role.findById("roleId");
  if (!role) throw new Error("not found");
  const exist = await UserRole.findOne({ userId, roleId });
  if (exist) {
    return {
      success: false,
      message: "User already has this role",
    };
  }
  try {
    const userRole = await UserRole.create({
      userId: new Types.ObjectId(userId),
      roleId: new Types.ObjectId(roleId),
    });
    return {
      success: true,
      message: "Role assigned successfully",
      data: userRole,
    };
  } catch (error) {
    throw new Error("User already has role");
  }
};
