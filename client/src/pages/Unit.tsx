import { Layout } from "@/components/Layout";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { useUnit } from "@/hooks/use-content";
import { Link } from "wouter";
import { ChevronRight, Layers, ArrowLeft, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function Unit() {
  const [, setLocation] = useLocation();
  const { data: unit, isLoading, error } = useUnit();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error || !unit) {
    return (
      <Layout>
        <div className="text-center py-20 text-destructive">Unit not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Unit Overview</p>
            <h1 className="text-3xl font-bold tracking-tight whitespace-pre-line">{unit.unit_id}</h1>
          </div>
        </div>

        <div className="grid gap-4">
          {unit.modules.map((module, index) => (
            <motion.div
              key={module.order}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/unit/${unit.unit_id}/module/${module.order}`}>
                <div className="group block cursor-pointer">
                  <Card className="hover:border-primary/50 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {module.order}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{module.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Layers className="w-4 h-4" />
                            <span>
                              {module.entries.reduce((acc, entry) => acc + entry.senses.length, 0)} learning cards
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
                    </CardContent>
                  </Card>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Tests & Assessments Section */}
        <div className="mt-8 space-y-4 pb-12">
          <h2 className="text-2xl font-bold px-1">Tests & Assessments</h2>
          
          <div className="grid gap-4">
            <Card 
              className="group cursor-pointer border-2 border-primary/20 hover:border-primary transition-all duration-300 bg-primary/5 hover:shadow-lg"
              onClick={() => setLocation(`/mid-unit-test-1`)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Checkpoint Assessment 1 (Modules 1–5)</h3>
                      <p className="text-muted-foreground">Comprehensive assessment of the first five modules</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                      <div className="text-lg font-bold text-primary">
                        Available
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer border-2 border-primary/20 hover:border-primary transition-all duration-300 bg-primary/5 hover:shadow-lg"
              onClick={() => setLocation(`/unit-test-2`)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Checkpoint Assessment 2 (Modules 6–10)</h3>
                      <p className="text-muted-foreground">Comprehensive assessment of modules six to ten</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                      <div className="text-lg font-bold text-primary">
                        Available
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer border-2 border-primary/20 hover:border-primary transition-all duration-300 bg-primary/5 hover:shadow-lg"
              onClick={() => setLocation(`/final-unit-test`)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Final Unit Test</h3>
                      <p className="text-muted-foreground">Comprehensive assessment across all 7 reading sections</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                      <div className="text-lg font-bold text-primary">
                        Available
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
