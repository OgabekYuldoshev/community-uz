import type { inferServerActionReturnData } from "zsa";
import type { getStatusByProjectId } from "./action";

export type StatusInferType = inferServerActionReturnData<
	typeof getStatusByProjectId
>;
