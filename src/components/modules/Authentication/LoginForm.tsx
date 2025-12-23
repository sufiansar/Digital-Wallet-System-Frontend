import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "@/Redux/features/auth/auth.api";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const credentials = {
  user: {
    email: "sufiancodecrush@gmail.com",
    password: "Sufian12@",
  },
  admin: {
    email: "admin2@gmail.com",
    password: "Sufian12@",
  },
  agent: {
    email: "sufian0198@gmail.com",
    password: "Sufian12@",
  },
};

export function LoginForm({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  const [showCredentials, setShowCredentials] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const loginInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(loginInfo).unwrap();
      if (res?.success) {
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (err: any) {
      if (err.data.message === "User Not Verified") {
        toast.error("Please verify your email address.");
        navigate("/verify", { state: data.email });
      }

      if (err?.data?.message === "Invalid password") {
        toast.error("Invalid password. Please try again.");
        navigate("/login");
      }
    }
  };

  const fillCredentials = (role: "user" | "admin" | "agent") => {
    form.setValue("email", credentials[role].email);
    form.setValue("password", credentials[role].password);
    // toast.info(
    //   `${role.charAt(0).toUpperCase() + role.slice(1)} credentials filled`
    // );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Demo Credentials Section */}
      <div className="rounded-lg border border-border bg-muted/50 p-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full mb-3"
          onClick={() => setShowCredentials(!showCredentials)}
        >
          {showCredentials ? "Hide" : "Show"} Demo Credentials
        </Button>

        {showCredentials && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground mb-2">
              Click to auto-fill login credentials:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fillCredentials("user")}
              >
                User
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fillCredentials("admin")}
              >
                Admin
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fillCredentials("agent")}
              >
                Agent
              </Button>
            </div>
          </div>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@company.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Password {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Password must be at least 6 characters long.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>

      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>

      <Button type="button" variant="outline" className="w-full cursor-pointer">
        Login with Google
      </Button>

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}
