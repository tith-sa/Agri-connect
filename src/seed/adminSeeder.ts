import User from "@/models/userModel";
import Role from "@/models/roleModel";
import bcrypt from "bcryptjs";

export const adminSeeder = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: process.env.ADMIN,
    });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }
    const passwordHash = await bcrypt.hash(process.env.PASSWORD!, 10);
    const adminRole = await Role.findOne({ name: "admin" });
    if (!adminRole) {
      console.log('Default role "customer" not found. Please create it first.');
      return;
    }

    const adminUser = new User({
      firstName: "Admin",
      lastName: "User",
      userName: "admin",
      email: process.env.ADMIN,
      password: passwordHash,
      phone: "0000000000",
      roles: [adminRole._id],
      status: "active",
    });
    await adminUser.save();

    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};
