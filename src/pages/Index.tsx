import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, FormInput, MousePointer, RefreshCw, Table, Wifi, Zap } from "lucide-react";

const scenarios = [
  {
    title: "Forms",
    description: "Input fields, selects, checkboxes, radio buttons, and form validation",
    icon: FormInput,
    path: "/forms",
    color: "text-primary",
  },
  {
    title: "Interactions",
    description: "Buttons, modals, alerts, tooltips, and user interactions",
    icon: MousePointer,
    path: "/interactions",
    color: "text-secondary",
  },
  {
    title: "Dynamic Content",
    description: "Loading states, conditional rendering, and real-time updates",
    icon: RefreshCw,
    path: "/dynamic",
    color: "text-accent",
  },
  {
    title: "Tables & Lists",
    description: "Sortable tables, filterable lists, and pagination",
    icon: Table,
    path: "/tables",
    color: "text-primary",
  },
  {
    title: "API Testing",
    description: "API calls, loading states, error handling, and network requests",
    icon: Wifi,
    path: "/api",
    color: "text-secondary",
  },
  {
    title: "Advanced",
    description: "File uploads, drag & drop, keyboard events, and browser storage",
    icon: Zap,
    path: "/advanced",
    color: "text-accent",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-4">
        <div className="container mx-auto text-center">
          <FlaskConical className="h-16 w-16 mx-auto mb-6 text-primary-foreground" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary-foreground">
            Testing Playground
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            A comprehensive web application for learning and practicing Cypress and Playwright testing frameworks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/forms">
              <Button size="lg" variant="secondary">
                Start Testing
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Testing Scenarios
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore different testing scenarios covering basic to advanced concepts. Each scenario includes properly labeled elements with test IDs for easy automation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon;
            return (
              <Link key={scenario.path} to={scenario.path}>
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                    <Icon className={`h-10 w-10 mb-4 ${scenario.color}`} />
                    <CardTitle className="text-xl mb-2">{scenario.title}</CardTitle>
                    <CardDescription className="text-base">
                      {scenario.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Use This Playground?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Coverage</h3>
              <p className="text-muted-foreground">
                From basic form inputs to complex API interactions, covering all testing scenarios
              </p>
            </div>
            <div className="text-center">
              <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Test-Ready Elements</h3>
              <p className="text-muted-foreground">
                All elements include proper data-testid attributes for easy test automation
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn by Doing</h3>
              <p className="text-muted-foreground">
                Practice real-world testing scenarios in a safe, controlled environment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>Built for testing education • Cypress & Playwright friendly</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
