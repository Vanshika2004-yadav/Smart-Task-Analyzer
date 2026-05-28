// import { useState } from "react";
// import { Task } from "@/types/task";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card } from "@/components/ui/card";
// import { Plus, Upload } from "lucide-react";
// import { toast } from "sonner";

// interface TaskInputProps {
//   onTasksSubmit: (tasks: Task[]) => void;
// }

// export const TaskInput = ({ onTasksSubmit }: TaskInputProps) => {
//   const [title, setTitle] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [estimatedHours, setEstimatedHours] = useState("");
//   const [importance, setImportance] = useState("");
//   const [dependencies, setDependencies] = useState("");
//   const [jsonInput, setJsonInput] = useState("");
//   const [tasks, setTasks] = useState<Task[]>([]);

//   const generateId = () => `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

//   const addTask = () => {
//     if (!title.trim()) {
//       toast.error("Title is required");
//       return;
//     }

//     if (!dueDate) {
//       toast.error("Due date is required");
//       return;
//     }

//     const importanceNum = Number(importance);
//     if (isNaN(importanceNum) || importanceNum < 1 || importanceNum > 10) {
//       toast.error("Importance must be between 1 and 10");
//       return;
//     }

//     const hoursNum = Number(estimatedHours);
//     if (isNaN(hoursNum) || hoursNum < 0) {
//       toast.error("Estimated hours must be a positive number");
//       return;
//     }

//     const newTask: Task = {
//       id: generateId(),
//       title: title.trim(),
//       dueDate,
//       estimatedHours: hoursNum,
//       importance: importanceNum,
//       dependencies: dependencies
//         .split(",")
//         .map(d => d.trim())
//         .filter(d => d.length > 0),
//     };

//     const updatedTasks = [...tasks, newTask];
//     setTasks(updatedTasks);
//     toast.success("Task added successfully");

//     // Clear form
//     setTitle("");
//     setDueDate("");
//     setEstimatedHours("");
//     setImportance("");
//     setDependencies("");
//   };

//   const handleJsonImport = () => {
//     try {
//       const parsed = JSON.parse(jsonInput);
//       const tasksArray = Array.isArray(parsed) ? parsed : [parsed];
      
//       const validTasks: Task[] = tasksArray.map((task, index) => ({
//         id: task.id || generateId(),
//         title: task.title || `Imported Task ${index + 1}`,
//         dueDate: task.dueDate || task.due_date || new Date().toISOString().split("T")[0],
//         estimatedHours: Number(task.estimatedHours || task.estimated_hours || 1),
//         importance: Math.min(10, Math.max(1, Number(task.importance || 5))),
//         dependencies: Array.isArray(task.dependencies) ? task.dependencies : [],
//       }));

//       setTasks(validTasks);
//       setJsonInput("");
//       toast.success(`Imported ${validTasks.length} tasks`);
//     } catch (error) {
//       toast.error("Invalid JSON format. Please check your input.");
//     }
//   };

//   const handleAnalyze = () => {
//     if (tasks.length === 0) {
//       toast.error("Please add at least one task");
//       return;
//     }
//     onTasksSubmit(tasks);
//   };

//   return (
//     <div className="space-y-6">
//       <Card className="p-6 bg-gradient-card shadow-medium border-border/50">
//         <h2 className="text-2xl font-bold mb-6 text-foreground">Add Task</h2>
//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="title" className="text-foreground/90">Task Title *</Label>
//             <Input
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="e.g., Fix login bug"
//               className="mt-1.5"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="dueDate" className="text-foreground/90">Due Date *</Label>
//               <Input
//                 id="dueDate"
//                 type="date"
//                 value={dueDate}
//                 onChange={(e) => setDueDate(e.target.value)}
//                 className="mt-1.5"
//               />
//             </div>

//             <div>
//               <Label htmlFor="estimatedHours" className="text-foreground/90">Estimated Hours *</Label>
//               <Input
//                 id="estimatedHours"
//                 type="number"
//                 min="0"
//                 step="0.5"
//                 value={estimatedHours}
//                 onChange={(e) => setEstimatedHours(e.target.value)}
//                 placeholder="e.g., 3"
//                 className="mt-1.5"
//               />
//             </div>
//           </div>

