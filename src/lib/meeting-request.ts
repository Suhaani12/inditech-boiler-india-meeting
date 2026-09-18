export type MeetingRequest = {
  name: string;
  company: string;
  designation: string;
  email: string;
  mobile: string;
  industry: string;
  discussionTopics: string[];
  preferredDate: string;
  preferredTime: string;
  submittedAt: string;
};

const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbwjjqb9EpelSahb2OxaVsE9CahGpc3dzI4YtmW1P6nZ-C-hMfMBVElWL02Oz23HYyTKaA/exec";

/**
 * Sends the meeting request to Google Sheets
 * through Google Apps Script.
 */
export async function submitMeetingRequest(
  payload: MeetingRequest
): Promise<void> {
  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Google Sheets request failed: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to save meeting request");
    }

    console.info("Meeting request saved to Google Sheets:", payload);
  } catch (error) {
    console.error("Error submitting meeting request:", error);
    throw error;
  }
}