import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  BookOpen,
  Video,
  FileText,
  Users,
  Award,
  TrendingUp,
  Sprout,
  Droplets,
  Bug,
  Sun,
  Leaf,
  ArrowRight,
  Play,
  Clock,
  Star,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FarmAcademy = () => {
  const courses = [
    {
      id: 1,
      title: "Modern Farming Techniques",
      description: "Learn cutting-edge farming methods to boost your yield",
      duration: "4 weeks",
      lessons: 12,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop",
      icon: Sprout,
      color: "emerald",
      students: 1234,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Soil Health Management",
      description: "Master soil testing, nutrients, and organic practices",
      duration: "3 weeks",
      lessons: 10,
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop",
      icon: Droplets,
      color: "blue",
      students: 987,
      rating: 4.9,
    },
    {
      id: 3,
      title: "Pest & Disease Control",
      description: "Identify and manage crop pests using eco-friendly methods",
      duration: "2 weeks",
      lessons: 8,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=250&fit=crop",
      icon: Bug,
      color: "red",
      students: 756,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Climate-Smart Agriculture",
      description: "Adapt to climate change with resilient farming practices",
      duration: "5 weeks",
      lessons: 15,
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&h=250&fit=crop",
      icon: Sun,
      color: "amber",
      students: 543,
      rating: 4.9,
    },
  ];

  const features = [
    {
      icon: Video,
      title: "Video Lessons",
      description: "HD videos in Hindi, English & Kannada",
    },
    {
      icon: FileText,
      title: "Study Materials",
      description: "Downloadable guides & PDFs",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Live Q&A with agriculture experts",
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Earn verified completion certificates",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; badge: string }> = {
      emerald: { bg: "bg-emerald-500", text: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700" },
      blue: { bg: "bg-blue-500", text: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
      red: { bg: "bg-red-500", text: "text-red-600", badge: "bg-red-100 text-red-700" },
      amber: { bg: "bg-amber-500", text: "text-amber-600", badge: "bg-amber-100 text-amber-700" },
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50/30 via-white to-orange-50/30">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 py-16 md:py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <div className="relative container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Learn. Grow. Prosper.</span>
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Farm Academy
            </h1>
            <p className="mt-4 text-lg text-white/90 md:text-xl">
              Master modern farming with expert-led courses in your language
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 shadow-lg">
                <Play className="mr-2 h-5 w-5" />
                Start Learning Free
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Courses
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>10,000+ Farmers</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                <span>500+ Video Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span>Certified Courses</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="border-orange-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Popular Courses</h2>
            <p className="mt-2 text-muted-foreground">Learn from agriculture experts and boost your farm's productivity</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => {
              const colors = getColorClasses(course.color);
              const CourseIcon = course.icon;
              
              return (
                <Card key={course.id} className="group overflow-hidden border-border bg-white shadow-sm transition-all hover:shadow-lg">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`} />
                    <Badge className={`absolute top-3 right-3 ${colors.badge}`}>
                      {course.level}
                    </Badge>
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className={`rounded-lg ${colors.bg} p-2 text-white`}>
                        <CourseIcon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground group-hover:text-orange-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>{course.lessons} lessons</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-semibold text-foreground">{course.rating}</span>
                        <span className="text-xs text-muted-foreground">({course.students})</span>
                      </div>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        <span className="text-xs">Enroll</span>
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden border-none bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 shadow-xl">
            <div className="p-8 md:p-12 text-center text-white">
              <GraduationCap className="mx-auto h-16 w-16 mb-6" />
              <h2 className="text-3xl font-bold md:text-4xl">Ready to Transform Your Farm?</h2>
              <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
                Join thousands of farmers who are already learning and earning more with Farm Academy
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 shadow-lg">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Get Started Now
                </Button>
              </div>
              <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Free to Start</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Learn Anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Expert Support</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FarmAcademy;

