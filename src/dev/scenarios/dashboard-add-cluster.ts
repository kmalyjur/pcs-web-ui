import * as app from "dev/app";
import * as shortcut from "dev/shortcuts";

shortcut.checkAuthAgainstNodes();

shortcut.authGuiAgainstNodes();

app.existingCluster((req, res) => {
  const nodeName = req.body["node-name"];
  if (nodeName === "conflict") {
    res
      .status(400)
      .send(
        [
          "Configuration conflict detected.",
          "Some nodes had a newer configuration than the local node."
            + " Local node's configuration was updated."
            + "  Please repeat the last action if appropriate.",
        ].join("\n\n"),
      );
  } else {
    res.send("");
  }
});

shortcut.dashboard([]);