//           <div>
//             <Label htmlFor="importance" className="text-foreground/90">
//               Importance (1-10) *
//             </Label>
//             <Input
//               id="importance"
//               type="number"
//               min="1"
//               max="10"
//               value={importance}
//               onChange={(e) => setImportance(e.target.value)}
//               placeholder="e.g., 8"
//               className="mt-1.5"
//             />
//           </div>

//           <div>
//             <Label htmlFor="dependencies" className="text-foreground/90">
//               Dependencies (comma-separated IDs)
//             </Label>
//             <Input
//               id="dependencies"
//               value={dependencies}
//               onChange={(e) => setDependencies(e.target.value)}
//               placeholder="e.g., task-1, task-2"
//               className="mt-1.5"
//             />
//           </div>

//           <Button
//             onClick={addTask}
//             className="w-full bg-gradient-hero hover:opacity-90 transition-opacity"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             Add Task
//           </Button>
//         </div>
//       </Card>

//       <Card className="p-6 bg-gradient-card shadow-medium border-border/50">
//         <h2 className="text-2xl font-bold mb-4 text-foreground">Bulk Import (JSON)</h2>
//         <div className="space-y-4">
//           <Textarea
//             value={jsonInput}
//             onChange={(e) => setJsonInput(e.target.value)}
//             placeholder='[{"title": "Task 1", "dueDate": "2025-12-31", "estimatedHours": 3, "importance": 8, "dependencies": []}]'
//             className="min-h-[120px] font-mono text-sm"
//           />
//           <Button
//             onClick={handleJsonImport}
//             variant="outline"
//             className="w-full"
//           >
//             <Upload className="w-4 h-4 mr-2" />
//             Import JSON
//           </Button>
//         </div>
//       </Card>

//       {tasks.length > 0 && (
//         <Card className="p-6 bg-gradient-card shadow-medium border-border/50">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-foreground">
//               Added Tasks ({tasks.length})
//             </h3>
//             <Button
//               onClick={handleAnalyze}
//               size="lg"
//               className="bg-gradient-hero hover:opacity-90 transition-opacity shadow-medium"
//             >
//               Analyze Tasks
//             </Button>
//           </div>
//           <div className="space-y-2">
//             {tasks.map((task) => (
//               <div
//                 key={task.id}
//                 className="p-3 bg-muted/50 rounded-lg text-sm border border-border/30"
//               >
//                 <div className="font-medium text-foreground">{task.title}</div>
//                 <div className="text-muted-foreground mt-1">
//                   Due: {task.dueDate} • {task.estimatedHours}h • Importance: {task.importance}/10
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// };








import { useState } from "react";
import { Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Upload } from "lucide-react";
import { toast } from "sonner";

interface TaskInputProps {
  onTasksSubmit: (tasks: Task[]) => void;
}

