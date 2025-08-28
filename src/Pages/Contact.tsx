"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useContactPageMutation } from "@/Redux/features/auth/auth.api";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [sendContractEmail, { isLoading }] = useContactPageMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      return toast.error("All fields are required");
    }

    try {
      await sendContractEmail({ name, email, subject, message }).unwrap();
      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-6 py-16">
      <div className="text-center mb-12 space-y-2">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground">
          Have questions or requests? Fill out the form and we’ll get back to
          you.
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
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send"}
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
                <p className="text-muted-foreground">support@hablu.com</p>
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
