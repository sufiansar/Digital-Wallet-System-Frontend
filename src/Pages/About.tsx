import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Target } from "lucide-react";
import { Link } from "react-router";

const team = [
  {
    name: "Md. Abu Sufian",
    role: "Fullstack Developer",
    profileUrl: "#",
  },
  {
    name: "Ripas Ali",
    role: "Fullstack Developer",
    profileUrl: "#",
  },
  {
    name: "Usman Noor",
    role: "UI/UX Designer",
    profileUrl: "#",
  },
];

export default function About() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-12">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="flex items-center gap-4">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <CardTitle>Our Story</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Our Digital Wallet System was created to provide fast, secure, and
            easy-to-use digital financial services for everyone. From sending
            money to tracking transactions, our goal is to simplify your
            financial life.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="flex items-center gap-4">
          <Target className="w-6 h-6 text-green-600" />
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            To empower individuals and businesses to manage their finances
            digitally with confidence, security, and transparency.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="flex items-center gap-4">
          <Users className="w-6 h-6 text-purple-600" />
          <CardTitle>Meet the Team</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, idx) => (
            <Link
              key={idx}
              to={member.profileUrl}
              className="hover:scale-105 transition-transform"
            >
              <Card className="cursor-pointer shadow-md p-4 rounded-lg hover:bg-muted">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </Card>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
