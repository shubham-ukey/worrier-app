
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ClassCard from "@/components/ClassCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Award } from "lucide-react";

const Index = () => {
  const featuredClasses = [
    {
      title: "Morning Flow",
      instructor: "Sarah Chen",
      duration: "45 min",
      participants: 24,
      rating: 4.9,
      time: "7:00 AM",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isLive: true
    },
    {
      title: "Power Vinyasa",
      instructor: "Michael Torres",
      duration: "60 min",
      participants: 18,
      rating: 4.8,
      time: "6:00 PM",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isLive: false
    },
    {
      title: "Gentle Hatha",
      instructor: "Emma Williams",
      duration: "50 min",
      participants: 32,
      rating: 4.9,
      time: "8:00 PM",
      level: "All Levels",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isLive: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      
      {/* Featured Classes Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Today's Live Classes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our expert instructors for transformative yoga sessions designed for every level
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredClasses.map((classItem, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <ClassCard {...classItem} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-full"
            >
              View All Classes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Soul Flow Studio?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our world-class instructors and community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mindful Practice</h3>
              <p className="text-gray-600">
                Connect with your inner self through our carefully crafted sequences that blend movement with meditation
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Global Community</h3>
              <p className="text-gray-600">
                Join practitioners from around the world in our supportive, inclusive online community
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from certified yoga teachers with years of experience and specialized training
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Start your 7-day free trial and discover the transformative power of yoga
          </p>
          <Button 
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full hover-scale"
          >
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
