import { useState } from "react";
import { Task, AnalyzedTask, SortingStrategy } from "@/types/task";
import { TaskAnalyzer } from "@/lib/taskAnalyzer";
import { TaskInput } from "@/components/TaskInput";
import { StrategySelector } from "@/components/StrategySelector";
import { TaskResults } from "@/components/TaskResults";
import { Brain } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [analyzedTasks, setAnalyzedTasks] = useState<AnalyzedTask[]>([]);
  const [strategy, setStrategy] = useState<SortingStrategy>("smart-balance");

  const handleTasksSubmit = (tasks: Task[]) => {
    try {
      const analyzer = new TaskAnalyzer(tasks);
      const results = analyzer.analyzeTasks(strategy);
      setAnalyzedTasks(results);
      toast.success("Tasks analyzed successfully!");
    } catch (error) {
      toast.error("Error analyzing tasks. Please check your input.");
      console.error(error);
    }
  };

  const handleStrategyChange = (newStrategy: SortingStrategy) => {
    setStrategy(newStrategy);
    if (analyzedTasks.length > 0) {
      // Re-analyze with new strategy
      const tasks = analyzedTasks.map(
        ({ priorityScore, priorityLevel, explanation, warnings, ...task }) => task
      );
      const analyzer = new TaskAnalyzer(tasks);
      const results = analyzer.analyzeTasks(newStrategy);
      setAnalyzedTasks(results);
      toast.success("Strategy changed successfully!");
    }
  };

  return (
   <div className="min-h-screen bg-[#2b3445]">
  {/* Header */}
  <header className="sticky top-0 z-50 border-b border-border/50 bg-card/95 backdrop-blur-lg shadow-soft">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-hero shadow-medium">
          <Brain className="w-7 h-7 text-white" />
        </div>
        <div>
          {/* Enhanced Gradient Text */}
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-500 via-primary to-cyan-400 bg-clip-text text-transparent tracking-tight">
            Smart Task Analyzer
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Intelligent task prioritization system
          </p>
        </div>
      </div>
    </div>
  </header>

  {/* Main Content */}
  <main className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Input */}
      <div className="lg:col-span-1">
        <TaskInput onTasksSubmit={handleTasksSubmit} />
      </div>

      {/* Right Column - Results */}
      <div className="lg:col-span-2 space-y-6">
        {analyzedTasks.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-hero/10 flex items-center justify-center">
                <Brain className="w-12 h-12 text-primary" />
              </div>

              <h2 className="text-2xl font-bold text-cyan-400 mb-3">
                AI Task Analyzer
              </h2>

              <p className="text-muted-foreground">
                Track, prioritize, and optimize your workflow with intelligent
                task analysis and real-time productivity insights.
              </p>
            </div>
          </div>
        ) : (
          <>
            <StrategySelector
              strategy={strategy}
              onStrategyChange={handleStrategyChange}
            />

            <TaskResults tasks={analyzedTasks} strategy={strategy} />
          </>
        )}
      </div>
    </div>
  </main>

  {/* Enhanced Footer */}
  <footer className="relative mt-16 border-t border-border/50 bg-gradient-to-r from-background via-muted/40 to-background overflow-hidden">
    {/* Glow Effect */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.15),transparent_60%)]" />

    <div className="container relative mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side */}
        <div>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
            Smart Task Analyzer
          </h3>

          <p className="text-sm text-muted-foreground mt-1">
            Built with intelligent priority algorithms & modern UI experience.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            AI Powered
          </span>

          <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
            Productivity
          </span>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-6 pt-4 border-t border-border/30 text-center text-xs text-muted-foreground">
        © 2026 Smart Task Analyzer • Designed for smarter workflows
      </div>
    </div>
  </footer>
</div>
  );
};

export default Index;
