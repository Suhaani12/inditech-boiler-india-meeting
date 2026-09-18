import { createFileRoute } from "@tanstack/react-router";

import { MeetingRegistration } from "@/components/MeetingRegistration";

const title = "Meet IndiTech Valves at Boiler India — Stall A-83";
const description =
  "Schedule a meeting with the IndiTech Valves team at Boiler India, Stall A-83, on 8, 9 or 10 October to discuss your valve and steam system requirements.";

export const Route = createFileRoute("/boiler-india-meeting")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MeetingRegistration,
});
