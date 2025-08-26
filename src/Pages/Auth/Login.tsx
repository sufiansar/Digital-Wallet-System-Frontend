// import { cn } from "@/lib/utils";
import LoginImage from "@/assets/images/wallatLogin.avif";

// import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "@/components/modules/Authentication/LoginForm";
import { Link } from "react-router";
import Logo from "@/assets/Logo";

export function Login() {
  return (
    // <div className="flex flex-col gap-6 container mx-auto justify-center mt-14">
    //   <Card className="overflow-hidden p-0">
    //     <CardContent className="grid p-0 md:grid-cols-2">
    //       <div className="p-6 md:p-8">
    //         <div className="flex flex-col gap-6">
    //           <LoginForm />
    //         </div>
    //       </div>
    //       <div className="bg-muted relative hidden md:block">
    //         <img
    //           src={LoginImage}
    //           className="absolute inset-0 h-full w-full object-cover "
    //         />
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>

    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={LoginImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        />
      </div>
    </div>
  );
}
