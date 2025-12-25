import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Target } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6 space-y-12">
      {/* Our Story */}
      <Card className="shadow-xl rounded-2xl border bg-background border-border">
        <CardHeader className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-blue-500" />
          <CardTitle className="text-xl text-foreground">Our Story</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The Digital Wallet System is a project I built to bring fast,
            secure, and user-friendly digital financial services to everyone.
            The idea was to create a platform where managing money, sending and
            receiving funds, and tracking transactions is simple and reliable.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            With this system, users can enjoy a modern financial experience
            without relying on traditional banking hassles. From personal
            transactions to business use cases, the wallet is designed to cover
            all digital financial needs.
          </p>
        </CardContent>
      </Card>

      {/* Our Mission */}
      <Card className="shadow-xl rounded-2xl border bg-background border-border">
        <CardHeader className="flex items-center gap-3">
          <Target className="w-6 h-6 text-green-500" />
          <CardTitle className="text-xl text-foreground">Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-3">
            To empower individuals and businesses to manage their finances
            digitally with confidence, security, and transparency.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Secure wallet transactions with real-time tracking.</li>
            <li>Intuitive dashboard for balance management and history.</li>
            <li>Easy fund transfers between users and agents.</li>
            <li>Role-based access control: user, agent, admin features.</li>
            <li>Reliable transaction logging with permanent history.</li>
          </ul>
        </CardContent>
      </Card>

      {/* About the Creator */}
      <Card className="shadow-xl rounded-2xl border bg-background border-border">
        <CardHeader className="flex items-center gap-3">
          <Users className="w-6 h-6 text-purple-500" />
          <CardTitle className="text-xl text-foreground">
            About the Creator
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-300 text-3xl font-bold">
            S
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Md. Abu Sufian
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            I am the sole developer behind this project, responsible for
            designing, developing, and implementing all the features of the
            Digital Wallet System. My focus is on creating secure, scalable, and
            user-friendly financial solutions.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Key contributions include:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>
              Backend development using Express.js and MongoDB for reliable data
              management.
            </li>
            <li>
              Frontend UI built with React and ShadCN UI for modern, responsive
              design.
            </li>
            <li>
              Implementation of wallet functionalities like cash in/out,
              transfers, and withdrawals.
            </li>
            <li>
              Secure transaction handling with permanent logging and role-based
              access.
            </li>
            <li>
              Admin and agent control panels for management and approvals.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
