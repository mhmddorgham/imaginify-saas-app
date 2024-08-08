"use server";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
// import { CreateUserParams, LoginParams } from "@/types";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
export async function createUser(user: CreateUserParams) {
  const { firstName, lastName, email, password } = user;
  try {
    await connectToDatabase();
    // check if email exists first in database:
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("Email Already exists!");
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      provider: "credentials",
    });
    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    handleError(error.message);
  }
}
export async function login(data: LoginParams) {
  const { email, password } = data;
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }
    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    handleError(error.message);
  }
}

// write updateUserPreferences function that takes email as parameters, and update isPreferencesDone status to true
export async function updateUserPreferences(email: string) {
  try {
    await connectToDatabase();
    const user = await User.findOneAndUpdate(
      { email },
      { isPreferencesDone: true },
      { new: true }
    );
    if (!user) {
      throw new Error("User not found");
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    handleError(error.message);
  }
}
export async function getUserByEmail(email: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    handleError(error.message);
  }
}

export async function emailExists(email: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    handleError(error.message);
  }
}

export async function signInWithGoogle(req: any) {
  const { name, email } = req;
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      // add user to db:
      const newUser = await User.create({
        firstName: name,
        lastName: name,
        email,
        provider: "google",
      });

      return JSON.parse(JSON.stringify(newUser));
    }
    return user;
  } catch (error: any) {
    handleError(error.message);
  }
}
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    handleError(error.message);
  }
}

// DELETE
export async function deleteUser(email: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ email });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    );

    if (!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}
