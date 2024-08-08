<script lang="ts">
  import { browser } from "$app/environment";
  import type { Configuration } from "$lib/configuration";

  let config: Partial<Configuration> = $state({});

  if (browser) {
    const configStr = localStorage.getItem("config");
    if (configStr) {
      config = JSON.parse(configStr);
    } else {
      config = {
        intervalInMinutes: 5,
      };
    }
  }

  $effect(() => {
    localStorage.setItem("config", JSON.stringify(config));
  });
</script>

<div class="p-4">
  <a href="/" class="btn btn-primary btn-outline btn-md">← back</a>
  <div class="flex flex-col gap-2 pt-2">
    <label class="form-control w-full">
      <div class="label">
        <span class="label-text">Project ID</span>
      </div>
      <input
        type="text"
        class="input input-bordered bg-white"
        bind:value={config.tenantId}
      />
      <div class="label">
        <span class="label-text-alt"
          >You can find the project id in the Cloud Backoffice when you navigate
          to your project details.</span
        >
      </div>
    </label>
    <label class="form-control w-full">
      <div class="label">
        <span class="label-text">Configuration ID</span>
      </div>
      <input
        type="text"
        class="input input-bordered bg-white"
        bind:value={config.configurationId}
      />
      <div class="label">
        <span class="label-text-alt"
          >The id of the cloud solution configuration this app will update with
          your IP address</span
        >
      </div>
    </label>
    <label class="form-control w-full">
      <div class="label">
        <span class="label-text">Access/Service Token</span>
      </div>
      <input
        type="password"
        class="input input-bordered bg-white"
        bind:value={config.token}
      />
      <div class="label">
        <span class="label-text-alt"
          >Either add a personal access token or create a service token with
          "configuration.write" permission.
        </span>
      </div>
    </label>
    <label class="form-control w-full">
      <div class="label">
        <span class="label-text">Interval in Minutes</span>
      </div>
      <input
        type="number"
        class="input input-bordered bg-white"
        bind:value={config.intervalInMinutes}
      />
    </label>
  </div>
</div>
