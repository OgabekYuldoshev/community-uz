export const ENTITY = "@LABEL";

export const LABEL_COLORS = [
	{ name: "Red", hex: "#E74C3C", usage: "Urgent, Bug, High Priority" },
	{ name: "Orange", hex: "#E67E22", usage: "Warning, Needs Review" },
	{ name: "Yellow", hex: "#F1C40F", usage: "Pending, In Progress" },
	{ name: "Green", hex: "#2ECC71", usage: "Completed, Approved" },
	{ name: "Blue", hex: "#3498DB", usage: "In Development, Discussion" },
	{ name: "Purple", hex: "#9B59B6", usage: "Feature, Enhancement" },
	{ name: "Pink", hex: "#E91E63", usage: "Design, UI/UX" },
	{ name: "Teal", hex: "#1ABC9C", usage: "Documentation, Research" },
	{ name: "Gray", hex: "#95A5A6", usage: "On Hold, Deprecated" },
	{ name: "Black", hex: "#34495E", usage: "Blocked, Critical Issue" },
] as const;
