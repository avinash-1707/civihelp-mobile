import { Platform } from "react-native";

export type IssueStatus = "Pending" | "In Progress" | "Resolved";

export interface Issue {
  id: string;
  location: string;
  imageUrl: string;
  status: IssueStatus;
  description: string;
  upvotes: number;
}

// --- Dummy Data for the prototype (Unchanged) ---
export const DUMMY_ISSUES: Issue[] = [
  {
    id: "1",
    location: "Sector 21, Gurgaon",
    imageUrl: "https://picsum.photos/seed/pothole/400/200",
    status: "Pending",
    description: "Large pothole on main road, causing traffic jams.",
    upvotes: 12,
  },
  {
    id: "2",
    location: "Near MG Road Metro",
    imageUrl: "https://picsum.photos/seed/streetlight/400/200",
    status: "In Progress",
    description: "Streetlight not working for 3 days.",
    upvotes: 12,
  },
  {
    id: "3",
    location: "DLF Phase 3, Gurgaon",
    imageUrl: "https://picsum.photos/seed/garbage/400/200",
    status: "Pending",
    description: "Garbage pile-up on the roadside, attracting stray dogs.",
    upvotes: 20,
  },
  {
    id: "4",
    location: "Cyber City, Gurgaon",
    imageUrl: "https://picsum.photos/seed/waterlogging/400/200",
    status: "Resolved",
    description: "Waterlogging near office area after light rain.",
    upvotes: 8,
  },
  {
    id: "5",
    location: "Huda City Centre Metro Station",
    imageUrl: "https://picsum.photos/seed/bench/400/200",
    status: "Pending",
    description: "Broken public bench near bus stand.",
    upvotes: 6,
  },
  {
    id: "6",
    location: "Sohna Road, Gurgaon",
    imageUrl: "https://picsum.photos/seed/trafficlight/400/200",
    status: "In Progress",
    description: "Traffic signal not functioning, causing heavy congestion.",
    upvotes: 18,
  },
  {
    id: "7",
    location: "Sector 14 Market",
    imageUrl: "https://picsum.photos/seed/drain/400/200",
    status: "Pending",
    description: "Open drain causing foul smell and mosquito breeding.",
    upvotes: 14,
  },
  {
    id: "8",
    location: "IFFCO Chowk",
    imageUrl: "https://picsum.photos/seed/tree/400/200",
    status: "Resolved",
    description: "Fallen tree blocking pedestrian walkway.",
    upvotes: 9,
  },
  {
    id: "9",
    location: "Sector 56, Gurgaon",
    imageUrl: "https://picsum.photos/seed/parking/400/200",
    status: "Pending",
    description: "Illegal parking blocking road for emergency vehicles.",
    upvotes: 22,
  },
  {
    id: "10",
    location: "Golf Course Road",
    imageUrl: "https://picsum.photos/seed/signboard/400/200",
    status: "In Progress",
    description: "Damaged signboard creating confusion for drivers.",
    upvotes: 11,
  },
];
