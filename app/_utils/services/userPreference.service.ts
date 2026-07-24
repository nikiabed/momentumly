const headers = {
  "Content-Type": "application/json",
};

export const userPreferenceService = {
  async getPreferences() {
    const res = await fetch("/api/user/preferences");

    if (!res.ok) {
      throw new Error("Failed to load preferences");
    }

    return res.json();
  },

  async updateTheme(boardKey: string, theme: string) {
    const res = await fetch("/api/user/preferences", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardKey,
        theme,
      }),
    });

    if (!res.ok) {
      throw new Error("Update preference failed");
    }

    return res.json();
  },
};
