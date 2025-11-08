import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, UserCircle, Briefcase } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-accent p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Calendar className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Time Management System
          </h1>
          <p className="text-xl text-white/90">
            Select your role to continue
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card 
            className="p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card border-2 border-transparent hover:border-accent"
            onClick={() => navigate("/login?role=executive")}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
                <Briefcase className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Executive</h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Manage your appointments, view schedules, and track your daily engagements
              </p>
              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90"
              >
                Continue as Executive
              </Button>
            </div>
          </Card>

          <Card 
            className="p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card border-2 border-transparent hover:border-secondary"
            onClick={() => navigate("/login?role=secretary")}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-secondary/10 mb-6">
                <UserCircle className="w-12 h-12 text-secondary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Secretary</h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Schedule meetings, manage executive calendars, and coordinate appointments
              </p>
              <Button 
                size="lg" 
                className="w-full bg-secondary hover:bg-secondary/90"
              >
                Continue as Secretary
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
