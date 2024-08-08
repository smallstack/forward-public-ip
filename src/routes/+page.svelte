<script lang="ts">
  let configStr = localStorage.getItem("config");
  let config = configStr ? JSON.parse(configStr) : {};

  let logs: Array<{ time: number; message: string; level: "info" | "error" }> =
    $state([
      {
        level: "info",
        time: Date.now(),
        message: "Welcome to the IP Forwarder Desktop Tool!",
      },
    ]);

  setInterval(() => sendIpAddress(), 1000 * 60 * 10);
  sendIpAddress();

  function sendIpAddress() {
    fetch("https://api.ipify.org?format=json")
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        await sendNewValue(data.ip)
          .then(async (response) => {
            if (response.status !== 200) {
              logs.push({
                level: "error",
                time: Date.now(),
                message:
                  "sending your IP " +
                  data.ip +
                  " Cloud API Response: " +
                  response.status +
                  " " +
                  response.statusText,
              });
              return;
            }
            logs.push({
              level: "info",
              time: Date.now(),
              message:
                "sending your IP " +
                data.ip +
                " Cloud API Response: " +
                response.status +
                " " +
                response.statusText,
            });
          })
          .catch((error) => {
            logs.push({
              level: "error",
              time: Date.now(),
              message: "Error: " + error,
            });
          });
      })
      .catch(async (error) => {
        console.error(error);
        await sendNewValue(error);
      });
  }

  function sendNewValue(str: string) {
    return fetch(
      "https://api.smallstack.com/configurations/" + config.configurationId,
      {
        method: "PATCH",
        body: JSON.stringify({
          value: str,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": config.tenantId,
          Authorization: "Bearer " + config.token,
        },
      }
    );
  }

  const scrollToBottom = (node: HTMLDivElement) => {
    $effect(() => {
      if (logs.length === 0) return;
      node.scroll({ top: node.scrollHeight, behavior: "smooth" });
    });
  };

  let scrollBottom = $state(true);
</script>

<div class="p-4 w-dvw h-dvh flex flex-col justify-between">
  <div
    class="w-full h-full flex flex-col gap-2"
    style="height: calc(100% - 48px)"
  >
    <div
      class="w-full overflow-auto border-2 bg-white rounded shadow p-2"
      use:scrollToBottom
      style="height: calc(100% - 40px)"
    >
      {#each logs as log, i}
        <div class="flex gap-2">
          <div class="text-xs text-gray-500">
            {new Date(log.time).toLocaleString()}
          </div>
          <div class="text-xs {log.level === 'error' ? 'text-error' : ''}">
            {log.message}
          </div>
        </div>
      {/each}
    </div>
    <div class="h-10 flex flex-row">
      <div class="form-control">
        <label class="label cursor-pointer gap-2">
          <span class="label-text">Auto Scroll</span>
          <input type="checkbox" bind:checked={scrollBottom} class="checkbox" />
        </label>
      </div>
    </div>
  </div>
  <a class="btn btn-block btn-primary btn-outline btn-md" href="/configuration"
    >Configuration</a
  >
</div>
