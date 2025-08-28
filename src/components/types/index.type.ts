import type { ComponentType } from "react";

export interface IResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISendOtp {
  email: string;
}
export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email?: string;
  phone: string;
  picture?: string;
  role: string;
  isActive?: "ACTIVE" | "BLOCKED" | "INACTIVE";
  isDeleted?: boolean;
  isVerified?: boolean;
  auths?: Auth[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Auth {
  provider: string;
  providerId: string;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "USER" | "ADMIN" | "AGENT";

// (Removed duplicate IUser interface)
