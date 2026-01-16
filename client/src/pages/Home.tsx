import { Layout } from "@/components/Layout";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { useUnit } from "@/hooks/use-content";
import { Link } from "wouter";
import { ArrowRight, Book, GraduationCap, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: unit, isLoading, error } = useUnit();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground animate-pulse">Loading content...</p>
        </div>
      </Layout>
    );
  }

  if (error || !unit) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Content</h2>
          <p className="text-muted-foreground">Please try refreshing the page.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-12 py-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
              Master Your <span className="text-primary bg-primary/10 px-2 rounded-lg inline-block">Vocabulary</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Expand your lexicon with our structured learning modules. 
              Learn deeply, practice instantly, and retain forever.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/unit">
              <Button size="lg" className="group text-lg h-16 px-12 rounded-full shadow-xl shadow-primary/20">
                Start Learning
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <FeatureCard 
            icon={<Book className="w-6 h-6 text-indigo-500" />}
            title="Structured Units"
            description="Organized content designed for progressive learning."
            delay={0.2}
          />
          <FeatureCard 
            icon={<BrainCircuit className="w-6 h-6 text-rose-500" />}
            title="Active Recall"
            description="Immediate comprehension checks to reinforce memory."
            delay={0.3}
          />
          <FeatureCard 
            icon={<GraduationCap className="w-6 h-6 text-emerald-500" />}
            title="Mastery Focus"
            description="Focus on one concept at a time until you master it."
            delay={0.4}
          />
        </div>

        {/* Current Unit Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-card to-secondary/50 border-2 border-border/50">
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <p className="text-sm font-semibold text-primary uppercase tracking-wider">Current Unit</p>
                <h3 className="text-2xl font-bold">{unit.title}</h3>
                <p className="text-muted-foreground">{unit.modules.length} Modules Available</p>
              </div>
              <Link href="/unit">
                <Button variant="secondary" className="whitespace-nowrap">
                  Continue Unit
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-border/50">
        <CardContent className="p-6 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
