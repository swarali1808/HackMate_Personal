import { z } from "zod";

export const ProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  hackathonId: z.string().optional(),
  teamId: z.string().optional(),
  repositoryUrl: z.string().url("Invalid repository URL").optional(),
  submissionUrl: z.string().url("Invalid submission URL").optional(),
  technologyStack: z.array(z.string()).optional(),
  problemStatement: z.string().optional(),
  solutionOverview: z.string().optional(),
  psDomain: z.string().min(1, "The 'psDomain' field is required"),
});