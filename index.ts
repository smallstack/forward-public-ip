import config from "./config.json";

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
          console.log(
            "sending IP: " + data.ip,
            ", Response: ",
            response.status,
            response.statusText
          );
        })
        .catch((error) => {
          console.error(error);
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
