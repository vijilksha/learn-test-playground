import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Forms = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    bio: "",
    terms: false,
    notifications: "email",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Form submitted successfully!", {
      description: `Welcome, ${formData.name}!`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
            Form Testing Scenarios
          </h1>
          <p className="text-muted-foreground text-lg">
            Practice testing various form inputs and validation scenarios
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Form */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Form</CardTitle>
              <CardDescription>Test basic input fields and form submission</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="basic-form">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    data-testid="name-input"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    data-testid="email-input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    data-testid="password-input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full" data-testid="submit-button">
                  Submit Form
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Select and Textarea */}
          <Card>
            <CardHeader>
              <CardTitle>Select & Textarea</CardTitle>
              <CardDescription>Test dropdown selections and multi-line text</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => setFormData({ ...formData, country: value })}
                >
                  <SelectTrigger id="country" data-testid="country-select">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  data-testid="bio-textarea"
                  placeholder="Tell us about yourself..."
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Checkboxes */}
          <Card>
            <CardHeader>
              <CardTitle>Checkboxes</CardTitle>
              <CardDescription>Test checkbox interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  data-testid="terms-checkbox"
                  checked={formData.terms}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, terms: checked as boolean })
                  }
                />
                <Label htmlFor="terms" className="cursor-pointer">
                  I agree to the terms and conditions
                </Label>
              </div>

              <div className="space-y-2">
                <Label>Select your interests:</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tech" data-testid="interest-tech" />
                    <Label htmlFor="tech" className="cursor-pointer">Technology</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sports" data-testid="interest-sports" />
                    <Label htmlFor="sports" className="cursor-pointer">Sports</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="music" data-testid="interest-music" />
                    <Label htmlFor="music" className="cursor-pointer">Music</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Radio Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Radio Buttons</CardTitle>
              <CardDescription>Test radio button selections</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.notifications}
                onValueChange={(value) => setFormData({ ...formData, notifications: value })}
                data-testid="notification-radio-group"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email-notify" data-testid="radio-email" />
                  <Label htmlFor="email-notify" className="cursor-pointer">Email notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="sms-notify" data-testid="radio-sms" />
                  <Label htmlFor="sms-notify" className="cursor-pointer">SMS notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="push" id="push-notify" data-testid="radio-push" />
                  <Label htmlFor="push-notify" className="cursor-pointer">Push notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none-notify" data-testid="radio-none" />
                  <Label htmlFor="none-notify" className="cursor-pointer">No notifications</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Forms;
