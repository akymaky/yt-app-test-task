const ENABLED = 1;
// possible future expansion - other bitfield masks (2, 4, 8, 16, ...) for other flags/statuses

exports.httpHandler = {
  endpoints: [
    {
      method: 'GET',
      path: 'enabledProjects',
      handle(ctx) {
        const {projectFlagsJson} = ctx.globalStorage.extensionProperties;
        const projectFlags = JSON.parse(projectFlagsJson) || {};

        const enabledProjects = [];
        for (const project in projectFlags) {
          if (projectFlags[project] & ENABLED) {
            enabledProjects.push(project);
          }
        }

        ctx.response.json(enabledProjects);
      }
    },
    {
      method: 'PUT',
      path: 'projectStatus',
      handle(ctx) {
        const body = JSON.parse(ctx.request.body);
        const status = body.enabled;
        const project = body.project;

        if (typeof project !== "string" || typeof status !== "boolean") {
          ctx.response.json({
            status: "Error",
            message: "Invalid request",
            body: ctx.request.body
          });

          return;
        }

        const {projectFlagsJson} = ctx.globalStorage.extensionProperties;
        const projectFlags = JSON.parse(projectFlagsJson) || {};

        projectFlags[project] ??= 0;

        if (status) {
          projectFlags[project] |= ENABLED;
        } else {
          projectFlags[project] &= ~ENABLED;
        }

        ctx.globalStorage.extensionProperties.projectFlagsJson = JSON.stringify(projectFlags);

        ctx.response.json({
          projectFlags,
          status,
          project,
        });
      }
    }
  ]
};
