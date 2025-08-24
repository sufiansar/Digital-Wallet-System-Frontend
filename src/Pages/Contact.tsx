import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    console.log({ name, email, message });

    setTimeout(() => {
      setLoading(false);
      alert("Message sent successfully!");
      e.currentTarget.reset();
    }, 1500);
  };

  return (
    <div className="container mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12 space-y-2">
        <h1 className="text-4xl font-bold">Get in Touch</h1>
        <p className="text-muted-foreground">
          Have questions or ideas? Drop a message and I’ll get back to you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input type="text" name="name" placeholder="Your Name" required />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card className="shadow-md rounded-xl">
            <CardContent className="flex items-center gap-4 p-6">
              <Mail className="w-6 h-6 text-primary" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-muted-foreground">your@email.com</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardContent className="flex items-center gap-4 p-6">
              <Phone className="w-6 h-6 text-primary" />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-muted-foreground">+880 1234 567 890</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardContent className="flex items-center gap-4 p-6">
              <MapPin className="w-6 h-6 text-primary" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-muted-foreground">Dhaka, Bangladesh</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
