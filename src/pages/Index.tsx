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
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 shadow-md">
              <Brain className="w-7 h-7 text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                Smart Task Analyzer
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Intelligent task prioritization system
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="lg:col-span-1">
            <TaskInput onTasksSubmit={handleTasksSubmit} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {analyzedTasks.length === 0 ? (
              
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center max-w-md">

                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-violet-100 to-cyan-100 flex items-center justify-center">
                    <Brain className="w-12 h-12 text-violet-500" />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    AI Task Analyzer
                  </h2>

                  <p className="text-gray-500">
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

                <TaskResults
                  tasks={analyzedTasks}
                  strategy={strategy}
                />
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-16 border-t border-gray-200 bg-white">
        <div className="container relative mx-auto px-4 py-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Left */}
            <div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                Smart Task Analyzer
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Built with intelligent priority algorithms & modern UI experience.
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 text-sm text-gray-500">

              <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-600 border border-violet-200">
                AI Powered
              </span>

              <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-600 border border-cyan-200">
                Productivity
              </span>

            </div>
          </div>

          {/* Bottom */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
            © 2026 Smart Task Analyzer • Designed for smarter workflows
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Index;