export const TaskInput = ({ onTasksSubmit }: TaskInputProps) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [importance, setImportance] = useState("");
  const [dependencies, setDependencies] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const generateId = () =>
    `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addTask = () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!dueDate) {
      toast.error("Due date is required");
      return;
    }

    const importanceNum = Number(importance);
    if (isNaN(importanceNum) || importanceNum < 1 || importanceNum > 10) {
      toast.error("Importance must be between 1 and 10");
      return;
    }

    const hoursNum = Number(estimatedHours);
    if (isNaN(hoursNum) || hoursNum < 0) {
      toast.error("Estimated hours must be a positive number");
      return;
    }

    const newTask: Task = {
      id: generateId(),
      title: title.trim(),
      dueDate,
      estimatedHours: hoursNum,
      importance: importanceNum,
      dependencies: dependencies
        .split(",")
        .map((d) => d.trim())
        .filter((d) => d.length > 0),
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    toast.success("Task added successfully");

    setTitle("");
    setDueDate("");
    setEstimatedHours("");
    setImportance("");
    setDependencies("");
  };

  const handleJsonImport = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const tasksArray = Array.isArray(parsed) ? parsed : [parsed];

      const validTasks: Task[] = tasksArray.map((task, index) => ({
        id: task.id || generateId(),
        title: task.title || `Imported Task ${index + 1}`,
        dueDate:
          task.dueDate ||
          task.due_date ||
          new Date().toISOString().split("T")[0],
        estimatedHours: Number(
          task.estimatedHours || task.estimated_hours || 1
        ),
        importance: Math.min(
          10,
          Math.max(1, Number(task.importance || 5))
        ),
        dependencies: Array.isArray(task.dependencies)
          ? task.dependencies
          : [],
      }));

      setTasks(validTasks);
      setJsonInput("");
      toast.success(`Imported ${validTasks.length} tasks`);
    } catch (error) {
      toast.error("Invalid JSON format. Please check your input.");
    }
  };

  const handleAnalyze = () => {
    if (tasks.length === 0) {
      toast.error("Please add at least one task");
      return;
    }
    onTasksSubmit(tasks);
  };

  return (
  <div className="space-y-8">
    {/* Add Task Card */}
    <Card className="relative overflow-hidden p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 shadow-2xl rounded-3xl backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.25),transparent_35%)]"></div>

      <div className="relative z-10">
        <h2 className="text-4xl font-black mb-8 text-center bg-gradient-to-r from-violet-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
          Add New Task
        </h2>

        <div className="space-y-6">
          <div>
            <Label
              htmlFor="title"
              className="text-slate-200 font-semibold text-sm tracking-wide"
            >
              Task Title *
            </Label>

            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Fix login bug"
              className="mt-2 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-white placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label
                htmlFor="dueDate"
                className="text-slate-200 font-semibold text-sm tracking-wide"
              >
                Due Date *
              </Label>

              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-2 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 transition-all duration-300"
              />
            </div>

            <div>
              <Label
                htmlFor="estimatedHours"
                className="text-slate-200 font-semibold text-sm tracking-wide"
              >
                Estimated Hours *
              </Label>

              <Input
                id="estimatedHours"
                type="number"
                min="0"
                step="0.5"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(e.target.value)}
                placeholder="e.g., 3"
                className="mt-2 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-white placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="importance"
              className="text-slate-200 font-semibold text-sm tracking-wide"
            >
              Importance (1-10) *
            </Label>

            <Input
              id="importance"
              type="number"
              min="1"
              max="10"
              value={importance}
              onChange={(e) => setImportance(e.target.value)}
              placeholder="e.g., 8"
              className="mt-2 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-white placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 transition-all duration-300"
            />
          </div>

          <div>
            <Label
              htmlFor="dependencies"
              className="text-slate-200 font-semibold text-sm tracking-wide"
            >
              Dependencies (comma-separated IDs)
            </Label>

            <Input
              id="dependencies"
              value={dependencies}
              onChange={(e) => setDependencies(e.target.value)}
              placeholder="e.g., task-1, task-2"
              className="mt-2 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-white placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 transition-all duration-300"
            />
          </div>

          <Button
            onClick={addTask}
            className="w-full h-14 rounded-2xl text-base font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(139,92,246,0.45)] transition-all duration-300 border border-white/10"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Task
          </Button>
        </div>
      </div>
    </Card>

    {/* JSON Import Card */}
    <Card className="p-8 bg-slate-900/90 border border-white/10 shadow-2xl rounded-3xl backdrop-blur-xl">
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Bulk Import (JSON)
      </h2>

      <div className="space-y-5">
        <Textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='[{"title": "Task 1", "dueDate": "2025-12-31", "estimatedHours": 3, "importance": 8, "dependencies": []}]'
          className="min-h-[150px] rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-slate-400 font-mono text-sm focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300"
        />

        <Button
          onClick={handleJsonImport}
          variant="outline"
          className="w-full h-14 rounded-2xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500 hover:text-white transition-all duration-300 text-base font-semibold"
        >
          <Upload className="w-5 h-5 mr-2" />
          Import JSON
        </Button>
      </div>
    </Card>

    {/* Task List */}
    {tasks.length > 0 && (
      <Card className="p-8 bg-slate-900/90 border border-white/10 shadow-2xl rounded-3xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h3 className="text-2xl font-bold text-white">
            Added Tasks ({tasks.length})
          </h3>

          <Button
            onClick={handleAnalyze}
            size="lg"
            className="rounded-2xl px-8 py-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-105 hover:shadow-[0_0_25px_rgba(99,102,241,0.45)] transition-all duration-300 text-white font-bold"
          >
            Analyze Tasks
          </Button>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-violet-500/40 transition-all duration-300 hover:translate-y-[-2px]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-lg text-white group-hover:text-violet-300 transition-colors">
                    {task.title}
                  </div>

                  <div className="text-slate-400 mt-2 text-sm">
                    Due: {task.dueDate} • {task.estimatedHours}h • Importance:
                    {task.importance}/10
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/20">
                  Task
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    )}
  </div>
  );
};